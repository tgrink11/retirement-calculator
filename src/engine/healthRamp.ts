/**
 * Linear ramp of health share from start to end over the retirement period.
 * H%_n = start + (end - start) * (n / totalYears)
 */
export function getHealthShare(
  yearIndex: number,
  totalYears: number,
  startShare: number,
  endShare: number
): number {
  if (totalYears <= 0) return startShare;
  const t = Math.min(yearIndex / totalYears, 1);
  return startShare + (endShare - startShare) * t;
}
