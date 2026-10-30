import { describe, expect, it } from 'vitest';
import { CLAIMS, claim, sourceUrls } from '../../src/data/evidence-ledger';
import { CASES, EXISTING_REGIMES } from '../../src/data/historical-cases';

describe('Historical integrity', () => {
  it('ledger IDs run consecutively from C01, each with URL and a verbatim passage', () => {
    expect(CLAIMS.length).toBeGreaterThanOrEqual(19);
    expect(CLAIMS.map(c => c.id)).toEqual(Array.from({ length: CLAIMS.length }, (_, i) => `C${String(i + 1).padStart(2, '0')}`));
    for (const c of CLAIMS) {
      expect(sourceUrls(c).length).toBeGreaterThan(0);
      for (const u of sourceUrls(c)) expect(u).toMatch(/^https:\/\//);
      expect(c.supporting_passage).toContain('"');
      expect(c.supporting_passage).not.toMatch(/TODO/);
    }
  });
  it('every cited source ID exists in the ledger', () => {
    const cited = [...CASES.flatMap(k => k.timeline.flatMap(t => t.sourceIds)), ...EXISTING_REGIMES.flatMap(r => r.sourceIds)];
    for (const id of cited) expect(claim(id), id).toBeDefined();
  });
  it('organization cases stay distinct, with AIHW qualified and NPWS separate', () => {
    expect(new Set(CASES.map(c => c.id)).size).toBe(CASES.length);
    expect(CASES.find(c => c.id === 'aihw')!.belowDisclosureThreshold).toBe(true);
    expect(CASES.find(c => c.id === 'npws')!.separatelyDiscovered).toBe(true);
    expect(CASES.find(c => c.id === 'bocsar')!.separatelyDiscovered).toBeUndefined();
  });
  it('date precision is preserved (mid-August is approximate, June 18 is day)', () => {
    const sa = CASES.find(c => c.id === 'services-australia')!;
    expect(sa.timeline.find(t => t.sourceIds.includes('C02'))!.precision).toBe('approximate');
    expect(sa.timeline.find(t => t.sourceIds.includes('C01'))!.precision).toBe('day');
  });
  it('the 24/7 reroute is not attributed to ASD', () => {
    expect(claim('C08')!.qualification).toMatch(/not further specified/);
  });
});
