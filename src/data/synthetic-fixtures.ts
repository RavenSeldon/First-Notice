/** SYNTHETIC / COUNTERFACTUAL material. Never presented as documented fact. */
import type { Registry } from '../domain/types';
import type { IssueInput } from '../domain/event-log';

export const REGISTRY: Registry = {
  senders: {
    'dev-alpha': { name: 'Frontier Developer A (simulated)', credential: 'key-alpha', status: 'active' },
    'dev-beta': { name: 'Frontier Developer B (simulated)', credential: 'key-beta', status: 'revoked' },
  },
  recipients: {
    'cyber-centre': { name: 'National cyber centre (simulated, 24/7)', channel: 'secure-intake', monitored24x7: true },
    'agency-security': { name: 'Affected agency security team (simulated)', channel: 'designated-contact', monitored24x7: false },
    'public-inbox': { name: 'General public-disclosures inbox (simulated)', channel: 'email', monitored24x7: false },
  },
};

/**
 * Counterfactual replay of the Services Australia case under the proposed protocol.
 * ASSUMPTION (explicit): discovery placed at 2026-08-15 12:00 UTC to stand in for
 * the documented "mid-August" (C02). The real day is not public.
 */
export const COUNTERFACTUAL_ASSUMPTIONS = [
  'Discovery set to 15 Aug 2026 to represent "mid-August" (C02); the real day is unknown.',
  'Developer is a registered sender with a valid credential.',
  'A designated 24/7 recipient exists — modelled on the post-incident reroute (C08), not on any existing Canadian channel.',
  'Clock values (48 h notice, 24 h acknowledgment) are proposals, not existing law.',
];

export const COUNTERFACTUAL_SA: IssueInput = {
  id: 'CF-SA-1', provenance: 'counterfactual', senderId: 'dev-alpha', credential: 'key-alpha',
  recipientIds: ['agency-security'], discoveredAt: '2026-08-15T12:00:00.000Z',
  content: {
    summary: 'Model obtained non-public access to a public statistics portal; scope still under review.',
    affectedSystem: 'Public statistics portal (counterfactual of C01)',
    activityWindow: 'June 2026 (exact day pending)',
    consequence: 'high', evidence: 'partial', personalDataInvolved: 'unknown',
  },
  sourceIds: ['C01', 'C02'],
};

/** The three locked failure cases. */
export const FAILURE_SPOOF: IssueInput = {
  id: 'SYN-SPOOF', provenance: 'synthetic', senderId: 'dev-alpha', credential: 'forged',
  recipientIds: ['agency-security'], discoveredAt: '2026-11-01T00:00:00.000Z',
  content: { summary: 'Claimed urgent incident from a forged credential', affectedSystem: 'Synthetic', activityWindow: 'Synthetic',
    consequence: 'high', evidence: 'unverified', personalDataInvolved: 'unknown' },
};
export const FAILURE_INCOMPLETE: IssueInput = {
  id: 'SYN-INCOMPLETE', provenance: 'synthetic', senderId: 'dev-alpha', credential: 'key-alpha',
  recipientIds: ['agency-security'], discoveredAt: '2026-11-01T00:00:00.000Z',
  content: { summary: 'High-consequence access, evidence incomplete', affectedSystem: 'Synthetic', activityWindow: 'Synthetic',
    consequence: 'high', evidence: 'partial', personalDataInvolved: 'unknown' },
};
export const FAILURE_UNACKED = { ...FAILURE_INCOMPLETE, id: 'SYN-UNACKED' };
