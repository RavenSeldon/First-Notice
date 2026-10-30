#!/usr/bin/env node
// Assemble the standalone brief: content/brief/*.md → docs/FIRST-NOTICE-BRIEF.md,
// with a readable references list built from the ledger IDs actually cited.
// Also reports word counts against targets and narration length. Never edits your text.
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const TARGET = { '1-recommendation': 375, '2-evidence': 500, '3-protocol': 750, '4-implementation': 625, '5-pilot': 250 };
const TITLE = {
  '1-recommendation': 'The recommendation and why Canada should act',
  '2-evidence': 'The Australian evidence and the notification gap',
  '3-protocol': 'The proposed procurement-backed protocol',
  '4-implementation': 'Implementation, objections and safeguards',
  '5-pilot': 'Pilot evaluation and conclusion',
};

const strip = s => s.replace(/<!--[\s\S]*?-->/g, '').trim();
const words = s => (s.replace(/\[C\d{2}(?:\s*,\s*C\d{2})*\]/g, '').match(/[\p{L}\p{N}'’-]+/gu) || []).length;
const cites = s => [...s.matchAll(/\[(C\d{2}(?:\s*,\s*C\d{2})*)\]/g)].flatMap(m => m[1].split(/\s*,\s*/));

function parseCSV(text) {
  const rows = []; let row = [], f = '', q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) { if (c === '"') { if (text[i + 1] === '"') { f += '"'; i++; } else q = false; } else f += c; }
    else if (c === '"') q = true;
    else if (c === ',') { row.push(f); f = ''; }
    else if (c === '\n' || c === '\r') { if (c === '\r' && text[i + 1] === '\n') i++; row.push(f); f = ''; if (row.some(x => x)) rows.push(row); row = []; }
    else f += c;
  }
  if (f || row.length) { row.push(f); rows.push(row); }
  return rows;
}
const [head, ...body] = parseCSV(readFileSync(join(root, 'evidence/ledger.csv'), 'utf8'));
const ledger = Object.fromEntries(body.map(r => [r[0], Object.fromEntries(head.map((h, i) => [h, r[i]]))]));

const dir = join(root, 'content/brief');
const sections = readdirSync(dir).filter(f => f.endsWith('.md')).sort().map(f => {
  const key = f.replace(/\.md$/, ''); const md = strip(readFileSync(join(dir, f), 'utf8'));
  return { key, md, n: words(md), target: TARGET[key] ?? 0 };
});

let out = '# First Notice\n\n*A proposed Canadian protocol for early notification of AI-agent incidents.*\n\n';
const order = [];
for (const s of sections) {
  if (!s.md) continue;
  // Section headings become "##", subheadings "###", so the standalone brief nests cleanly.
  const body = s.md.replace(/^## /gm, '### ').replace(/^# /gm, '## ');
  if (!s.md.startsWith('# ')) out += `## ${TITLE[s.key] ?? s.key}\n\n`;
  out += body + '\n\n';
  for (const id of cites(s.md)) if (!order.includes(id)) order.push(id);
}
const missing = order.filter(id => !ledger[id]);
if (order.length) {
  out += '## References\n\nBracketed citations refer to the project evidence ledger (evidence/ledger.csv), where each entry quotes its supporting passage.\n\n';
  for (const id of order.filter(id => ledger[id])) {
    const c = ledger[id];
    out += `- **[${id}]** ${c.source_org}. ${c.claim}. ${c.source_url}\n`;
  }
  out += '\nInteractive demonstration and the full evidence ledger: https://benamuwo.me/first-notice/\n';
}
writeFileSync(join(root, 'docs/FIRST-NOTICE-BRIEF.md'), out);

const narr = strip(readFileSync(join(root, 'content/narration.md'), 'utf8'));
const scenes = narr.split(/^## /m).filter(s => s.trim()).map(s => { const [t, ...rest] = s.split('\n'); return { t: t.trim(), n: words(rest.join('\n')) }; });
const nw = scenes.reduce((a, s) => a + s.n, 0);

const total = sections.reduce((a, s) => a + s.n, 0);
console.log('\nBrief (target about 2,500 words, about 5 pages)');
for (const s of sections) console.log(`  ${s.key.padEnd(18)} ${String(s.n).padStart(5)} / ${s.target}${s.n === 0 ? '   not written yet' : ''}`);
console.log(`  ${'total'.padEnd(18)} ${String(total).padStart(5)} / 2500`);
console.log(`\nNarration: ${nw} words, about ${(nw / 150).toFixed(1)} min at 150 words a minute`);
for (const s of scenes) console.log(`  ${s.t.padEnd(40)} ${String(s.n).padStart(4)} words`);
console.log(`\nCited: ${order.join(', ') || 'none yet'}`);
if (missing.length) { console.error(`\nNOT IN LEDGER: ${missing.join(', ')}`); process.exitCode = 1; }
console.log('Wrote docs/FIRST-NOTICE-BRIEF.md\n');
