import { useState } from 'react';
import Overview from './views/Overview';
import CaseFiles from './views/CaseFiles';
import NoticeLab from './views/NoticeLab';
import Findings from './views/Findings';

const TABS = [['overview', 'The record'], ['cases', 'Case files'], ['lab', 'Notice lab'], ['findings', 'Findings']] as const;
type Tab = typeof TABS[number][0];

export default function App() {
  const [tab, setTab] = useState<Tab>('overview');
  return (
    <>
      <header>
        <h1>First Notice</h1>
        <p className="tag">A proposed AI-incident notification protocol for Canada. <em>What changes is the account, never the record.</em></p>
        <nav aria-label="Sections">
          {TABS.map(([id, label]) => (
            <button key={id} aria-current={tab === id ? 'page' : undefined} onClick={() => setTab(id)}>{label}</button>
          ))}
        </nav>
      </header>
      <main>
        {tab === 'overview' && <Overview />}
        {tab === 'cases' && <CaseFiles />}
        {tab === 'lab' && <NoticeLab />}
        {tab === 'findings' && <Findings />}
      </main>
      <footer>Documented facts cite the evidence ledger. Counterfactual and synthetic material is labelled as such. No real government systems are contacted.</footer>
    </>
  );
}
