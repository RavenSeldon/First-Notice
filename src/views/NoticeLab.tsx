import { useMemo, useState } from 'react';
import { ackRequired, acknowledge, checkOverdue, emptyLedger, exportJSON, history, issue, revise, type IssueInput, type Ledger } from '../domain/event-log';
import { addHours, hoursBetween } from '../domain/clock';
import { PROTOCOL, type LogEvent, type Notice, type Registry } from '../domain/types';
import { REGISTRY, REGISTRY_DOWN, COUNTERFACTUAL_SA, COUNTERFACTUAL_ASSUMPTIONS, FAILURE_INCOMPLETE, FAILURE_REGISTRY_DOWN, FAILURE_SPOOF, FAILURE_UNACKED } from '../data/synthetic-fixtures';
import { Prov } from './Badge';

interface Scenario { key: string; label: string; input: IssueInput; at: string; note: string; registry?: Registry }
const SCENARIOS: Scenario[] = [
  { key: 'cf-on-time', label: 'Services Australia, on the proposed clock', input: COUNTERFACTUAL_SA, at: addHours(COUNTERFACTUAL_SA.discoveredAt, 6),
    note: 'The documented case, if the developer had sent notice six hours after finding it.' },
  { key: 'cf-actual', label: 'Services Australia, on its actual date', input: { ...COUNTERFACTUAL_SA, id: 'CF-SA-2' }, at: '2026-09-10T00:00:00.000Z',
    note: 'The same notice, sent on 10 September as it really was. The proposed 48-hour clock flags it as late.' },
  { key: 'spoof', label: 'A forged sender', input: FAILURE_SPOOF, at: addHours(FAILURE_SPOOF.discoveredAt, 2),
    note: 'Someone claims to be a registered developer. The notice still arrives, marked for manual checking, because it might be real.' },
  { key: 'incomplete', label: 'Serious, but unproven', input: FAILURE_INCOMPLETE, at: addHours(FAILURE_INCOMPLETE.discoveredAt, 2),
    note: 'High potential consequence, partial evidence. Uncertainty does not lower urgency.' },
  { key: 'noreg', label: 'Registry down', input: FAILURE_REGISTRY_DOWN, at: addHours(FAILURE_REGISTRY_DOWN.discoveredAt, 2), registry: REGISTRY_DOWN,
    note: 'The sender registry cannot be reached. The urgent notice still arrives, marked for manual checking.' },
  { key: 'unacked', label: 'Nobody answers', input: FAILURE_UNACKED, at: addHours(FAILURE_UNACKED.discoveredAt, 2),
    note: 'Move the clock past 24 hours without acknowledging, and see what happens.' },
];

const fmtTime = (iso: string) => new Date(iso).toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'UTC' }) + ' UTC';

const AUTH_TEXT: Record<string, string> = {
  verified: 'Simulated registry match', unconfirmed: 'Registered, credential not yet checked',
  unregistered: 'Not in the registry', mismatch: 'Credential does not match the claimed sender', revoked: 'Credential revoked',
  'registry-unavailable': 'Registry could not be consulted', 'historically-unknown': 'Verification not on record',
};
const TIER_TEXT: Record<string, string> = {
  T0: 'Information only', T1: `Urgent: acknowledge within ${PROTOCOL.ackTargetHours} h`, T2: 'Correction',
};
const EVENT_TEXT: Record<LogEvent['kind'], string> = {
  'notice.issued': 'Notice issued', 'notice.revised': 'Update issued (T2)', 'sender.checked': 'Sender checked',
  'notice.routed': 'Routed', 'notice.received': 'Received', 'notice.acknowledged': 'Acknowledged',
  'verification.manual-required': 'Manual verification required', 'escalation.overdue-ack': 'Overdue: escalated',
  'escalation.late-notice': 'Late notice: escalated',
};
const detailText = (e: LogEvent) => {
  const d = e.detail;
  switch (e.kind) {
    case 'notice.issued': return `${d.tier}. ${(d.reasons as string[]).join('. ')}.`;
    case 'sender.checked': return `${AUTH_TEXT[String(d.authenticity)]}. ${d.method}.`;
    case 'notice.routed': return String(d.note);
    case 'verification.manual-required': return AUTH_TEXT[String(d.authenticity)];
    case 'notice.received': case 'notice.acknowledged': return `${REGISTRY.recipients[String(d.recipient)]?.name ?? ''}, version ${e.version}`;
    case 'escalation.overdue-ack': return `${REGISTRY.recipients[String(d.recipient)]?.name}, version ${e.version}, due ${fmtTime(String(d.dueAt))}`;
    case 'escalation.late-notice': return `${d.hoursAfterDiscovery} hours after discovery; the proposal allows ${d.limit}`;
    case 'notice.revised': return `${d.reason}. Version ${e.version} supersedes ${e.version - 1}; nothing removed.`;
    default: return '';
  }
};

function Sheet({ n, ledger, current, now, onAck }: { n: Notice; ledger: Ledger; current: boolean; now: string; onAck: (r: string) => void }) {
  const evs = ledger.events.filter(e => e.noticeId === n.id);
  const mine = evs.filter(e => e.version === n.version);
  const auth = String(evs.find(e => e.kind === 'sender.checked')?.detail.authenticity);
  const acked = new Set(mine.filter(e => e.kind === 'notice.acknowledged').map(e => String(e.detail.recipient)));
  const overdue = new Set(mine.filter(e => e.kind === 'escalation.overdue-ack').map(e => String(e.detail.recipient)));
  const late = evs.some(e => e.kind === 'escalation.late-notice');
  const manual = evs.some(e => e.kind === 'verification.manual-required');
  const suspicious = evs.some(e => e.kind === 'notice.routed' && e.detail.suspicious);
  const v1 = history(ledger, n.id)[0];
  const ackNeeded = ackRequired(ledger, n);
  const due = addHours(n.issuedAt, PROTOCOL.ackTargetHours);
  const left = hoursBetween(now, due);

  return (
    <article className={`sheet-paper prov-${n.provenance} ${current ? '' : 'superseded'}`} aria-label={`Notice ${n.id}, version ${n.version}`}>
      <header className="sheet-head">
        <span>Notice <b>{n.id}</b></span>
        <span>Version {n.version}{n.supersedesVersion && `, supersedes ${n.supersedesVersion}`}</span>
        <span className={`tier t-${n.tier}`}>{n.tier === 'T0' ? 'T0 information' : n.tier === 'T1' ? 'T1 urgent' : 'T2 update'}</span>
      </header>


      <dl className="typed">
        {n.parentInvestigationId && <><dt>Investigation</dt><dd>{n.parentInvestigationId}</dd></>}
        <dt>Summary</dt><dd>{n.content.summary}</dd>
        <dt>System</dt><dd>{n.content.affectedSystem}</dd>
        <dt>Activity</dt><dd>{n.content.activityWindow}</dd>
        <dt>Qualifying discovery</dt><dd>{fmtTime(n.discoveredAt)}</dd>
        <dt>Issued</dt><dd>{fmtTime(n.issuedAt)}</dd>
      </dl>

      <div className="stamps" aria-live="polite">
        {!current && <span className="stamp ink">Superseded</span>}
        {current && late && <span className="stamp red">Late notice</span>}
        {current && suspicious && <span className="stamp red">Possible spoof</span>}
        {current && manual && !suspicious && <span className="stamp blue">Verify sender</span>}
        {current && ackNeeded && acked.size === n.recipientIds.length && <span className="stamp ink">Acknowledged</span>}
        {current && overdue.size > 0 && acked.size < n.recipientIds.length && <span className="stamp red">Overdue</span>}
      </div>

      <div className="axes" role="group" aria-label="Three separate assessments">
        <div><span className="axis">Who sent it (simulated)</span><span className="val">{AUTH_TEXT[auth]}</span></div>
        <div><span className="axis">What is known</span><span className="val">Evidence {n.content.evidence}; personal data {n.content.personalDataInvolved}</span></div>
        <div><span className="axis">How fast</span><span className="val">{TIER_TEXT[v1.tier]}; consequence {n.content.consequence}</span></div>
      </div>

      {current && (
        <div className="recipients">
          <h3>Delivered to</h3>
          <ul>
            {n.recipientIds.map(r => (
              <li key={r} className={overdue.has(r) && !acked.has(r) ? 'is-overdue' : ''}>
                <span>{REGISTRY.recipients[r].name}{REGISTRY.recipients[r].monitored24x7 && <span className="qual"> staffed 24/7</span>}</span>
                {!ackNeeded ? <span className="qual">No acknowledgment required</span>
                  : acked.has(r) ? <span className="ok">Acknowledged</span>
                  : <button onClick={() => onAck(r)}>Acknowledge</button>}
              </li>
            ))}
          </ul>
          {ackNeeded && acked.size < n.recipientIds.length && (
            <p className={`due ${left < 0 ? 'late' : ''}`}>
              {left >= 0 ? `Acknowledgment due within ${Math.ceil(left)} h` : `Acknowledgment overdue by ${Math.ceil(-left)} h`}
            </p>
          )}
        </div>
      )}
    </article>
  );
}

export default function NoticeLab() {
  const [k, setK] = useState(0);
  const s = SCENARIOS[k];
  const [ledger, setLedger] = useState<Ledger>(() => issue(emptyLedger(), s.registry ?? REGISTRY, s.input, s.at));
  const [now, setNow] = useState(s.at);
  const [viewing, setViewing] = useState<number | null>(null);

  const load = (i: number) => {
    const x = SCENARIOS[i];
    setK(i); setNow(x.at); setViewing(null);
    setLedger(issue(emptyLedger(), x.registry ?? REGISTRY, x.input, x.at));
  };
  const advance = (h: number) => { const t = addHours(now, h); setNow(t); setLedger(l => checkOverdue(l, t)); };
  const id = s.input.id;
  const versions = history(ledger, id);
  const latest = versions[versions.length - 1];
  const shown = viewing === null ? latest : versions.find(v => v.version === viewing)!;
  const corrected = versions.length > 1;
  const events = useMemo(() => [...ledger.events].reverse(), [ledger]);

  const download = () => {
    const url = URL.createObjectURL(new Blob([exportJSON(ledger)], { type: 'application/json' }));
    const a = document.createElement('a'); a.href = url; a.download = `first-notice-${id}.json`; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
    <section className="lab" aria-labelledby="lab-h">
      <h1 id="lab-h">Send a notice through the protocol.</h1>
      <p className="lede">
        Pick a case, move the clock, acknowledge or don't, send an update. Every step goes into a record that only grows.
      </p>

      <div className="dockets" role="radiogroup" aria-label="Case">
        {(['counterfactual', 'synthetic'] as const).map(p => (
          <div key={p} className="docket-group">
            <Prov p={p} />
            {SCENARIOS.map((x, i) => x.input.provenance === p && (
              <button key={x.key} role="radio" aria-checked={i === k} onClick={() => load(i)}>{x.label}</button>
            ))}
          </div>
        ))}
      </div>
      <p className="scenario-note">{s.note}</p>
      {s.input.provenance === 'counterfactual' && (
        <details className="assumptions"><summary>Assumptions behind this replay</summary>
          <ul>{COUNTERFACTUAL_ASSUMPTIONS.map(a => <li key={a}>{a}</li>)}</ul>
        </details>
      )}

      <div className="clock" role="group" aria-label="Simulated clock">
        <span className="clock-face"><span className="qual">Simulated clock</span><time dateTime={now}>{fmtTime(now)}</time></span>
        <button onClick={() => advance(1)}>+1 hour</button>
        <button onClick={() => advance(12)}>+12 hours</button>
        <button onClick={() => advance(24)}>+24 hours</button>
      </div>

      <div className="desk">
        <div className="stack" style={{ ['--copies' as string]: versions.length - 1 }}>
          {versions.slice(0, -1).map((v, i) => (
            <button key={v.version} className={`copy copy-${i % 2}`} style={{ ['--i' as string]: versions.length - 1 - i }}
              onClick={() => setViewing(viewing === v.version ? null : v.version)}
              aria-pressed={viewing === v.version}>
              Version {v.version} copy
            </button>
          ))}
          <Sheet key={`${shown.version}`} n={shown} ledger={ledger} current={shown === latest} now={now}
            onAck={r => setLedger(l => acknowledge(l, id, r, now))} />
          <div className="sheet-actions">
            {viewing !== null && <button onClick={() => setViewing(null)}>Back to the current version</button>}
            <button onClick={() => { setLedger(l => revise(l, id, { evidence: 'corroborated', personalDataInvolved: 'no', summary: 'Update: logs reviewed, scope confirmed, no personal data involved' }, 'Logs reviewed: scope confirmed, no personal data', now)); setViewing(null); }}
              disabled={corrected}>{corrected ? 'Update sent' : 'Send an update (T2)'}</button>
            <button onClick={download}>Download the record (JSON)</button>
          </div>
        </div>

        <aside className="receipts" aria-labelledby="rec-h">
          <h2 id="rec-h">Record</h2>
          <p className="qual">Newest first. Entries are added, never edited or removed.</p>
          <ol>
            {events.map(e => (
              <li key={e.seq} className={e.kind.startsWith('escalation') ? 'r-alert' : e.kind.includes('manual') ? 'r-warn' : ''}>
                <span className="r-seq">{String(e.seq).padStart(3, '0')}</span>
                <span className="r-time">{fmtTime(e.at)}</span>
                <span className="r-kind">{EVENT_TEXT[e.kind]}</span>
                <span className="r-detail">{detailText(e)}</span>
              </li>
            ))}
          </ol>
          <p className="qual">Proposed: urgent notice within {PROTOCOL.t1NoticeHours} hours of qualifying discovery; each version of an urgent notice acknowledged within {PROTOCOL.ackTargetHours} hours. Sender checks use a simulated registry and fixture credentials, not cryptographic authentication.</p>
        </aside>
      </div>
    </section>
  );
}
