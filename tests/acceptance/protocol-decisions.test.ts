/** Participant's protocol decisions, 2026-10-30, citing frozen spec v1.2 §4. */
import { describe, expect, it } from 'vitest';
import { emptyLedger, history, issue, revise } from '../../src/domain/event-log';
import { CANONICAL, checkSender, describeAuth } from '../../src/domain/verification';
import { triage } from '../../src/domain/triage';
import { REGISTRY, FAILURE_INCOMPLETE } from '../../src/data/synthetic-fixtures';
import type { Authenticity } from '../../src/domain/types';

const T = (h: number) => new Date(Date.parse('2026-11-01T00:00:00.000Z') + h * 3_600_000).toISOString();

describe('Decision 1: tier is the classification, version is the account', () => {
  it('reproduces the specification example: v1 T1, v2 T1, v3 T2, v4 T2', () => {
    let l = issue(emptyLedger(), REGISTRY, FAILURE_INCOMPLETE, T(0));                        // credible, uncertain
    l = revise(l, FAILURE_INCOMPLETE.id, { evidence: 'partial' }, 'More evidence, unresolved', T(1));
    l = revise(l, FAILURE_INCOMPLETE.id, { evidence: 'corroborated' }, 'Corroborated', T(2));
    l = revise(l, FAILURE_INCOMPLETE.id, { activityWindow: 'June 2026, corrected' }, 'Factual correction', T(3));
    expect(history(l, FAILURE_INCOMPLETE.id).map(n => [n.version, n.tier])).toEqual([[1, 'T1'], [2, 'T1'], [3, 'T2'], [4, 'T2']]);
  });
  it('an update does not by itself raise the tier', () => {
    let l = issue(emptyLedger(), REGISTRY, FAILURE_INCOMPLETE, T(0));
    l = revise(l, FAILURE_INCOMPLETE.id, { summary: 'Reworded' }, 'Wording', T(1));
    expect(history(l, FAILURE_INCOMPLETE.id)[1].tier).toBe('T1');
    expect(l.events.some(e => e.kind === 'notice.reclassified')).toBe(false);
  });
  it('a later correction can lower the tier, with the reasoning preserved', () => {
    let l = issue(emptyLedger(), REGISTRY, { ...FAILURE_INCOMPLETE, content: { ...FAILURE_INCOMPLETE.content, evidence: 'corroborated' } }, T(0));
    expect(l.notices[0].tier).toBe('T2');
    l = revise(l, FAILURE_INCOMPLETE.id, { consequence: 'low', personalDataInvolved: 'no' }, 'Impact reassessed as low', T(1));
    const r = l.events.find(e => e.kind === 'notice.reclassified')!;
    expect(r.detail).toMatchObject({ from: 'T2', to: 'T0' });
    expect(l.events.find(e => e.kind === 'notice.revised' && e.version === 2)!.detail.reason).toBe('Impact reassessed as low');
  });
  it('T2 means corroborated, materially significant activity', () => {
    const base = { summary: '', affectedSystem: '', activityWindow: '', personalDataInvolved: 'no' as const };
    expect(triage({ ...base, consequence: 'high', evidence: 'corroborated' }).tier).toBe('T2');
    expect(triage({ ...base, consequence: 'high', evidence: 'partial' }).tier).toBe('T1');
    expect(triage({ ...base, consequence: 'low', evidence: 'corroborated' }).tier).toBe('T0');
  });
});

describe('Decision 2: five canonical sender-verification states', () => {
  it('maps the seven internal states exactly as specified', () => {
    expect(CANONICAL).toEqual({
      verified: 'Verified', unconfirmed: 'Unverified', unregistered: 'Unverified',
      mismatch: 'Failed', revoked: 'Failed',
      'registry-unavailable': 'Registry unavailable', 'historically-unknown': 'Historically unknown',
    });
    expect(new Set(Object.values(CANONICAL)).size).toBe(5);
  });
  it('an unregistered sender is Unverified, not Failed', () => {
    expect(CANONICAL[checkSender(REGISTRY, 'nobody', 'x')]).toBe('Unverified');
  });
  it('historically unknown arises only for historical reconstructions (no credential on record)', () => {
    const live: Authenticity[] = [checkSender(REGISTRY, 'dev-alpha', ''), checkSender(REGISTRY, 'nobody', 'x'), checkSender(REGISTRY, 'dev-alpha', 'forged')];
    expect(live).not.toContain('historically-unknown');
    expect(checkSender(REGISTRY, 'dev-alpha', null)).toBe('historically-unknown');
  });
  it('shows the canonical state with its specific reason', () => {
    expect(describeAuth('revoked')).toBe('Failed: credential revoked');
  });
});
