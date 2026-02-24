/**
 * Effective annual inflation weighted by health share.
 * I_eff = (I_b * (1 - H%)) + (I_h * H%) + I_t + I_c
 */
export function getEffectiveInflation(
  baselineInflation: number,
  healthInflation: number,
  techInflation: number,
  climateBuffer: number,
  healthShare: number
): number {
  return (
    baselineInflation * (1 - healthShare) +
    healthInflation * healthShare +
    techInflation +
    climateBuffer
  );
}
