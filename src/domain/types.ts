/**
 * First Notice — shared domain model.
 * Governing principle: what changes is the account, never the record.
 *
 * Three decision dimensions are deliberately independent:
 *  - Authenticity: is the sender who they claim to be?
 *  - Evidence: how well-supported is the reported incident?
 *  - Urgency (tier): how fast must the recipient act?
 * Verifying a sender never upgrades evidence; corroborating evidence never
 * authenticates a sender; neither alone fixes the tier.
 */

/** Where a record comes from. Must stay visibly distinct everywhere. */
export type Provenance = 'documented' | 'counterfactual' | 'synthetic';

/** The five canonical sender-verification states (frozen spec v1.2 §4). */
export type CanonicalAuth = 'Verified' | 'Unverified' | 'Failed' | 'Registry unavailable' | 'Historically unknown';

/**
 * Internal sender-verification states, mapped to the canonical five. All are SIMULATED: a fixture registry and fixture credentials,
 * not cryptographic authentication or proof of real-world identity.
 */
export type Authenticity =
  | 'verified'              // registered sender, fixture credential matches
  | 'unconfirmed'           // registered sender, credential not yet checked
  | 'unregistered'          // sender not in registry
  | 'mismatch'              // claims a registered identity, credential does not match
  | 'revoked'               // registered, credential revoked
  | 'registry-unavailable'  // the registry could not be consulted
  | 'historically-unknown'; // a documented past notice: what verification occurred is not on record

export type EvidenceStatus = 'corroborated' | 'partial' | 'unverified';

export type Consequence = 'low' | 'moderate' | 'high';

/**
 * Tier is the substantive classification; VERSION (v1, v2…) is the evolving account. They are independent.
 * T0 — informational; no mandatory acknowledgment.
 * T1 — credible, potentially significant, not yet substantiated; acknowledgment required, 48 h notice clock.
 * T2 — substantiated notifiable activity: corroborated, materially significant unauthorized activity
 *      (frozen spec v1.2 §4). Actionable technical update; earlier provisional versions preserved.
 * An update re-classifies on its merits: it can raise, keep or lower the tier, with the reasoning recorded.
 */
export type Tier = 'T0' | 'T1' | 'T2';

export interface NoticeContent {
  summary: string;
  affectedSystem: string;
  activityWindow: string;       // free text with precision, e.g. "June 2026 (day unknown)"
  consequence: Consequence;
  evidence: EvidenceStatus;
  personalDataInvolved: 'yes' | 'no' | 'unknown';
}

export interface Notice {
  id: string;                   // stable across versions
  parentInvestigationId?: string; // the developer investigation this notice comes from
  caseId?: string;              // the affected-organization case it concerns
  version: number;              // 1, 2, 3 …
  supersedesVersion?: number;
  tier: Tier;
  provenance: Provenance;
  senderId: string;
  recipientIds: string[];
  discoveredAt: string;         // ISO — qualifying discovery: when the sender identified reportable activity
  issuedAt: string;             // ISO — when this version was issued
  content: NoticeContent;
  sourceIds: string[];          // evidence-ledger IDs (C01…) where applicable
}

export type EventKind =
  | 'notice.issued'
  | 'notice.revised'
  | 'notice.reclassified'
  | 'sender.checked'
  | 'notice.routed'
  | 'notice.received'
  | 'notice.acknowledged'
  | 'verification.manual-required'
  | 'escalation.overdue-ack'
  | 'escalation.late-notice';

export interface LogEvent {
  seq: number;
  at: string;                   // ISO, from the simulated clock
  kind: EventKind;
  noticeId: string;
  version: number;
  detail: Record<string, unknown>;
}

export interface Registry {
  available?: boolean;          // false = registry could not be consulted (default true)
  senders: Record<string, { name: string; credential: string; status: 'active' | 'revoked' }>;
  recipients: Record<string, { name: string; channel: string; monitored24x7: boolean }>;
}

/** Proposed protocol parameters (proposals, not existing law). */
export const PROTOCOL = {
  t1NoticeHours: 48,
  ackTargetHours: 24,
} as const;
