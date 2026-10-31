import type { EventKind, LogEvent, Notice, NoticeContent, Registry } from './types';
import { PROTOCOL } from './types';
import { addHours, hoursBetween } from './clock';
import { triage } from './triage';
import { CANONICAL, checkSender, VERIFICATION_METHOD } from './verification';
import { route } from './routing';

/** Append-only record. Nothing is ever mutated or removed. */
export interface Ledger {
  readonly notices: readonly Notice[];
  readonly events: readonly LogEvent[];
}

export const emptyLedger = (): Ledger => ({ notices: [], events: [] });

function append(l: Ledger, at: string, kind: EventKind, n: Notice, detail: Record<string, unknown> = {}): Ledger {
  const ev: LogEvent = Object.freeze({ seq: l.events.length + 1, at, kind, noticeId: n.id, version: n.version, detail: Object.freeze({ ...detail }) });
  return { notices: l.notices, events: Object.freeze([...l.events, ev]) as readonly LogEvent[] };
}

export interface IssueInput {
  id: string;
  provenance: Notice['provenance'];
  senderId: string;
  credential: string | null;
  recipientIds: string[];
  parentInvestigationId?: string;
  caseId?: string;
  discoveredAt: string;
  content: NoticeContent;
  sourceIds?: string[];
}

/** Issue → triage → sender check → route → receipt, all at simulated time `now`. */
export function issue(l: Ledger, reg: Registry, input: IssueInput, now: string): Ledger {
  const t = triage(input.content);
  const auth = checkSender(reg, input.senderId, input.credential);
  const r = route(reg, t.tier, auth, input.recipientIds);
  const n: Notice = Object.freeze({
    id: input.id, version: 1, tier: t.tier, provenance: input.provenance,
    parentInvestigationId: input.parentInvestigationId, caseId: input.caseId,
    ackRecipientIds: r.deliverTo.filter(id => reg.recipients[id]?.acknowledges !== false),
    senderId: input.senderId, recipientIds: r.deliverTo, discoveredAt: input.discoveredAt,
    issuedAt: now, content: Object.freeze({ ...input.content }), sourceIds: input.sourceIds ?? [],
  });
  let out: Ledger = { notices: Object.freeze([...l.notices, n]) as readonly Notice[], events: l.events };
  out = append(out, now, 'notice.issued', n, { tier: t.tier, reasons: t.reasons });
  const late = hoursBetween(input.discoveredAt, now);
  if (t.tier !== 'T0' && late > PROTOCOL.t1NoticeHours) {
    out = append(out, now, 'escalation.late-notice', n, { hoursAfterDiscovery: Math.round(late), limit: PROTOCOL.t1NoticeHours, provenance: n.provenance });
  }
  out = append(out, now, 'sender.checked', n, {
    authenticity: auth, canonical: CANONICAL[auth], method: VERIFICATION_METHOD,
    registry: reg.available === false ? 'unavailable' : 'simulated fixture registry',
  });
  out = append(out, now, 'notice.routed', n, { deliverTo: r.deliverTo, note: r.note, suspicious: r.suspicious });
  if (r.manualVerification) out = append(out, now, 'verification.manual-required', n, { authenticity: auth });
  for (const rec of r.deliverTo) out = append(out, now, 'notice.received', n, { recipient: rec });
  return out;
}

const received = (l: Ledger, n: Notice, recipient: string) =>
  l.events.some(e => e.noticeId === n.id && e.version === n.version && e.kind === 'notice.received' && e.detail.recipient === recipient);
const acknowledged = (l: Ledger, n: Notice, recipient: string) =>
  l.events.some(e => e.noticeId === n.id && e.version === n.version && e.kind === 'notice.acknowledged' && e.detail.recipient === recipient);

/** Who owes a receipt acknowledgment: the designated departmental recipient(s), not coordination copies. */
export const owesAck = (n: Notice) => n.ackRecipientIds ?? n.recipientIds;

/** Every T1 or T2 version needs its own receipt acknowledgment; T0 versions do not. */
export const ackRequired = (_l: Ledger, n: Notice) => n.tier !== 'T0';

/**
 * Acknowledge receipt of the latest version. Rejects recipients who never received it;
 * a repeated acknowledgment is a no-op, so the record holds one acknowledgment per recipient per version.
 */
export function acknowledge(l: Ledger, noticeId: string, recipient: string, now: string): Ledger {
  const n = latest(l, noticeId);
  if (!n) throw new Error(`Unknown notice ${noticeId}`);
  if (!received(l, n, recipient)) throw new Error(`${recipient} did not receive ${noticeId} v${n.version}`);
  if (acknowledged(l, n, recipient)) return l;
  return append(l, now, 'notice.acknowledged', n, { recipient });
}

/**
 * Update or correction: appends version n+1 and re-classifies it on its merits.
 * The tier can rise, stay or fall; a change of tier is recorded as its own event.
 * Earlier versions and their timestamps remain in the record.
 */
export function revise(l: Ledger, noticeId: string, changes: Partial<NoticeContent>, reason: string, now: string): Ledger {
  const prev = latest(l, noticeId);
  if (!prev) throw new Error(`Unknown notice ${noticeId}`);
  const content = Object.freeze({ ...prev.content, ...changes });
  const t = triage(content);
  const n: Notice = Object.freeze({
    ...prev, version: prev.version + 1, supersedesVersion: prev.version, tier: t.tier, issuedAt: now, content,
  });
  let out: Ledger = { notices: Object.freeze([...l.notices, n]) as readonly Notice[], events: l.events };
  out = append(out, now, 'notice.revised', n, { reason, changed: Object.keys(changes), tier: t.tier });
  if (t.tier !== prev.tier) out = append(out, now, 'notice.reclassified', n, { from: prev.tier, to: t.tier, reasons: t.reasons });
  // The update travels the same route as the original: every original recipient receives it.
  out = append(out, now, 'notice.routed', n, { deliverTo: n.recipientIds, note: 'Update delivered to every recipient of the original notice', suspicious: false });
  for (const rec of n.recipientIds) out = append(out, now, 'notice.received', n, { recipient: rec });
  return out;
}

/** Emit escalations for receipts (of any version that needs one) not acknowledged in time. Idempotent. */
export function checkOverdue(l: Ledger, now: string): Ledger {
  let out = l;
  for (const n of l.notices.filter(x => ackRequired(l, x))) {
    for (const rec of owesAck(n)) {
      if (!received(l, n, rec) || acknowledged(l, n, rec)) continue;
      const already = out.events.some(e => e.noticeId === n.id && e.version === n.version && e.kind === 'escalation.overdue-ack' && e.detail.recipient === rec);
      const due = addHours(n.issuedAt, PROTOCOL.ackTargetHours);
      if (!already && Date.parse(now) > Date.parse(due)) {
        out = append(out, now, 'escalation.overdue-ack', n, { recipient: rec, dueAt: due });
      }
    }
  }
  return out;
}

export const latest = (l: Ledger, id: string) =>
  l.notices.filter(n => n.id === id).sort((a, b) => b.version - a.version)[0];
export const history = (l: Ledger, id: string) => l.notices.filter(n => n.id === id);

export const exportJSON = (l: Ledger) => JSON.stringify({ format: 'first-notice/v1', notices: l.notices, events: l.events }, null, 2);
export function importJSON(s: string): Ledger {
  const o = JSON.parse(s);
  if (o.format !== 'first-notice/v1') throw new Error('Unknown format');
  return { notices: o.notices, events: o.events };
}
