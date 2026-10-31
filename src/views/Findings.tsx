import { EXISTING_REGIMES } from '../data/historical-cases';
import { Cite } from './Badge';
import { renderArgument, stripComments } from '../content/render';
import { WRITTEN, WRITTEN_FR } from '../content/brief';
import { FRENCH, t as tr } from '../i18n';

export default function Findings() {
  const written = FRENCH && WRITTEN_FR.length ? WRITTEN_FR : WRITTEN;
  return (
    <section className="findings" aria-labelledby="findings-h">
      <h1 id="findings-h">{tr('What this supplements, and what it cannot do.')}</h1>

      <h2>{tr('Rules already in place')}</h2>
      <ul className="regimes">
        {EXISTING_REGIMES.map(r => (
          <li key={r.label}><span>{tr(r.label)} <Cite ids={r.sourceIds} /></span><span className="qual">{tr(r.note)}</span></li>
        ))}
      </ul>

      <h2>{tr('The gap')}</h2>
      {FRENCH ? <p>
        Le Canada exige déjà que les ministères signalent les incidents au Centre pour la cybersécurité <Cite ids={['C15']} />, et que les
        fournisseurs signalent les cyberévénements selon les modalités de leurs contrats <Cite ids={['C19']} />. Ce que ces arrangements
        n'établissent pas, c'est une voie uniforme de notification précoce propre aux agents d'IA : une voie qui couvre ce qu'un développeur
        d'IA externe découvre au sujet de l'activité de ses propres agents, désigne le destinataire à l'avance, vérifie l'expéditeur et
        escalade lorsque personne n'accuse réception.
      </p> : <p>
        Canada already requires departments to report incidents to the Cyber Centre <Cite ids={['C15']} />, and suppliers to report
        cyber events as their contracts stipulate <Cite ids={['C19']} />. What these arrangements do not establish is a uniform,
        AI-agent-specific early-notification pathway: one that covers what an external AI developer discovers about its own agents'
        activity, names the recipient in advance, checks the sender, and escalates when no one acknowledges.
      </p>}

      <div className="brief-head">
        <h2>{tr('The brief')}</h2>
        <button type="button" className="quiet-action no-print" onClick={() => print()} title={tr('Print or save the brief as PDF')}>{tr('Print')} | PDF</button>
      </div>
      {written.length === 0
        ? <div className="author-slot" role="note">{tr("The policy brief goes here, in the author's words.")}</div>
        : <div className="brief">{written.map(sec => {
            const md = stripComments(sec.md);
            return (
              <div key={sec.key} className="argument brief-section">
                {!md.startsWith('# ') && <h3>{sec.title}</h3>}
                {renderArgument(md)}
              </div>
            );
          })}</div>}

      <h2>{tr('Limits')}</h2>
      {FRENCH ? <ul className="limits">
        <li>Le registre, l'acheminement et les délais sont des propositions simulées, non des lois. Une vérification au registre n'est pas une authentification cryptographique.</li>
        <li>Le levier de l'approvisionnement fédéral n'atteint ni la recherche privée sans lien avec un contrat, ni les exploitants inconnus de modèles à poids ouverts.</li>
        <li>Un signalement obligatoire peut décourager la divulgation si la confidentialité, la responsabilité et les conséquences concurrentielles sont mal conçues <Cite ids={['C10', 'C13']} />.</li>
        <li>Plusieurs faits australiens reposent sur le seul récit du développeur <Cite ids={['C07', 'C09']} />.</li>
        <li>Les reconstitutions contrefactuelles montrent comment le moment de l'avis pourrait changer selon la proposition. Elles ne peuvent pas montrer qu'un préjudice réel aurait été évité.</li>
        <li>Les tests déterministes montrent que le protocole se comporte comme spécifié. Ils ne montrent pas qu'un préjudice a été évité.</li>
      </ul> : <ul className="limits">
        <li>The registry, routing and clocks are simulated proposals, not law. A registry check is not cryptographic authentication.</li>
        <li>Federal procurement leverage does not reach unrelated private research or unknown operators of open-weight models.</li>
        <li>Mandatory reporting can discourage disclosure if confidentiality, liability and competitive consequences are badly designed <Cite ids={['C10', 'C13']} />.</li>
        <li>Several Australian facts rest on the developer's own account <Cite ids={['C07', 'C09']} />.</li>
        <li>The counterfactual replays show how notice timing might change under the proposal. They cannot show that any real-world harm would have been prevented.</li>
        <li>Deterministic tests show the protocol behaves as specified. They do not show harm prevented.</li>
      </ul>}

      <h2 className="no-print">{tr('Project materials')}</h2>
      <ul className="materials no-print">
        <li><a href="https://github.com/RavenSeldon/First-Notice" target="_blank" rel="noreferrer">{tr('Source code and README')}</a></li>
        <li><a href="https://github.com/RavenSeldon/First-Notice/blob/main/docs/FIRST-NOTICE-BRIEF.md" target="_blank" rel="noreferrer">{tr('Standalone policy brief, with references')}</a></li>
        <li><a href="https://github.com/RavenSeldon/First-Notice/blob/main/evidence/ledger.csv" target="_blank" rel="noreferrer">{tr('Evidence ledger (CSV)')}</a></li>
        <li><a href="https://github.com/RavenSeldon/First-Notice/tree/main/tests/acceptance" target="_blank" rel="noreferrer">{tr('Acceptance tests')}</a> · <a href="https://github.com/RavenSeldon/First-Notice/blob/main/docs/ACCEPTANCE.md" target="_blank" rel="noreferrer">{tr('acceptance checklist')}</a></li>
        <li><a href="https://github.com/RavenSeldon/First-Notice/blob/main/docs/AI_ASSISTANCE_LOG.md" target="_blank" rel="noreferrer">{tr('AI-assistance log')}</a></li>
        <li><a href="https://benamuwo.me/schrodingers_civ/" target="_blank" rel="noreferrer">{tr("Schrödinger's Civilization (prior work)")}</a></li>
      </ul>
    </section>
  );
}
