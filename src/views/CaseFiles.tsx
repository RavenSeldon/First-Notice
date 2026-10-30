import { CASES } from '../data/historical-cases';
import { Cite, Prov } from './Badge';
export default function CaseFiles() {
  return (
    <section>
      <h2>Case files <Prov p="documented" /></h2>
      <div className="grid">
        {CASES.map(c => (
          <article key={c.id} className="card">
            <h3>{c.organization}</h3>
            <p className="muted">{c.jurisdiction}{c.belowDisclosureThreshold && ' · below developer disclosure threshold'}{c.separatelyDiscovered && ' · separately discovered'}</p>
            <p>{c.summary}</p>
            <ul>{c.timeline.map(t => <li key={t.label}>{t.date} ({t.precision}) — {t.label} <Cite ids={t.sourceIds} /></li>)}</ul>
            <ul className="quals">{c.qualifications.map(q => <li key={q}>{q}</li>)}</ul>
          </article>
        ))}
      </div>
    </section>
  );
}
