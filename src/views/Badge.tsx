import type { Provenance } from '../domain/types';
import { claim, sourceUrls } from '../data/evidence-ledger';
export const Prov = ({ p }: { p: Provenance }) => <span className={`badge ${p}`}>{p}</span>;
export function Cite({ ids }: { ids: string[] }) {
  return <>{ids.map(id => { const c = claim(id); return c
    ? <a key={id} className="cite" href={sourceUrls(c)[0]} target="_blank" rel="noreferrer" title={c.supporting_passage}>{id}</a>
    : <span key={id} className="cite missing">{id}?</span>; })}</>;
}
