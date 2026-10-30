import type { Authenticity, CanonicalAuth, Registry } from './types';

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

/**
 * Map the finer internal states onto the canonical five.
 * Unregistered is Unverified, not Failed: an unknown reporter may be legitimate but absent from the registry.
 * Failed is reserved for positive evidence of an invalid credential.
 */
export const CANONICAL: Record<Authenticity, CanonicalAuth> = {
  verified: 'Verified',
  unconfirmed: 'Unverified',
  unregistered: 'Unverified',
  mismatch: 'Failed',
  revoked: 'Failed',
  'registry-unavailable': 'Registry unavailable',
  'historically-unknown': 'Historically unknown',
};
export const SPECIFIC: Record<Authenticity, string> = {
  verified: 'simulated registry match',
  unconfirmed: 'registered, credential not yet checked',
  unregistered: 'not in the registry',
  mismatch: 'credential does not match the claimed sender',
  revoked: 'credential revoked',
  'registry-unavailable': 'the registry could not be consulted',
  'historically-unknown': 'how the sender was verified is not on record',
};
export const describeAuth = (a: Authenticity) => `${CANONICAL[a]}: ${SPECIFIC[a]}`;
