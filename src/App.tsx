import { useEffect, useState } from 'react';
import Overview from './views/Overview';
import CaseFiles from './views/CaseFiles';
import NoticeLab from './views/NoticeLab';
import Findings from './views/Findings';

const SECTIONS = [
  ['record', 'The record'],
  ['cases', 'Case files'],
  ['lab', 'Notice lab'],
  ['findings', 'Findings'],
] as const;
type Section = typeof SECTIONS[number][0];

const fromHash = (): Section => {
  const h = location.hash.slice(1);
  return (SECTIONS.find(([id]) => id === h)?.[0]) ?? 'record';
};

export default function App() {
  const [section, setSection] = useState<Section>(fromHash);
  useEffect(() => {
    const on = () => setSection(fromHash());
    addEventListener('hashchange', on);
    return () => removeEventListener('hashchange', on);
  }, []);
  useEffect(() => { document.getElementById('main')?.focus({ preventScroll: true }); scrollTo({ top: 0 }); }, [section]);

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <header className="masthead">
        <div className="masthead-inner">
        <div className="wordmark">
          <img className="glyph" src={`${import.meta.env.BASE_URL}glyph-mark.svg`} alt="" width="32" height="32" />
          <span>First Notice</span>
        </div>
        <nav aria-label="Sections">
          <ol>
            {SECTIONS.map(([id, label], i) => (
              <li key={id}>
                <a href={`#${id}`} aria-current={section === id ? 'page' : undefined}>
                  <span className="n">{i + 1}</span>{label}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        </div>
      </header>
      <main id="main" tabIndex={-1}>
        {section === 'record' && <Overview />}
        {section === 'cases' && <CaseFiles />}
        {section === 'lab' && <NoticeLab />}
        {section === 'findings' && <Findings />}
      </main>
      <footer className="colophon">
        <dl className="key">
          <div><dt><span className="mark documented" /></dt><dd>Documented: cites the evidence ledger</dd></div>
          <div><dt><span className="mark counterfactual" /></dt><dd>Counterfactual: the documented case replayed under the proposal</dd></div>
          <div><dt><span className="mark synthetic" /></dt><dd>Synthetic: invented to test failure</dd></div>
        </dl>
        <p>A proposed Canadian protocol, built for the Mangrove Middle Powers Hackathon. No real government system is contacted. <em>What changes is the account, never the record.</em></p>
      </footer>
    </>
  );
}
