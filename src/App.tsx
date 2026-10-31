import { useEffect, useState } from 'react';
import Overview from './views/Overview';
import CaseFiles from './views/CaseFiles';
import NoticeLab from './views/NoticeLab';
import Findings from './views/Findings';
import Evidence from './views/Evidence';
import type { Provenance } from './domain/types';
import { FRENCH, langHref, t } from './i18n';

const SECTIONS = [
  ['record', 'The record'],
  ['cases', 'Case files'],
  ['lab', 'Notice lab'],
  ['findings', 'Findings'],
  ['evidence', 'Evidence'],
] as const;
type Section = typeof SECTIONS[number][0];

/** What the footer says on each page: which provenance marks appear there, and the caveat that governs it. */
const FOOT: Record<Section, { marks: Provenance[]; note: string }> = {
  record: { marks: ['documented'], note: 'Every date and claim on this page cites the evidence ledger; approximate dates are shown as approximate.' },
  cases: { marks: ['documented'], note: "Several entries rest on the developer's own account; each is flagged where it appears." },
  lab: { marks: ['counterfactual', 'synthetic'], note: 'A simulation: the registry, routing and clocks are proposals, not law, and sender checks are not cryptographic authentication.' },
  findings: { marks: ['documented'], note: "The brief is the author's argument; every citation links to the evidence ledger." },
  evidence: { marks: ['documented'], note: 'Passages are quoted verbatim from their sources and are never translated.' },
};
const MARK_TEXT: Record<Provenance, string> = {
  documented: 'Documented: cites the evidence ledger',
  counterfactual: 'Counterfactual: the documented case replayed under the proposal',
  synthetic: 'Synthetic: invented to test failure',
};

const fromHash = (): Section => {
  const h = location.hash.slice(1);
  return (SECTIONS.find(([id]) => id === h)?.[0]) ?? 'record';
};

function LangSwitch() {
  return (
    <span className="lang" role="group" aria-label={t('Language')}>
      {FRENCH ? <a href={langHref('en')} hrefLang="en" lang="en">English</a> : <span aria-current="true">English</span>}
      {FRENCH ? <span aria-current="true">Français</span> : <a href={langHref('fr')} hrefLang="fr" lang="fr">Français</a>}
    </span>
  );
}

export default function App() {
  const [section, setSection] = useState<Section>(fromHash);
  useEffect(() => {
    const on = () => setSection(fromHash());
    addEventListener('hashchange', on);
    return () => removeEventListener('hashchange', on);
  }, []);
  useEffect(() => { document.getElementById('main')?.focus({ preventScroll: true }); scrollTo({ top: 0 }); }, [section]);

  const i = SECTIONS.findIndex(([id]) => id === section);
  const prev = SECTIONS[i - 1], next = SECTIONS[i + 1];
  const foot = FOOT[section];

  return (
    <>
      <a className="skip" href="#main">{t('Skip to content')}</a>
      <header className="masthead">
        <div className="masthead-inner">
        <div className="wordmark">
          <img className="glyph" src={`${import.meta.env.BASE_URL}glyph-mark.svg`} alt="" width="32" height="32" />
          <span>{t('First Notice')}</span>
        </div>
        <nav aria-label={t('Sections')}>
          <ol>
            {SECTIONS.map(([id, label], n) => (
              <li key={id}>
                <a href={`#${id}`} aria-current={section === id ? 'page' : undefined}>
                  <span className="n">{n + 1}</span>{t(label)}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <LangSwitch />
        </div>
      </header>
      {FRENCH && <p className="draft-banner" role="note">{t('Draft translation: machine-assisted and pending human review. The English version is authoritative; quoted source passages stay in their original language.')}</p>}
      <main id="main" tabIndex={-1}>
        {section === 'record' && <Overview />}
        {section === 'cases' && <CaseFiles />}
        {section === 'lab' && <NoticeLab />}
        {section === 'findings' && <Findings />}
        {section === 'evidence' && <Evidence />}
      </main>
      <footer className="colophon">
        <nav className="pager" aria-label={`${t('Previous')} / ${t('Next')}`}>
          {prev ? <a href={`#${prev[0]}`} rel="prev"><span className="qual">← {t('Previous')}</span>{t(prev[1])}</a> : <span />}
          {next ? <a href={`#${next[0]}`} rel="next" className="pager-next"><span className="qual">{t('Next')} →</span>{t(next[1])}</a> : <span />}
        </nav>
        <dl className="key">
          {foot.marks.map(m => (
            <div key={m}><dt><span className={`mark ${m}`} /></dt><dd>{t(MARK_TEXT[m])}</dd></div>
          ))}
        </dl>
        <p className="foot-note">{t(foot.note)}</p>
        <div className="foot-base">
          <p>{t('A proposed Canadian protocol, built for the Mangrove Middle Powers Hackathon. No real government system is contacted.')} <em>{t('What changes is the account, never the record.')}</em></p>
          <LangSwitch />
        </div>
      </footer>
    </>
  );
}
