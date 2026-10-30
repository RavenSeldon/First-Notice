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

/** Five distinct sender-verification states (simulated registry). */
export type Authenticity =
  | 'verified'        // registered sender, credential checks out
  | 'unconfirmed'     // registered sender, credential not yet checked
  | 'unregistered'    // sender not in registry
  | 'mismatch'        // claims a registered identity, credential does not match
  | 'revoked';        // registered, credential revoked

export type EvidenceStatus = 'corroborated' | 'partial' | 'unverified';

export type Consequence = 'low' | 'moderate' | 'high';

/**
 * T0 — informational; no mandatory acknowledgment.
 * T1 — urgent; mandatory receipt acknowledgment, 48 h notice clock.
 * T2 — update or correction to an earlier notice; supersedes but never erases.
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
  version: number;              // 1, 2, 3 …
  supersedesVersion?: number;
  tier: Tier;
  provenance: Provenance;
  senderId: string;
  recipientIds: string[];
  discoveredAt: string;         // ISO — when the sender identified the activity
  issuedAt: string;             // ISO — when this version was issued
  content: NoticeContent;
  sourceIds: string[];          // evidence-ledger IDs (C01…) where applicable
}

export type EventKind =
  | 'notice.issued'
  | 'notice.revised'
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
  senders: Record<string, { name: string; credential: string; status: 'active' | 'revoked' }>;
  recipients: Record<string, { name: string; channel: string; monitored24x7: boolean }>;
}

/** Proposed protocol parameters (proposals, not existing law). */
export const PROTOCOL = {
  t1NoticeHours: 48,
  ackTargetHours: 24,
} as const;
