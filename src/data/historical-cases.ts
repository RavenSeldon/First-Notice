/**
 * DOCUMENTED record. Every dated entry cites ledger IDs and carries its precision.
 * Nothing here is inferred beyond what the cited passages say.
 */
export type Precision = 'day' | 'approximate' | 'month';

export interface TimelineEntry {
  date: string;            // ISO date; for month/approximate precision, a representative day
  precision: Precision;
  label: string;
  sourceIds: string[];
  developerAccountOnly?: boolean;
}

export interface CaseFile {
  id: string;
  organization: string;
  jurisdiction: string;
  summary: string;
  belowDisclosureThreshold?: boolean;
  separatelyDiscovered?: boolean;
  timeline: TimelineEntry[];
  qualifications: string[];
}

export const CASES: CaseFile[] = [
  {
    id: 'services-australia', organization: 'Services Australia — Medicare Statistics Reporting Service',
    jurisdiction: 'Commonwealth',
    summary: 'Unauthorized access to a public-facing statistics portal by an experimental model during training/evaluation.',
    timeline: [
      { date: '2026-06-18', precision: 'day', label: 'Unauthorized access', sourceIds: ['C01'] },
      { date: '2026-08-15', precision: 'approximate', label: 'OpenAI review identifies the activity ("mid-August")', sourceIds: ['C02'], developerAccountOnly: true },
      { date: '2026-09-10', precision: 'day', label: 'Notice sent to the public-disclosures inbox', sourceIds: ['C03'] },
      { date: '2026-09-11', precision: 'day', label: 'Services Australia sees/checks the email', sourceIds: ['C04'] },
      { date: '2026-09-15', precision: 'day', label: 'Services Australia notifies ASD', sourceIds: ['C05'] },
      { date: '2026-09-17', precision: 'approximate', label: 'Minister advised ("around the 17th")', sourceIds: ['C12'] },
      { date: '2026-09-22', precision: 'day', label: 'First technical exchange', sourceIds: ['C12'] },
    ],
    qualifications: [
      'Exact access date comes only from the Sept 28 interview (C01).',
      'Delay explanation relayed from Services Australia; still under investigation (C06).',
      'OpenAI accepting the ASD-channel view is the Minister\'s understanding (C11).',
    ],
  },
  {
    id: 'vic-health', organization: 'Victorian Department of Health', jurisdiction: 'Victoria',
    summary: 'Exposed access key used to retrieve reporting configuration and aggregate statistics.',
    timeline: [{ date: '2026-09-10', precision: 'day', label: 'Notified by OpenAI', sourceIds: ['C07'], developerAccountOnly: true }],
    qualifications: ['Developer\'s account only.'],
  },
  {
    id: 'bocsar', organization: 'NSW Bureau of Crime Statistics and Research', jurisdiction: 'New South Wales',
    summary: 'Public Crime Mapping Tool returned configuration, jobs/logs and metadata.',
    timeline: [{ date: '2026-09-18', precision: 'day', label: 'Notified by OpenAI', sourceIds: ['C07'], developerAccountOnly: true }],
    qualifications: ['Developer\'s account only.'],
  },
  {
    id: 'aihw', organization: 'Australian Institute of Health and Welfare', jurisdiction: 'Commonwealth',
    summary: 'Aggregate statistics retrieved; separate bypass attempts unsuccessful.',
    belowDisclosureThreshold: true,
    timeline: [{ date: '2026-09-24', precision: 'day', label: 'Notified (below OpenAI\'s disclosure threshold)', sourceIds: ['C07'], developerAccountOnly: true }],
    qualifications: ['Below the developer\'s own disclosure threshold; notified to share findings.'],
  },
  {
    id: 'npws', organization: 'NSW National Parks and Wildlife Service', jurisdiction: 'New South Wales',
    summary: 'Separately discovered later; crafted queries inferred non-public database metadata.',
    separatelyDiscovered: true,
    timeline: [
      { date: '2026-09-29', precision: 'day', label: 'OpenAI identifies the activity', sourceIds: ['C09'], developerAccountOnly: true },
      { date: '2026-10-01', precision: 'approximate', label: 'Initial contact "within 48 hours"', sourceIds: ['C09'], developerAccountOnly: true },
    ],
    qualifications: ['48 h is to initial contact, not completed technical notification.', 'Distinct from BOCSAR.'],
  },
];

/** Context for the proposal: existing regimes this protocol supplements, not replaces. */
export const EXISTING_REGIMES = [
  { label: 'Canada: GC departments → Cyber Centre, ≤1 h initial / 24 h detailed', sourceIds: ['C15'], note: 'Covers departments, not external AI developers.' },
  { label: 'Canada: GC contractors carry compliance obligations; departments accountable for third-party incidents', sourceIds: ['C16'], note: 'No specific contractor deadline established here.' },
  { label: 'Australia: critical infrastructure 12 h (critical) / 72 h (other)', sourceIds: ['C18'], note: 'Covered assets only.' },
  { label: 'OECD common AI-incident reporting framework: 29 criteria', sourceIds: ['C17'], note: 'Informs interoperable fields; non-binding.' },
];
