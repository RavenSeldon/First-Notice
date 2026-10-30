import { CASES } from '../data/historical-cases';
import { Cite, Prov } from './Badge';

const fmt = (iso: string) => new Date(iso + 'T00:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', timeZone: 'UTC' });

export default function CaseFiles() {
  return (
    <section aria-labelledby="cases-h">
      <Prov p="documented" />
      <h1 id="cases-h">Five affected organizations, five different notification histories.</h1>
      <p className="lede">
        Four organizations were notified on three different dates; a fifth case was found weeks later and began with an
        initial contact, not a full technical notice. The record does not establish every channel used. A protocol has to
        handle each of these histories, not just the headline case.
      </p>
      <div className="register" role="table" aria-label="Register of affected organizations">
        <div className="reg-row reg-head" role="row">
          <span role="columnheader">Organization</span>
          <span role="columnheader">What happened</span>
          <span role="columnheader">Dates on record</span>
        </div>
        {CASES.map(c => (
          <div key={c.id} className="reg-row" role="row">
            <span role="cell" className="org">
              <strong>{c.organization}</strong>
              <span className="juris">{c.jurisdiction}</span>
              {c.belowDisclosureThreshold && <span className="flag">Below the developer's disclosure threshold</span>}
              {c.separatelyDiscovered && <span className="flag">Found separately, on 29 September</span>}
            </span>
            <span role="cell" className="summary">
              {c.summary}
              <ul className="quals">{c.qualifications.map(q => <li key={q}>{q}</li>)}</ul>
            </span>
            <span role="cell">
              <ol className="dates">
                {c.timeline.map(t => (
                  <li key={t.label} className={t.precision}>
                    <span className="when">{t.display ?? fmt(t.date)}</span>{' '}
                    {t.label} <Cite ids={t.sourceIds} />
                  </li>
                ))}
              </ol>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
