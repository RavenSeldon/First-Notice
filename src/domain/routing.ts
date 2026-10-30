import type { Authenticity, Registry, Tier } from './types';
import { isSuspicious, needsManualVerification } from './verification';

export interface RouteDecision {
  deliverTo: string[];
  manualVerification: boolean;
  suspicious: boolean;
  note: string;
}

/**
 * An unverified URGENT notice is never silently dropped: it is delivered with a
 * manual-verification flag. (The Services Australia notice sat in a general
 * inbox checked once a day — C06, C14.)
 */
export function route(reg: Registry, tier: Tier, auth: Authenticity, requested: string[]): RouteDecision {
  const known = requested.filter(r => reg.recipients[r]);
  const manual = needsManualVerification(auth);
  const suspicious = isSuspicious(auth);
  let deliverTo = known;
  if (tier !== 'T0') {
    // Urgent traffic must reach a 24/7-monitored recipient.
    const watch = Object.entries(reg.recipients).filter(([, r]) => r.monitored24x7).map(([id]) => id);
    deliverTo = Array.from(new Set([...known, ...watch]));
  }
  const note = suspicious
    ? 'Sender credential failed: delivered for manual verification and flagged as possible spoof'
    : manual
      ? 'Sender not verified: delivered for manual verification'
      : 'Sender verified';
  return { deliverTo, manualVerification: manual, suspicious, note };
}
