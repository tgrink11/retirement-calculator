/**
 * Project spending year-over-year using iterative compounding.
 * Each year's spend = previous year * (1 + I_eff_n) * (1 + creep).
 * We use iterative compounding because I_eff varies each year
 * as the health share ramps up.
 */
export function projectSpending(
  baseSpend: number,
  effectiveInflations: number[],
  lifestyleCreepEnabled: boolean,
  lifestyleCreepRate: number
): number[] {
  const years = effectiveInflations.length;
  const spending: number[] = new Array(years);
  let current = baseSpend;

  for (let n = 0; n < years; n++) {
    const inflFactor = 1 + effectiveInflations[n];
    const creepFactor = lifestyleCreepEnabled ? 1 + lifestyleCreepRate : 1;
    current = current * inflFactor * creepFactor;
    spending[n] = current;
  }

  return spending;
}
