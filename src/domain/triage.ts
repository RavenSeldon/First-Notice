import type { NoticeContent, Tier } from './types';

export interface TriageResult { tier: Tier; reasons: string[] }

/**
 * Tier comes from consequence and evidence, NOT from sender authenticity.
 * Incomplete evidence never downgrades a significant report below T1;
 * corroboration of significant activity makes it T2 (substantiated notifiable activity).
 */
export function triage(c: NoticeContent): TriageResult {
  const reasons: string[] = [];
  let significant = false;
  if (c.consequence === 'high') { significant = true; reasons.push('High potential consequence'); }
  else if (c.personalDataInvolved !== 'no' && c.consequence === 'moderate') {
    significant = true; reasons.push(`Moderate consequence with personal data ${c.personalDataInvolved}`);
  }
  if (significant) {
    if (c.evidence === 'corroborated') {
      reasons.push('Corroborated: substantiated notifiable activity');
      return { tier: 'T2', reasons };
    }
    reasons.push(`Evidence ${c.evidence}: uncertainty does not lower urgency`);
    return { tier: 'T1', reasons };
  }
  reasons.push('Informational: no mandatory acknowledgment');
  return { tier: 'T0', reasons };
}
