import { describe, expect, it } from 'vitest';
import argument from '../../content/argument.md?raw';
import { citedIds, stripComments } from '../../src/content/render';
import { claim } from '../../src/data/evidence-ledger';

describe("Author's argument", () => {
  it('every citation in content/argument.md exists in the evidence ledger', () => {
    const missing = citedIds(argument).filter(id => !claim(id));
    expect(missing, `Not in evidence/ledger.csv: ${missing.join(', ')}`).toEqual([]);
  });
  it('the citation parser finds single and grouped citations, and ignores comments', () => {
    expect(citedIds('a [C01] b [C10, C13] <!-- [C99] -->')).toEqual(['C01', 'C10', 'C13']);
    expect(stripComments('<!-- x -->\n')).toBe('');
  });
});
