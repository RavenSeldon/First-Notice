/**
 * Tiny, safe renderer for the author's argument (content/argument.md).
 * Supports: "# " section headings, "## " subheadings, paragraphs, "- " lists, *em*, **strong**, [C01] / [C01, C02] citations.
 * No raw HTML is ever injected; React escapes all text.
 */
import type { ReactNode } from 'react';
import { Cite } from '../views/Badge';

export const stripComments = (md: string) => md.replace(/<!--[\s\S]*?-->/g, '').trim();

export const citedIds = (md: string) =>
  [...stripComments(md).matchAll(/\[(C\d{2}(?:\s*,\s*C\d{2})*)\]/g)].flatMap(m => m[1].split(/\s*,\s*/));

function inline(text: string, key: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /\*\*(.+?)\*\*|\*(.+?)\*|\[(C\d{2}(?:\s*,\s*C\d{2})*)\]/g;
  let last = 0, m: RegExpExecArray | null, i = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const k = `${key}-${i++}`;
    if (m[1]) out.push(<strong key={k}>{m[1]}</strong>);
    else if (m[2]) out.push(<em key={k}>{m[2]}</em>);
    else out.push(<Cite key={k} ids={m[3].split(/\s*,\s*/)} />);
    last = re.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export function renderArgument(md: string): ReactNode[] | null {
  const body = stripComments(md);
  if (!body) return null;
  return body.split(/\n\s*\n/).map((block, b) => {
    const lines = block.split('\n').map(l => l.trim()).filter(Boolean);
    if (lines.length === 1 && lines[0].startsWith('## ')) return <h4 key={b}>{inline(lines[0].slice(3), `h${b}`)}</h4>;
    if (lines.length === 1 && lines[0].startsWith('# ')) return <h3 key={b}>{inline(lines[0].slice(2), `h${b}`)}</h3>;
    if (lines.every(l => l.startsWith('- '))) return <ul key={b}>{lines.map((l, j) => <li key={j}>{inline(l.slice(2), `l${b}-${j}`)}</li>)}</ul>;
    return <p key={b}>{inline(lines.join(' '), `p${b}`)}</p>;
  });
}
