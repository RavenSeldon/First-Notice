import { CASES } from '../data/historical-cases';
import { Cite, Prov } from './Badge';

const sa = CASES[0];
const START = Date.parse('2026-06-01'), END = Date.parse('2026-10-05');
const pos = (d: string) => `${((Date.parse(d) - START) / (END - START)) * 100}%`;

export default function Overview() {
  return (
    <section>
      <h2>The record <Prov p="documented" /></h2>
      <p>On a true-scale timeline, the gap is the story: from access to the first notice reaching a monitored security function.</p>
      <div className="timeline" role="img" aria-label="Timeline June to October 2026">
        <div className="band" style={{ left: pos('2026-08-11'), width: `calc(${pos('2026-08-21')} - ${pos('2026-08-11')})` }} title="Mid-August: exact day not public" />
        {sa.timeline.map(t => <div key={t.label} className={`tick ${t.precision}`} style={{ left: pos(t.date) }} />)}
      </div>
      <ol className="events">
        {sa.timeline.map(t => (
          <li key={t.label}>
            <strong>{t.precision === 'day' ? t.date : `~${t.date.slice(0, 7)} (${t.precision})`}</strong> — {t.label}
            {t.developerAccountOnly && <span className="qual"> developer's account</span>} <Cite ids={t.sourceIds} />
          </li>
        ))}
      </ol>
      <ul className="quals">{sa.qualifications.map(q => <li key={q}>{q}</li>)}</ul>
    </section>
  );
}
