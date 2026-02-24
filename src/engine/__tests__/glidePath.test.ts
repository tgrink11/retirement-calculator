import { describe, it, expect } from 'vitest';
import { calculateGlidePath } from '../glidePath';
import { DEFAULT_INPUTS } from '../../state/defaults';

describe('calculateGlidePath', () => {
  it('weights sum to 1.0', () => {
    const result = calculateGlidePath(DEFAULT_INPUTS);
    const totalWeight = result.allocations.reduce((sum, a) => sum + a.weight, 0);
    expect(totalWeight).toBeCloseTo(1.0, 5);
  });

  it('all weights are non-negative', () => {
    const result = calculateGlidePath(DEFAULT_INPUTS);
    result.allocations.forEach((a) => {
      expect(a.weight).toBeGreaterThanOrEqual(0);
    });
  });

  it('young person gets ~90% equity', () => {
    const result = calculateGlidePath({ ...DEFAULT_INPUTS, currentAge: 25, retirementAge: 65 });
    const equityPct = result.allocations
      .filter((a) => a.name.includes('Equit'))
      .reduce((sum, a) => sum + a.weight, 0);
    expect(equityPct).toBeGreaterThan(0.85);
    expect(equityPct).toBeCloseTo(0.90, 2);
  });

  it('near-retirement person gets ~40-50% equity', () => {
    const result = calculateGlidePath({ ...DEFAULT_INPUTS, currentAge: 60, retirementAge: 65 });
    const equityPct = result.allocations
      .filter((a) => a.name.includes('Equit'))
      .reduce((sum, a) => sum + a.weight, 0);
    expect(equityPct).toBeGreaterThan(0.35);
    expect(equityPct).toBeLessThan(0.55);
  });

  it('at retirement gets ~35% equity', () => {
    const result = calculateGlidePath({ ...DEFAULT_INPUTS, currentAge: 65, retirementAge: 65 });
    const equityPct = result.allocations
      .filter((a) => a.name.includes('Equit'))
      .reduce((sum, a) => sum + a.weight, 0);
    expect(equityPct).toBeCloseTo(0.35, 1);
  });

  it('equity decreases as current age increases', () => {
    const ages = [25, 35, 45, 55, 63];
    const equityPcts = ages.map((age) => {
      const result = calculateGlidePath({ ...DEFAULT_INPUTS, currentAge: age, retirementAge: 65 });
      return result.allocations
        .filter((a) => a.name.includes('Equit'))
        .reduce((sum, a) => sum + a.weight, 0);
    });

    for (let i = 1; i < equityPcts.length; i++) {
      expect(equityPcts[i]).toBeLessThan(equityPcts[i - 1]);
    }
  });

  it('expected return is within bounds', () => {
    const result = calculateGlidePath(DEFAULT_INPUTS);
    expect(result.expectedPortfolioReturn).toBeGreaterThan(0.03);
    expect(result.expectedPortfolioReturn).toBeLessThan(0.10);
  });

  it('portfolio volatility is positive', () => {
    const result = calculateGlidePath(DEFAULT_INPUTS);
    expect(result.portfolioVolatility).toBeGreaterThan(0);
  });
});
