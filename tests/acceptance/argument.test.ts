import { describe, expect, it } from 'vitest';
import narration from '../../content/narration.md?raw';
import { citedIds, stripComments } from '../../src/content/render';
import { BRIEF } from '../../src/content/brief';
import { claim } from '../../src/data/evidence-ledger';

describe("Author's brief and narration", () => {
  it('has the five brief sections in order', () => {
    expect(BRIEF.map(s => s.key)).toEqual(['1-recommendation', '2-evidence', '3-protocol', '4-implementation', '5-pilot']);
  });
  it('every citation in the brief and narration exists in the evidence ledger', () => {
    const all = [...BRIEF.map(s => s.md), narration].flatMap(citedIds);
    const missing = all.filter(id => !claim(id));
    expect(missing, `Not in evidence/ledger.csv: ${missing.join(', ')}`).toEqual([]);
  });
  it('the citation parser finds single and grouped citations, and ignores comments', () => {
    expect(citedIds('a [C01] b [C10, C13] <!-- [C99] -->')).toEqual(['C01', 'C10', 'C13']);
    expect(stripComments('<!-- x -->\n')).toBe('');
  });
});
