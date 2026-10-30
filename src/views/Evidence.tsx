import { useMemo, useState } from 'react';
import { CLAIMS, sourceUrls } from '../data/evidence-ledger';

/** The whole evidence ledger, inspectable: every claim, passage, date precision and qualification. */
export default function Evidence() {
  const [q, setQ] = useState('');
  const shown = useMemo(() => {
    const t = q.trim().toLowerCase();
    return t ? CLAIMS.filter(c => Object.values(c).join(' ').toLowerCase().includes(t)) : CLAIMS;
  }, [q]);

  return (
    <section className="evidence" aria-labelledby="ev-h">
      <h1 id="ev-h">The evidence ledger.</h1>
      <p className="lede">
        Every documented claim on this site comes from one of these {CLAIMS.length} entries. Each one carries the exact
        passage it rests on, how precisely its date is known, and what it does not establish.
      </p>
      <label className="ev-search">
        <span>Search the ledger</span>
        <input type="search" value={q} onChange={e => setQ(e.target.value)} placeholder="ASD, 48 hours, procurement…" />
      </label>
      <p className="qual" aria-live="polite">{shown.length} of {CLAIMS.length} claims</p>
      <ol className="ledger">
        {shown.map(c => (
          <li key={c.id} id={c.id}>
            <details>
              <summary>
                <span className="ev-id">{c.id}</span>
                <span className="ev-claim">{c.claim}</span>
                <span className="ev-date">{c.event_date} <span className="qual">({c.precision})</span></span>
              </summary>
              <dl className="ev-body">
                <dt>Source</dt>
                <dd>{c.source_org}<br />{sourceUrls(c).map(u => <a key={u} href={u} target="_blank" rel="noreferrer">{new URL(u).hostname}</a>)}</dd>
                <dt>Passage</dt>
                <dd><blockquote>{c.supporting_passage}</blockquote></dd>
                <dt>Status</dt><dd>{c.status}</dd>
                {c.qualification && <><dt>Does not establish</dt><dd>{c.qualification}</dd></>}
              </dl>
            </details>
          </li>
        ))}
      </ol>
    </section>
  );
}
