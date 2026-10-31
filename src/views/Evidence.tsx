import { useMemo, useState } from 'react';
import { CLAIMS, sourceUrls } from '../data/evidence-ledger';
import { FRENCH, claimText, t as tr, tf } from '../i18n';

/** The whole evidence ledger, inspectable: every claim, passage, date precision and qualification. */
export default function Evidence() {
  const [q, setQ] = useState('');
  const shown = useMemo(() => {
    const t = q.trim().toLowerCase();
    return t ? CLAIMS.filter(c => [...Object.values(c), ...claimText(c.id, '', '')].join(' ').toLowerCase().includes(t)) : CLAIMS;
  }, [q]);

  return (
    <section className="evidence" aria-labelledby="ev-h">
      <h1 id="ev-h">{tr('The evidence ledger.')}</h1>
      {FRENCH ? <p className="lede">
        Chaque affirmation documentée de ce site provient de l'une de ces {CLAIMS.length} entrées. Chacune comporte le passage exact
        sur lequel elle repose, la précision avec laquelle sa date est connue, et ce qu'elle n'établit pas.
      </p> : <p className="lede">
        Every documented claim on this site comes from one of these {CLAIMS.length} entries. Each one carries the exact
        passage it rests on, how precisely its date is known, and what it does not establish.
      </p>}
      <label className="ev-search">
        <span>{tr('Search the ledger')}</span>
        <input type="search" value={q} onChange={e => setQ(e.target.value)} placeholder={tr('ASD, 48 hours, procurement…')} />
      </label>
      <p className="qual" aria-live="polite">{tf('{n} of {total} claims', { n: shown.length, total: CLAIMS.length })}</p>
      <ol className="ledger">
        {shown.map(c => { const [claim, qualification] = claimText(c.id, c.claim, c.qualification); return (
          <li key={c.id} id={c.id}>
            <details>
              <summary>
                <span className="ev-id">{c.id}</span>
                <span className="ev-claim">{claim}</span>
                <span className="ev-date">{c.event_date} <span className="qual">({tr(c.precision)})</span></span>
              </summary>
              <dl className="ev-body">
                <dt>{tr('Source')}</dt>
                <dd>{c.source_org}<br />{sourceUrls(c).map(u => <a key={u} href={u} target="_blank" rel="noreferrer">{new URL(u).hostname}</a>)}</dd>
                <dt>{tr('Passage')}</dt>
                <dd><blockquote lang="en">{c.supporting_passage}</blockquote></dd>
                <dt>{tr('Status')}</dt><dd>{tr(c.status)}</dd>
                {qualification && <><dt>{tr('Does not establish')}</dt><dd>{qualification}</dd></>}
              </dl>
            </details>
          </li>
        ); })}
      </ol>
    </section>
  );
}
