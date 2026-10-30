import type { NoticeContent, Tier } from './types';

export interface TriageResult { tier: Exclude<Tier, 'T2'>; reasons: string[] }

/**
 * Urgency is derived from consequence, NOT from sender authenticity, and
 * incomplete evidence never downgrades a high-consequence report.
 */
export function triage(c: NoticeContent): TriageResult {
  const reasons: string[] = [];
  if (c.consequence === 'high') {
    reasons.push('High potential consequence');
    if (c.evidence !== 'corroborated') reasons.push(`Evidence ${c.evidence}: uncertainty does not lower urgency`);
    return { tier: 'T1', reasons };
  }
  if (c.personalDataInvolved !== 'no' && c.consequence === 'moderate') {
    reasons.push(`Moderate consequence with personal data ${c.personalDataInvolved}`);
    return { tier: 'T1', reasons };
  }
  reasons.push('Informational: no mandatory acknowledgment');
  return { tier: 'T0', reasons };
}
