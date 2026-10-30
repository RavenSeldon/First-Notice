import type { Authenticity, Registry } from './types';

export const VERIFICATION_METHOD =
  'Simulated registry lookup against fixture credentials; not cryptographic authentication';

/**
 * Simulated registry check. Says nothing about whether the incident is real.
 * credential === null marks a documented historical notice whose verification is not on record.
 */
export function checkSender(reg: Registry, senderId: string, credential: string | null): Authenticity {
  if (credential === null) return 'historically-unknown';
  if (reg.available === false) return 'registry-unavailable';
  const s = reg.senders[senderId];
  if (!s) return 'unregistered';
  if (s.status === 'revoked') return 'revoked';
  if (credential === '') return 'unconfirmed';
  return credential === s.credential ? 'verified' : 'mismatch';
}

export const needsManualVerification = (a: Authenticity) => a !== 'verified';
export const isSuspicious = (a: Authenticity) => a === 'mismatch' || a === 'revoked';
