/**
 * Project offset income over retirement years.
 * Income_n = O * (1 + growthRate)^n
 */
export function projectIncome(
  baseIncome: number,
  growthRate: number,
  years: number
): number[] {
  return Array.from({ length: years }, (_, n) =>
    baseIncome * Math.pow(1 + growthRate, n + 1)
  );
}
