import type { EventKind, LogEvent, Notice, NoticeContent, Registry } from './types';
import { PROTOCOL } from './types';
import { addHours, hoursBetween } from './clock';
import { triage } from './triage';
import { checkSender } from './verification';
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
  credential: string;
  recipientIds: string[];
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
    senderId: input.senderId, recipientIds: r.deliverTo, discoveredAt: input.discoveredAt,
    issuedAt: now, content: Object.freeze({ ...input.content }), sourceIds: input.sourceIds ?? [],
  });
  let out: Ledger = { notices: Object.freeze([...l.notices, n]) as readonly Notice[], events: l.events };
  out = append(out, now, 'notice.issued', n, { tier: t.tier, reasons: t.reasons });
  const late = hoursBetween(input.discoveredAt, now);
  if (t.tier === 'T1' && late > PROTOCOL.t1NoticeHours) {
    out = append(out, now, 'escalation.late-notice', n, { hoursAfterDiscovery: Math.round(late), limit: PROTOCOL.t1NoticeHours });
  }
  out = append(out, now, 'sender.checked', n, { authenticity: auth });
  out = append(out, now, 'notice.routed', n, { deliverTo: r.deliverTo, note: r.note, suspicious: r.suspicious });
  if (r.manualVerification) out = append(out, now, 'verification.manual-required', n, { authenticity: auth });
  for (const rec of r.deliverTo) out = append(out, now, 'notice.received', n, { recipient: rec });
  return out;
}

export function acknowledge(l: Ledger, noticeId: string, recipient: string, now: string): Ledger {
  const n = latest(l, noticeId);
  if (!n) throw new Error(`Unknown notice ${noticeId}`);
  return append(l, now, 'notice.acknowledged', n, { recipient });
}

/** Correction: appends version n+1 as T2; the original remains in the record. */
export function revise(l: Ledger, noticeId: string, changes: Partial<NoticeContent>, reason: string, now: string): Ledger {
  const prev = latest(l, noticeId);
  if (!prev) throw new Error(`Unknown notice ${noticeId}`);
  const n: Notice = Object.freeze({
    ...prev, version: prev.version + 1, supersedesVersion: prev.version, tier: 'T2', issuedAt: now,
    content: Object.freeze({ ...prev.content, ...changes }),
  });
  const out: Ledger = { notices: Object.freeze([...l.notices, n]) as readonly Notice[], events: l.events };
  return append(out, now, 'notice.revised', n, { reason, changed: Object.keys(changes), originalTier: prev.tier });
}

/** Emit escalations for T1 receipts not acknowledged within the target. Idempotent. */
export function checkOverdue(l: Ledger, now: string): Ledger {
  let out = l;
  for (const n of l.notices.filter(x => x.version === 1 && x.tier === 'T1')) {
    for (const rec of n.recipientIds) {
      const acked = l.events.some(e => e.noticeId === n.id && e.kind === 'notice.acknowledged' && e.detail.recipient === rec);
      const already = out.events.some(e => e.noticeId === n.id && e.kind === 'escalation.overdue-ack' && e.detail.recipient === rec);
      const due = addHours(n.issuedAt, PROTOCOL.ackTargetHours);
      if (!acked && !already && Date.parse(now) > Date.parse(due)) {
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
