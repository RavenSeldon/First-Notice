/** Acceptance tests added after the 2026-10-30 external review (ChatGPT, GPT-6 "Astra"). */
import { describe, expect, it } from 'vitest';
import { acknowledge, checkOverdue, emptyLedger, exportJSON, importJSON, issue, latest, revise } from '../../src/domain/event-log';
import { checkSender, VERIFICATION_METHOD } from '../../src/domain/verification';
import { CASES } from '../../src/data/historical-cases';
import { REGISTRY, REGISTRY_DOWN, COUNTERFACTUAL_SA, FAILURE_INCOMPLETE, FAILURE_REGISTRY_DOWN, FAILURE_UNACKED } from '../../src/data/synthetic-fixtures';

const T = (h: number) => new Date(Date.parse('2026-11-01T00:00:00.000Z') + h * 3_600_000).toISOString();
const kinds = (l: ReturnType<typeof emptyLedger>, v: number) => l.events.filter(e => e.version === v).map(e => e.kind);

describe('T2 updates complete the notification lifecycle', () => {
  it('a T2 update is routed and received by every original recipient, with its reason recorded', () => {
    let l = issue(emptyLedger(), REGISTRY, FAILURE_INCOMPLETE, T(0));
    const recipients = l.notices[0].recipientIds;
    l = revise(l, FAILURE_INCOMPLETE.id, { evidence: 'corroborated' }, 'Logs reviewed', T(5));
    const v2 = kinds(l, 2);
    expect(v2).toContain('notice.revised');
    expect(v2).toContain('notice.routed');
    const got = l.events.filter(e => e.version === 2 && e.kind === 'notice.received').map(e => e.detail.recipient);
    expect(got.sort()).toEqual([...recipients].sort());
    expect(l.events.find(e => e.version === 2 && e.kind === 'notice.revised')!.detail.reason).toBe('Logs reviewed');
  });
  it('an update to an urgent notice needs its own acknowledgment, and escalates without one', () => {
    let l = issue(emptyLedger(), REGISTRY, FAILURE_UNACKED, T(0));
    for (const r of l.notices[0].recipientIds) l = acknowledge(l, FAILURE_UNACKED.id, r, T(1));
    l = revise(l, FAILURE_UNACKED.id, { evidence: 'corroborated' }, 'Update', T(2));
    l = checkOverdue(l, T(26.5));
    const esc = l.events.filter(e => e.kind === 'escalation.overdue-ack');
    expect(esc.length).toBe(l.notices[0].recipientIds.length);
    expect(esc.every(e => e.version === 2)).toBe(true);
  });
});

describe('Acknowledgment validation', () => {
  it('rejects a recipient who never received the notice', () => {
    const l = issue(emptyLedger(), REGISTRY, FAILURE_UNACKED, T(0));
    expect(() => acknowledge(l, FAILURE_UNACKED.id, 'public-inbox', T(1))).toThrow(/did not receive/);
  });
  it('a duplicate acknowledgment is a no-op', () => {
    let l = issue(emptyLedger(), REGISTRY, FAILURE_UNACKED, T(0));
    const r = l.notices[0].recipientIds[0];
    l = acknowledge(l, FAILURE_UNACKED.id, r, T(1));
    const again = acknowledge(l, FAILURE_UNACKED.id, r, T(2));
    expect(again).toBe(l);
  });
});

describe('Sender verification: complete and explicitly simulated', () => {
  it('distinguishes seven states, including registry unavailable and historically unknown', () => {
    const s = new Set([
      checkSender(REGISTRY, 'dev-alpha', 'key-alpha'), checkSender(REGISTRY, 'dev-alpha', ''),
      checkSender(REGISTRY, 'nobody', 'x'), checkSender(REGISTRY, 'dev-alpha', 'forged'),
      checkSender(REGISTRY, 'dev-beta', 'key-beta'), checkSender(REGISTRY_DOWN, 'dev-alpha', 'key-alpha'),
      checkSender(REGISTRY, 'dev-alpha', null),
    ]);
    expect(s.size).toBe(7);
    expect(s.has('registry-unavailable')).toBe(true);
    expect(s.has('historically-unknown')).toBe(true);
  });
  it('an urgent notice still arrives when the registry is down, flagged for manual verification', () => {
    const l = issue(emptyLedger(), REGISTRY_DOWN, FAILURE_REGISTRY_DOWN, T(0));
    expect(l.events.some(e => e.kind === 'verification.manual-required')).toBe(true);
    expect(l.events.filter(e => e.kind === 'notice.received').length).toBeGreaterThan(0);
  });
  it('every verification result records that it is simulated, not cryptographic', () => {
    const l = issue(emptyLedger(), REGISTRY, FAILURE_INCOMPLETE, T(0));
    const d = l.events.find(e => e.kind === 'sender.checked')!.detail;
    expect(d.method).toBe(VERIFICATION_METHOD);
    expect(String(d.method)).toMatch(/not cryptographic/);
  });
});

describe('Accountability metadata', () => {
  it('investigation, case, qualifying discovery and per-recipient delivery times survive export', () => {
    const l = issue(emptyLedger(), REGISTRY, COUNTERFACTUAL_SA, '2026-08-15T18:00:00.000Z');
    const back = importJSON(exportJSON(l));
    const n = latest(back, COUNTERFACTUAL_SA.id)!;
    expect(n.parentInvestigationId).toMatch(/counterfactual/);
    expect(n.caseId).toBe('services-australia');
    expect(n.discoveredAt).toBe(COUNTERFACTUAL_SA.discoveredAt);
    expect(back.events.filter(e => e.kind === 'notice.received').every(e => typeof e.at === 'string')).toBe(true);
  });
});

describe('Date precision is displayed, never invented', () => {
  it('every non-day entry carries an explicit display text', () => {
    for (const c of CASES) for (const t of c.timeline) if (t.precision !== 'day') expect(t.display, `${c.id}: ${t.label}`).toBeTruthy();
  });
  it('the NPWS contact is shown as a window, not a date', () => {
    const t = CASES.find(c => c.id === 'npws')!.timeline.find(x => x.sourceIds.includes('C09') && x.precision === 'approximate')!;
    expect(t.display).toBe('Within 48 hours of 29 September');
  });
});
