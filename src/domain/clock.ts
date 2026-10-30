/** All time comes from an explicitly supplied simulated clock. */
export const HOUR = 3_600_000;
export const addHours = (iso: string, h: number) => new Date(Date.parse(iso) + h * HOUR).toISOString();
export const hoursBetween = (a: string, b: string) => (Date.parse(b) - Date.parse(a)) / HOUR;
