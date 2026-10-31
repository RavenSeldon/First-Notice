/**
 * Language layer. English is the source and the record; French is a draft translation of the account.
 * Choice order: ?lang= in the URL, then the reader's last choice, then English. Switching reloads with ?lang=,
 * so every view reads one fixed language and a shared link carries it.
 */
import { FR, CLAIMS_FR } from './fr';

export type Lang = 'en' | 'fr';
const read = (): Lang => {
  try {
    const q = new URLSearchParams(location.search).get('lang');
    if (q === 'fr' || q === 'en') { localStorage.setItem('fn-lang', q); return q; }
    return localStorage.getItem('fn-lang') === 'fr' ? 'fr' : 'en';
  } catch { return 'en'; }
};
export const LANG: Lang = typeof location === 'undefined' ? 'en' : read();
export const FRENCH = LANG === 'fr';
export const LOCALE = FRENCH ? 'fr-CA' : 'en-GB';

/** Translate an English source string; falls back to the English when no translation exists. */
export const t = (s: string): string => (FRENCH ? FR[s] ?? s : s);
/** Translate, then fill {name} slots. */
export const tf = (s: string, v: Record<string, string | number>) =>
  t(s).replace(/\{(\w+)\}/g, (_, k) => String(v[k] ?? `{${k}}`));
/** Translated claim and qualification for a ledger entry (English when no translation exists). */
export const claimText = (id: string, claim: string, qualification: string): [string, string] =>
  FRENCH && CLAIMS_FR[id] ? CLAIMS_FR[id] : [claim, qualification];

export const langHref = (to: Lang) => {
  const u = new URL(location.href);
  u.searchParams.set('lang', to);
  return u.pathname + u.search + u.hash;
};

if (typeof document !== 'undefined' && FRENCH) {
  document.documentElement.lang = 'fr-CA';
  document.title = 'Premier avis';
  document.querySelector('meta[name="description"]')?.setAttribute('content', FR.__description);
}
