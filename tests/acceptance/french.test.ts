import { describe, expect, it } from 'vitest';
import { BRIEF, BRIEF_FR } from '../../src/content/brief';
import { citedIds } from '../../src/content/render';
import { CLAIMS } from '../../src/data/evidence-ledger';
import { CASES, EXISTING_REGIMES } from '../../src/data/historical-cases';
import { COUNTERFACTUAL_ASSUMPTIONS, REGISTRY } from '../../src/data/synthetic-fixtures';
import { CANONICAL, SPECIFIC, VERIFICATION_METHOD } from '../../src/domain/verification';
import { FR, CLAIMS_FR } from '../../src/i18n/fr';

describe('French translation keeps the record intact', () => {
  it('has every brief section, citing exactly the same sources in the same order', () => {
    expect(BRIEF_FR.map(s => s.key)).toEqual(BRIEF.map(s => s.key));
    BRIEF.forEach((en, i) => expect(citedIds(BRIEF_FR[i].md), en.key).toEqual(citedIds(en.md)));
  });
  it('translates every ledger claim, status and precision, and no claim that does not exist', () => {
    expect(Object.keys(CLAIMS_FR).sort()).toEqual(CLAIMS.map(c => c.id).sort());
    const missing = CLAIMS.flatMap(c => [c.status, c.precision]).filter(s => !(s in FR));
    expect(missing).toEqual([]);
  });
  it('translates every displayed string in the documented and synthetic data', () => {
    const strings = [
      ...CASES.flatMap(c => [c.jurisdiction, c.summary, ...c.qualifications, ...c.timeline.flatMap(t => [t.label, ...(t.display ? [t.display] : [])])]),
      ...EXISTING_REGIMES.flatMap(r => [r.label, r.note]),
      ...COUNTERFACTUAL_ASSUMPTIONS,
      ...Object.values(REGISTRY.recipients).map(r => r.name),
      ...Object.values(CANONICAL), ...Object.values(SPECIFIC), VERIFICATION_METHOD,
    ];
    expect(strings.filter(s => !(s in FR))).toEqual([]);
  });
});
