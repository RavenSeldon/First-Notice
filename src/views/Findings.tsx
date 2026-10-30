import { EXISTING_REGIMES } from '../data/historical-cases';
import { Cite } from './Badge';
export default function Findings() {
  return (
    <section>
      <h2>Findings and limits</h2>
      <h3>What this supplements, not replaces</h3>
      <ul>{EXISTING_REGIMES.map(r => <li key={r.label}>{r.label} <Cite ids={r.sourceIds} /> <span className="muted">— {r.note}</span></li>)}</ul>
      <h3>The gap the protocol addresses</h3>
      <p>Existing Canadian rules run from government departments to the Cyber Centre. They do not establish how an external AI developer reaches the right government recipient, how that recipient knows the sender is real, or what happens when nobody acknowledges.</p>
      <h3>Limitations</h3>
      <ul>
        <li>All routing, registry and clocks are simulated proposals, not existing law.</li>
        <li>Federal procurement leverage does not reach unrelated private research or unknown operators of open-weight models.</li>
        <li>Mandatory reporting may chill disclosure if confidentiality, liability and competitive consequences are badly designed <Cite ids={['C10']} />.</li>
        <li>Several Australian facts rest on the developer's own account <Cite ids={['C07', 'C09']} />.</li>
      </ul>
      <p className="muted">[Policy argument and Canadian adoption pathway: author's text to come.]</p>
    </section>
  );
}
