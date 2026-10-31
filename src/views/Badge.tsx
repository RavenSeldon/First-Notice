import type { Provenance } from '../domain/types';
import { claim, sourceUrls } from '../data/evidence-ledger';
import { t, tf } from '../i18n';

const PROV_LABEL: Record<Provenance, string> = {
  documented: 'Documented', counterfactual: 'Counterfactual', synthetic: 'Synthetic',
};
export const Prov = ({ p }: { p: Provenance }) => (
  <span className={`prov ${p}`}><span className={`mark ${p}`} aria-hidden="true" />{t(PROV_LABEL[p])}</span>
);

/** Ledger citation: links to the primary source, shows the verbatim passage on hover/focus. */
export function Cite({ ids }: { ids: string[] }) {
  return (
    <span className="cites">
      {ids.map(id => {
        const c = claim(id);
        return c
          ? <a key={id} className="cite" href={sourceUrls(c)[0]} target="_blank" rel="noreferrer"
              title={`${c.source_org}: ${c.supporting_passage}`} aria-label={tf('Source {id}: {org}', { id, org: c.source_org })}>{id}</a>
          : <span key={id} className="cite missing">{id}?</span>;
      })}
    </span>
  );
}
