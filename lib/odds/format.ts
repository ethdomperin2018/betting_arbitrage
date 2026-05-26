/** Display American odds with explicit + for positives. */
export function formatAmerican(american: number): string {
  if (american > 0) return `+${american}`;
  return String(american);
}
