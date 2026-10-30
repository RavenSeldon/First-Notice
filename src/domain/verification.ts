import type { Authenticity, Registry } from './types';

/** Simulated registry check. Says nothing about whether the incident is real. */
export function checkSender(reg: Registry, senderId: string, credential: string): Authenticity {
  const s = reg.senders[senderId];
  if (!s) return 'unregistered';
  if (s.status === 'revoked') return 'revoked';
  if (credential === '') return 'unconfirmed';
  return credential === s.credential ? 'verified' : 'mismatch';
}

export const needsManualVerification = (a: Authenticity) => a !== 'verified';
export const isSuspicious = (a: Authenticity) => a === 'mismatch' || a === 'revoked';
