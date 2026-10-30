import { useState } from 'react';
import { acknowledge, checkOverdue, emptyLedger, exportJSON, history, issue, revise, type IssueInput, type Ledger } from '../domain/event-log';
import { addHours } from '../domain/clock';
import { PROTOCOL } from '../domain/types';
import { REGISTRY, COUNTERFACTUAL_SA, COUNTERFACTUAL_ASSUMPTIONS, FAILURE_INCOMPLETE, FAILURE_SPOOF, FAILURE_UNACKED } from '../data/synthetic-fixtures';
import { Prov } from './Badge';

const SCENARIOS: { label: string; input: IssueInput; at: string; note: string }[] = [
  { label: 'Counterfactual: Services Australia under the protocol', input: COUNTERFACTUAL_SA, at: addHours(COUNTERFACTUAL_SA.discoveredAt, 6), note: 'Notice issued 6 h after the assumed discovery.' },
  { label: 'Counterfactual: documented timing (10 Sept) under the protocol', input: { ...COUNTERFACTUAL_SA, id: 'CF-SA-LATE' }, at: '2026-09-10T00:00:00.000Z', note: 'The same notice, sent when it actually was.' },
  { label: 'Failure 1: forged sender', input: FAILURE_SPOOF, at: addHours(FAILURE_SPOOF.discoveredAt, 2), note: '' },
  { label: 'Failure 2: high consequence, incomplete evidence', input: FAILURE_INCOMPLETE, at: addHours(FAILURE_INCOMPLETE.discoveredAt, 2), note: '' },
  { label: 'Failure 3: unacknowledged urgent notice', input: FAILURE_UNACKED, at: addHours(FAILURE_UNACKED.discoveredAt, 2), note: 'Advance the clock past 24 h without acknowledging.' },
];

export default function NoticeLab() {
  const [i, setI] = useState(0);
  const s = SCENARIOS[i];
  const [ledger, setLedger] = useState<Ledger>(() => issue(emptyLedger(), REGISTRY, s.input, s.at));
  const [now, setNow] = useState(s.at);

  const load = (k: number) => { const x = SCENARIOS[k]; setI(k); setNow(x.at); setLedger(issue(emptyLedger(), REGISTRY, x.input, x.at)); };
  const advance = (h: number) => { const t = addHours(now, h); setNow(t); setLedger(l => checkOverdue(l, t)); };
  const id = s.input.id;
  const versions = history(ledger, id);
  const cur = versions[versions.length - 1];
  const acked = new Set(ledger.events.filter(e => e.kind === 'notice.acknowledged').map(e => String(e.detail.recipient)));
  const download = () => {
    const url = URL.createObjectURL(new Blob([exportJSON(ledger)], { type: 'application/json' }));
    const a = document.createElement('a'); a.href = url; a.download = `first-notice-${id}.json`; a.click(); URL.revokeObjectURL(url);
  };

  return (
    <section>
      <h2>Notice lab <Prov p={s.input.provenance} /></h2>
      <label>Scenario{' '}
        <select value={i} onChange={e => load(Number(e.target.value))}>{SCENARIOS.map((x, k) => <option key={k} value={k}>{x.label}</option>)}</select>
      </label>
      {s.note && <p className="muted">{s.note}</p>}
      {s.input.provenance === 'counterfactual' && <details><summary>Counterfactual assumptions</summary><ul>{COUNTERFACTUAL_ASSUMPTIONS.map(a => <li key={a}>{a}</li>)}</ul></details>}

      <p className="clock">Simulated clock: <time>{now.replace('T', ' ').slice(0, 16)} UTC</time>{' '}
        <button onClick={() => advance(1)}>+1 h</button> <button onClick={() => advance(12)}>+12 h</button> <button onClick={() => advance(24)}>+24 h</button>
      </p>

      <div className="grid">
        <article className="card">
          <h3>Notice {id} · v{cur.version} · <span className={`tier ${cur.tier}`}>{cur.tier}</span></h3>
          <dl>
            <dt>Sender</dt><dd>{REGISTRY.senders[cur.senderId]?.name ?? cur.senderId}</dd>
            <dt>Authenticity</dt><dd>{String(ledger.events.find(e => e.kind === 'sender.checked')?.detail.authenticity)}</dd>
            <dt>Evidence</dt><dd>{cur.content.evidence}</dd>
            <dt>Consequence</dt><dd>{cur.content.consequence}</dd>
            <dt>Personal data</dt><dd>{cur.content.personalDataInvolved}</dd>
          </dl>
          <p className="muted">Authenticity, evidence and urgency are assessed independently.</p>
          <h4>Recipients</h4>
          <ul>{cur.recipientIds.map(r => (
            <li key={r}>{REGISTRY.recipients[r].name}{' '}
              {acked.has(r) ? <span className="ok">acknowledged</span> : cur.tier !== 'T0' &&
                <button onClick={() => setLedger(l => acknowledge(l, id, r, now))}>Acknowledge</button>}
            </li>))}</ul>
          <button onClick={() => setLedger(l => revise(l, id, { evidence: 'corroborated', personalDataInvolved: 'no' }, 'Logs reviewed: scope confirmed, no personal data', now))}>
            Issue correction (T2)</button>{' '}
          <button onClick={download}>Export JSON history</button>
          {versions.length > 1 && <><h4>Versions (all preserved)</h4><ol>{versions.map(v => <li key={v.version}>v{v.version} {v.tier} — evidence {v.content.evidence}, personal data {v.content.personalDataInvolved}</li>)}</ol></>}
        </article>
        <article className="card">
          <h3>Event log (append-only)</h3>
          <ol className="log">{ledger.events.map(e => (
            <li key={e.seq} className={e.kind.startsWith('escalation') ? 'alert' : e.kind.includes('manual') ? 'warn' : ''}>
              <code>{e.at.slice(5, 16).replace('T', ' ')}</code> {e.kind} <span className="muted">{JSON.stringify(e.detail)}</span>
            </li>))}</ol>
          <p className="muted">Proposed: T1 notice within {PROTOCOL.t1NoticeHours} h of discovery; receipt acknowledgment within {PROTOCOL.ackTargetHours} h.</p>
        </article>
      </div>
    </section>
  );
}
