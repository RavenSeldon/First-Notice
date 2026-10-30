import { CASES } from '../data/historical-cases';
import { Cite, Prov } from './Badge';

const DAY = 86_400_000;
const START = Date.parse('2026-06-18T00:00:00Z');
const END = Date.parse('2026-09-23T00:00:00Z');          // through the first technical exchange (22 Sept)
const SPAN = (END - START) / DAY;                          // days shown, one tick each
const at = (iso: string) => ((Date.parse(iso + 'T00:00:00Z') - START) / DAY + 0.5) / SPAN * 100;
const daysBetween = (a: string, b: string) => Math.round((Date.parse(b) - Date.parse(a)) / DAY);

const sa = CASES.find(c => c.id === 'services-australia')!;
const ACCESS = '2026-06-18', NOTICE = '2026-09-10';
const GAP = daysBetween(ACCESS, NOTICE);                   // 84, from C01 and C03

const fmt = (iso: string) => new Date(iso + 'T00:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', timeZone: 'UTC' });
// Vertical row for each pin so numbers within a few days of each other don't overlap.
const rows = sa.timeline.reduce<number[]>((acc, t, i) => {
  const prev = sa.timeline[i - 1];
  acc.push(prev && daysBetween(prev.date, t.date) < 5 ? (acc[i - 1] + 1) % 3 : 0);
  return acc;
}, []);
const MONTHS = ['2026-07-01', '2026-08-01', '2026-09-01'];

export default function Overview() {
  return (
    <section className="record" aria-labelledby="record-h">
      <div className="lede-block">
        <Prov p="documented" />
        <h1 id="record-h">{GAP} days from unauthorized access to the first notice.</h1>
        <p className="lede">
          On {fmt(ACCESS)} an AI agent in training got into an Australian government statistics portal it was not allowed
          into <Cite ids={['C01']} />. The developer found it in mid-August <Cite ids={['C02']} />. The notice went to a
          general inbox on {fmt(NOTICE)} <Cite ids={['C03']} />, an inbox checked once a day <Cite ids={['C06']} />.
        </p>
      </div>

      <figure className="ruler-figure">
        <div className="ruler" role="img"
          aria-label={`Ruler of ${Math.round(SPAN)} days, ${fmt(ACCESS)} to 22 September 2026, one tick per day. Events are listed below.`}
          style={{ ['--days' as string]: SPAN }}>
          <div className="ticks" />
          {MONTHS.map(m => <span key={m} className="month" style={{ left: `${at(m)}%` }}>{new Date(m).toLocaleDateString('en-GB', { month: 'short', timeZone: 'UTC' })}</span>)}
          <span className="silence" style={{ left: `${at(ACCESS)}%`, width: `${at('2026-08-11') - at(ACCESS)}%` }} />
          <span className="uncertain" style={{ left: `${at('2026-08-11')}%`, width: `${at('2026-08-21') - at('2026-08-11')}%` }} />
          {sa.timeline.map((t, i) => (
            <span key={t.label} className={`pin ${t.precision}`} style={{ left: `${at(t.date)}%`, ['--row' as string]: rows[i] }}>
              <span className="pin-n">{i + 1}</span>
            </span>
          ))}
        </div>
        <figcaption>
          One tick per day. The shaded stretch is time no one had found the access; the soft band is "mid-August",
          whose exact day is not public.
        </figcaption>
      </figure>

      <ol className="events">
        {sa.timeline.map((t, i) => (
          <li key={t.label} className={t.precision}>
            <span className="pin-n">{i + 1}</span>
            <span className="when">{t.display ?? fmt(t.date)}</span>
            <span className="what">
              {t.label}{t.developerAccountOnly && <span className="qual"> (developer's account)</span>} <Cite ids={t.sourceIds} />
            </span>
          </li>
        ))}
      </ol>

      <aside className="margin-note">
        <p>
          Afterwards, Services Australia pointed that inbox at a 24/7 cyber centre <Cite ids={['C08']} />, and officials said the
          notice should have come through the Australian Signals Directorate or senior staff <Cite ids={['C11']} />.
          The receiving side was adjusted after the fact. First Notice asks what Canada would need in place beforehand.
        </p>
      </aside>

      <details className="quals-block">
        <summary>What this record does not establish</summary>
        <ul>{sa.qualifications.map(q => <li key={q}>{q}</li>)}</ul>
      </details>
    </section>
  );
}
