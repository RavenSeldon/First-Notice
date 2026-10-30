import { EXISTING_REGIMES } from '../data/historical-cases';
import { Cite } from './Badge';

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
        Canada's existing rules run from federal departments to the Cyber Centre <Cite ids={['C15']} />. They do not say how an
        outside AI developer reaches the right government recipient, how that recipient knows the sender is real, or what happens
        when nobody acknowledges.
      </p>

      <h2>The argument</h2>
      <div className="author-slot" role="note">The policy argument and Canadian adoption pathway go here, in the author's words.</div>

      <h2>Limits</h2>
      <ul className="limits">
        <li>The registry, routing and clocks are simulated proposals, not law. A registry check is not cryptographic authentication.</li>
        <li>Federal procurement leverage does not reach unrelated private research or unknown operators of open-weight models.</li>
        <li>Mandatory reporting can discourage disclosure if confidentiality, liability and competitive consequences are badly designed <Cite ids={['C10', 'C13']} />.</li>
        <li>Several Australian facts rest on the developer's own account <Cite ids={['C07', 'C09']} />.</li>
        <li>Deterministic tests show the protocol behaves as specified. They do not show harm prevented.</li>
      </ul>
    </section>
  );
}
