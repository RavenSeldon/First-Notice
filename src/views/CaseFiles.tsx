import { CASES } from '../data/historical-cases';
import { Cite, Prov } from './Badge';
import { FRENCH, LOCALE, t as tr } from '../i18n';

const fmt = (iso: string) => new Date(iso + 'T00:00:00Z').toLocaleDateString(LOCALE, { day: 'numeric', month: 'short', timeZone: 'UTC' });

export default function CaseFiles() {
  return (
    <section aria-labelledby="cases-h">
      <Prov p="documented" />
      <h1 id="cases-h">{tr('Five affected organizations, five different notification histories.')}</h1>
      {FRENCH ? <p className="lede">
        Quatre organisations ont été avisées à trois dates différentes; un cinquième cas a été découvert des semaines plus
        tard et a commencé par un premier contact, non par un avis technique complet. Le dossier n'établit pas chaque canal
        utilisé. Un protocole doit pouvoir traiter chacun de ces historiques, et non seulement le cas le plus médiatisé.
      </p> : <p className="lede">
        Four organizations were notified on three different dates; a fifth case was found weeks later and began with an
        initial contact, not a full technical notice. The record does not establish every channel used. A protocol has to
        handle each of these histories, not just the headline case.
      </p>}
      <div className="register" role="table" aria-label={tr("Register of affected organizations")}>
        <div className="reg-row reg-head" role="row">
          <span role="columnheader">{tr("Organization")}</span>
          <span role="columnheader">{tr("What happened")}</span>
          <span role="columnheader">{tr("Dates on record")}</span>
        </div>
        {CASES.map(c => (
          <div key={c.id} className="reg-row" role="row">
            <span role="cell" className="org">
              <strong>{c.organization}</strong>
              <span className="juris">{tr(c.jurisdiction)}</span>
              {c.belowDisclosureThreshold && <span className="flag">{tr("Below the developer's disclosure threshold")}</span>}
              {c.separatelyDiscovered && <span className="flag">{tr("Found separately, on 29 September")}</span>}
            </span>
            <span role="cell" className="summary">
              {tr(c.summary)}
              <ul className="quals">{c.qualifications.map(q => <li key={q}>{tr(q)}</li>)}</ul>
            </span>
            <span role="cell">
              <ol className="dates">
                {c.timeline.map(t => (
                  <li key={t.label} className={t.precision}>
                    <span className="when">{t.display ? tr(t.display) : fmt(t.date)}</span>{' '}
                    {tr(t.label)} <Cite ids={t.sourceIds} />
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
