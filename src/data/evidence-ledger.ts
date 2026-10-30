/** The frozen ledger (evidence/ledger.csv) is the single source of truth; parsed, never retyped. */
import raw from '../../evidence/ledger.csv?raw';
import { parseCSV } from './csv';

export interface Claim {
  id: string; claim: string; source_org: string; source_url: string; supporting_passage: string;
  event_date: string; precision: string; status: string; qualification: string;
}

const [header, ...body] = parseCSV(raw);
export const CLAIMS: Claim[] = body.map(r => Object.fromEntries(header.map((h, i) => [h, r[i] ?? ''])) as unknown as Claim);
export const claim = (id: string) => CLAIMS.find(c => c.id === id);
export const sourceUrls = (c: Claim) => c.source_url.split(' ; ').filter(Boolean);
