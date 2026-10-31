/** The author's brief: five section files in content/brief/, rendered in filename order. */
import { stripComments } from './render';

export interface BriefSection { key: string; title: string; target: number; md: string }

const META: Record<string, { title: string; target: number }> = {
  '1-recommendation': { title: 'The recommendation and why Canada should act', target: 375 },
  '2-evidence': { title: 'The Australian evidence and the notification gap', target: 500 },
  '3-protocol': { title: 'The proposed procurement-backed protocol', target: 750 },
  '4-implementation': { title: 'Implementation, objections and safeguards', target: 625 },
  '5-pilot': { title: 'Pilot evaluation and conclusion', target: 250 },
};

const files = import.meta.glob('../../content/brief/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;

export const BRIEF: BriefSection[] = Object.entries(files)
  .map(([path, md]) => {
    const key = path.split('/').pop()!.replace(/\.md$/, '');
    return { key, md, ...(META[key] ?? { title: key, target: 0 }) };
  })
  .sort((a, b) => a.key.localeCompare(b.key));

/** Sections the author has actually written (anything besides comments). */
export const WRITTEN = BRIEF.filter(s => stripComments(s.md).length > 0);

/** Draft French translation of the brief (content/brief/fr/), same filenames and citations. English is authoritative. */
const filesFr = import.meta.glob('../../content/brief/fr/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;
export const BRIEF_FR: BriefSection[] = Object.entries(filesFr)
  .map(([path, md]) => {
    const key = path.split('/').pop()!.replace(/\.md$/, '');
    return { key, md, ...(META[key] ?? { title: key, target: 0 }) };
  })
  .sort((a, b) => a.key.localeCompare(b.key));
export const WRITTEN_FR = BRIEF_FR.filter(s => stripComments(s.md).length > 0);
