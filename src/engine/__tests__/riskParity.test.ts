import { describe, it, expect } from 'vitest';
import { calculateRiskParity } from '../riskParity';
import { DEFAULT_INPUTS } from '../../state/defaults';

describe('calculateRiskParity', () => {
  it('weights sum to 1.0', () => {
    const result = calculateRiskParity(DEFAULT_INPUTS, 2_000_000);
    const totalWeight = result.allocations.reduce((sum, a) => sum + a.weight, 0);
    expect(totalWeight).toBeCloseTo(1.0, 5);
  });

  it('all weights are positive', () => {
    const result = calculateRiskParity(DEFAULT_INPUTS, 2_000_000);
    result.allocations.forEach((a) => {
      expect(a.weight).toBeGreaterThan(0);
    });
  });

  it('expected return is within bounds', () => {
    const result = calculateRiskParity(DEFAULT_INPUTS, 2_000_000);
    expect(result.expectedPortfolioReturn).toBeGreaterThan(0.03);
    expect(result.expectedPortfolioReturn).toBeLessThan(0.10);
  });

  it('portfolio volatility is positive', () => {
    const result = calculateRiskParity(DEFAULT_INPUTS, 2_000_000);
    expect(result.portfolioVolatility).toBeGreaterThan(0);
  });

  it('returns 6 asset classes', () => {
    const result = calculateRiskParity(DEFAULT_INPUTS, 2_000_000);
    expect(result.allocations).toHaveLength(6);
  });

  it('young person gets more equity than someone near retirement', () => {
    const young = calculateRiskParity({ ...DEFAULT_INPUTS, currentAge: 25 }, 2_000_000);
    const older = calculateRiskParity({ ...DEFAULT_INPUTS, currentAge: 60 }, 2_000_000);

    const youngEquity = young.allocations
      .filter((a) => a.name.includes('Equit'))
      .reduce((sum, a) => sum + a.weight, 0);
    const olderEquity = older.allocations
      .filter((a) => a.name.includes('Equit'))
      .reduce((sum, a) => sum + a.weight, 0);

    expect(youngEquity).toBeGreaterThan(olderEquity);
  });

  it('near-retirement person gets more bonds', () => {
    const young = calculateRiskParity({ ...DEFAULT_INPUTS, currentAge: 25 }, 2_000_000);
    const older = calculateRiskParity({ ...DEFAULT_INPUTS, currentAge: 60 }, 2_000_000);

    const youngBonds = young.allocations
      .filter((a) => a.name.includes('Bond') || a.name === 'TIPS')
      .reduce((sum, a) => sum + a.weight, 0);
    const olderBonds = older.allocations
      .filter((a) => a.name.includes('Bond') || a.name === 'TIPS')
      .reduce((sum, a) => sum + a.weight, 0);

    expect(olderBonds).toBeGreaterThan(youngBonds);
  });

  it('larger nest egg need shifts toward more equity', () => {
    const small = calculateRiskParity(DEFAULT_INPUTS, 500_000);
    const large = calculateRiskParity(DEFAULT_INPUTS, 3_000_000);

    const smallEquity = small.allocations
      .filter((a) => a.name.includes('Equit'))
      .reduce((sum, a) => sum + a.weight, 0);
    const largeEquity = large.allocations
      .filter((a) => a.name.includes('Equit'))
      .reduce((sum, a) => sum + a.weight, 0);

    expect(largeEquity).toBeGreaterThan(smallEquity);
  });
});
