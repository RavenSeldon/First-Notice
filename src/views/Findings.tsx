import { EXISTING_REGIMES } from '../data/historical-cases';
import { Cite } from './Badge';
import { renderArgument, stripComments } from '../content/render';
import { WRITTEN } from '../content/brief';

export default function Findings() {
  return (
    <section className="findings" aria-labelledby="findings-h">
      <h1 id="findings-h">What this supplements, and what it cannot do.</h1>

      <h2>Rules already in place</h2>
      <ul className="regimes">
        {EXISTING_REGIMES.map(r => (
          <li key={r.label}><span>{r.label} <Cite ids={r.sourceIds} /></span><span className="qual">{r.note}</span></li>
        ))}
      </ul>

      <h2>The gap</h2>
      <p>
        Canada already requires departments to report incidents to the Cyber Centre <Cite ids={['C15']} />, and suppliers to report
        cyber events as their contracts stipulate <Cite ids={['C19']} />. What these arrangements do not establish is a uniform,
        AI-agent-specific early-notification pathway: one that covers what an external AI developer discovers about its own agents'
        activity, names the recipient in advance, checks the sender, and escalates when no one acknowledges.
      </p>

      <h2>The brief</h2>
      {WRITTEN.length === 0
        ? <div className="author-slot" role="note">The policy brief goes here, in the author's words.</div>
        : WRITTEN.map(sec => {
            const md = stripComments(sec.md);
            return (
              <div key={sec.key} className="argument">
                {!md.startsWith('# ') && <h3>{sec.title}</h3>}
                {renderArgument(md)}
              </div>
            );
          })}

      <h2>Limits</h2>
      <ul className="limits">
        <li>The registry, routing and clocks are simulated proposals, not law. A registry check is not cryptographic authentication.</li>
        <li>Federal procurement leverage does not reach unrelated private research or unknown operators of open-weight models.</li>
        <li>Mandatory reporting can discourage disclosure if confidentiality, liability and competitive consequences are badly designed <Cite ids={['C10', 'C13']} />.</li>
        <li>Several Australian facts rest on the developer's own account <Cite ids={['C07', 'C09']} />.</li>
        <li>The counterfactual replays show how notice timing might change under the proposal. They cannot show that any real-world harm would have been prevented.</li>
        <li>Deterministic tests show the protocol behaves as specified. They do not show harm prevented.</li>
      </ul>
    </section>
  );
}
