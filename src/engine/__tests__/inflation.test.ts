import { describe, it, expect } from 'vitest';
import { getEffectiveInflation } from '../inflation';

describe('getEffectiveInflation', () => {
  it('computes correct weighted inflation', () => {
    // I_eff = (0.035 * 0.7) + (0.058 * 0.3) + 0.015 + 0.010
    // = 0.0245 + 0.0174 + 0.015 + 0.010 = 0.0669
    const result = getEffectiveInflation(0.035, 0.058, 0.015, 0.01, 0.30);
    expect(result).toBeCloseTo(0.0669, 4);
  });

  it('returns baseline + tech + climate when health share is 0', () => {
    const result = getEffectiveInflation(0.035, 0.058, 0.015, 0.01, 0);
    expect(result).toBeCloseTo(0.035 + 0.015 + 0.01, 5);
  });

  it('returns health + tech + climate when health share is 1', () => {
    const result = getEffectiveInflation(0.035, 0.058, 0.015, 0.01, 1);
    expect(result).toBeCloseTo(0.058 + 0.015 + 0.01, 5);
  });

  it('increases with higher health share', () => {
    const low = getEffectiveInflation(0.035, 0.058, 0.015, 0.01, 0.20);
    const high = getEffectiveInflation(0.035, 0.058, 0.015, 0.01, 0.50);
    expect(high).toBeGreaterThan(low);
  });
});
