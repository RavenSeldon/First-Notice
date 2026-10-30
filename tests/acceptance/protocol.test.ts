import { describe, expect, it } from 'vitest';
import { triage } from '../../src/domain/triage';
import { checkSender } from '../../src/domain/verification';
import { route } from '../../src/domain/routing';
import { acknowledge, checkOverdue, emptyLedger, exportJSON, history, importJSON, issue, revise } from '../../src/domain/event-log';
import { REGISTRY, COUNTERFACTUAL_SA, FAILURE_INCOMPLETE, FAILURE_SPOOF, FAILURE_UNACKED } from '../../src/data/synthetic-fixtures';
import type { NoticeContent } from '../../src/domain/types';

const base: NoticeContent = { summary: 's', affectedSystem: 'a', activityWindow: 'w', consequence: 'low', evidence: 'corroborated', personalDataInvolved: 'no' };
const T = (h: number) => new Date(Date.parse('2026-11-01T00:00:00.000Z') + h * 3_600_000).toISOString();

describe('Triage', () => {
  it('T0 has no mandatory acknowledgment and is never escalated', () => {
    expect(triage(base).tier).toBe('T0');
    let l = issue(emptyLedger(), REGISTRY, { ...FAILURE_INCOMPLETE, id: 'T0', content: base }, T(0));
    l = checkOverdue(l, T(100));
    expect(l.events.some(e => e.kind.startsWith('escalation'))).toBe(false);
  });
  it('high consequence with incomplete evidence → T1 (failure case 2)', () => {
    for (const ev of ['partial', 'unverified'] as const) expect(triage({ ...base, consequence: 'high', evidence: ev }).tier).toBe('T1');
  });
  it('urgency is independent of sender authenticity', () => {
    const a = issue(emptyLedger(), REGISTRY, FAILURE_SPOOF, T(0)).notices[0];
    const b = issue(emptyLedger(), REGISTRY, FAILURE_INCOMPLETE, T(0)).notices[0];
    expect(a.tier).toBe(b.tier);
  });
});

describe('Sender verification', () => {
  it('distinguishes five states', () => {
    const s = new Set([
      checkSender(REGISTRY, 'dev-alpha', 'key-alpha'), checkSender(REGISTRY, 'dev-alpha', ''),
      checkSender(REGISTRY, 'nobody', 'x'), checkSender(REGISTRY, 'dev-alpha', 'forged'),
      checkSender(REGISTRY, 'dev-beta', 'key-beta'),
    ]);
    expect([...s].sort()).toEqual(['mismatch', 'revoked', 'unconfirmed', 'unregistered', 'verified']);
  });
  it('verifying a sender never changes evidence status', () => {
    const n = issue(emptyLedger(), REGISTRY, COUNTERFACTUAL_SA, '2026-08-16T00:00:00.000Z').notices[0];
    expect(n.content.evidence).toBe('partial');
  });
  it('a false sender\'s urgent notice proceeds to manual verification and is flagged (failure case 1)', () => {
    const l = issue(emptyLedger(), REGISTRY, FAILURE_SPOOF, T(0));
    expect(l.events.find(e => e.kind === 'sender.checked')!.detail.authenticity).toBe('mismatch');
    expect(l.events.some(e => e.kind === 'verification.manual-required')).toBe(true);
    expect(l.events.find(e => e.kind === 'notice.routed')!.detail.suspicious).toBe(true);
    expect(l.events.filter(e => e.kind === 'notice.received').length).toBeGreaterThan(0);
  });
  it('urgent notices always reach a 24/7 recipient', () => {
    expect(route(REGISTRY, 'T1', 'verified', ['public-inbox']).deliverTo).toContain('cyber-centre');
    expect(route(REGISTRY, 'T0', 'verified', ['public-inbox']).deliverTo).not.toContain('cyber-centre');
  });
});

describe('Workflow clocks', () => {
  it('48 h T1 notice clock: on time vs late', () => {
    const d = FAILURE_INCOMPLETE.discoveredAt;
    const onTime = issue(emptyLedger(), REGISTRY, { ...FAILURE_INCOMPLETE, discoveredAt: d }, T(48));
    const late = issue(emptyLedger(), REGISTRY, { ...FAILURE_INCOMPLETE, discoveredAt: d }, T(48.01));
    expect(onTime.events.some(e => e.kind === 'escalation.late-notice')).toBe(false);
    expect(late.events.some(e => e.kind === 'escalation.late-notice')).toBe(true);
  });
  it('documented SA timing would breach the proposed clock (counterfactual)', () => {
    const l = issue(emptyLedger(), REGISTRY, COUNTERFACTUAL_SA, '2026-09-10T00:00:00.000Z');
    expect(l.events.some(e => e.kind === 'escalation.late-notice')).toBe(true);
  });
  it('unacknowledged urgent notice escalates after 24 h, exactly once (failure case 3)', () => {
    let l = issue(emptyLedger(), REGISTRY, FAILURE_UNACKED, T(0));
    expect(checkOverdue(l, T(24)).events.some(e => e.kind === 'escalation.overdue-ack')).toBe(false);
    l = checkOverdue(l, T(24.01));
    const n = l.events.filter(e => e.kind === 'escalation.overdue-ack').length;
    expect(n).toBeGreaterThan(0);
    expect(checkOverdue(l, T(30)).events.filter(e => e.kind === 'escalation.overdue-ack').length).toBe(n);
  });
  it('acknowledged recipients do not escalate', () => {
    let l = issue(emptyLedger(), REGISTRY, FAILURE_UNACKED, T(0));
    for (const r of l.notices[0].recipientIds) l = acknowledge(l, 'SYN-UNACKED', r, T(2));
    expect(checkOverdue(l, T(30)).events.some(e => e.kind === 'escalation.overdue-ack')).toBe(false);
  });
});

describe('Audit', () => {
  it('corrections append a T2 version and preserve the original', () => {
    let l = issue(emptyLedger(), REGISTRY, FAILURE_INCOMPLETE, T(0));
    const before = JSON.stringify(l.notices[0]);
    l = revise(l, 'SYN-INCOMPLETE', { evidence: 'corroborated', personalDataInvolved: 'no' }, 'Logs reviewed', T(10));
    const h = history(l, 'SYN-INCOMPLETE');
    expect(h.map(n => [n.version, n.tier])).toEqual([[1, 'T1'], [2, 'T2']]);
    expect(JSON.stringify(h[0])).toBe(before);
    expect(h[1].supersedesVersion).toBe(1);
  });
  it('records are immutable', () => {
    const l = issue(emptyLedger(), REGISTRY, FAILURE_INCOMPLETE, T(0));
    expect(() => { (l.notices[0] as { tier: string }).tier = 'T0'; }).toThrow();
  });
  it('exported JSON reproduces the history exactly', () => {
    let l = issue(emptyLedger(), REGISTRY, FAILURE_SPOOF, T(0));
    l = revise(l, 'SYN-SPOOF', { evidence: 'partial' }, 'r', T(1));
    l = checkOverdue(l, T(30));
    const s = exportJSON(l);
    expect(exportJSON(importJSON(s))).toBe(s);
  });
  it('same inputs and clock → identical output (deterministic)', () => {
    const run = () => exportJSON(checkOverdue(issue(emptyLedger(), REGISTRY, FAILURE_UNACKED, T(0)), T(30)));
    expect(run()).toBe(run());
  });
});
