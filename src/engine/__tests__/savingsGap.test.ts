import { describe, it, expect } from 'vitest';
import { calculateSavingsGap } from '../savingsGap';

describe('calculateSavingsGap', () => {
  it('computes reasonable monthly savings for typical inputs', () => {
    const result = calculateSavingsGap(35, 50000, 0.07, 65, 1_500_000);
    expect(result.yearsToRetirement).toBe(30);
    expect(result.requiredMonthlySavings).toBeGreaterThan(0);
    expect(result.requiredMonthlySavings).toBeLessThan(5000);
    expect(result.alreadyOnTrack).toBe(false);
  });

  it('reports on track when current savings will grow to cover the goal', () => {
    // $500k at 7% for 30 years = ~$3.8M, well above $1.5M goal
    const result = calculateSavingsGap(35, 500000, 0.07, 65, 1_500_000);
    expect(result.alreadyOnTrack).toBe(true);
    expect(result.requiredMonthlySavings).toBe(0);
    expect(result.requiredAnnualSavings).toBe(0);
    expect(result.savingsGap).toBe(0);
  });

  it('handles zero years to retirement', () => {
    const result = calculateSavingsGap(65, 100000, 0.07, 65, 1_500_000);
    expect(result.yearsToRetirement).toBe(0);
    expect(result.savingsGap).toBe(1_400_000);
    expect(result.alreadyOnTrack).toBe(false);
  });

  it('handles zero current savings', () => {
    const result = calculateSavingsGap(35, 0, 0.07, 65, 1_500_000);
    expect(result.savingsGap).toBe(1_500_000);
    expect(result.requiredMonthlySavings).toBeGreaterThan(0);
    expect(result.futureValueOfSavings).toBe(0);
  });

  it('higher expected return reduces required savings', () => {
    const low = calculateSavingsGap(35, 50000, 0.04, 65, 1_500_000);
    const high = calculateSavingsGap(35, 50000, 0.10, 65, 1_500_000);
    expect(high.requiredMonthlySavings).toBeLessThan(low.requiredMonthlySavings);
  });

  it('more years to save reduces monthly requirement', () => {
    const young = calculateSavingsGap(25, 50000, 0.07, 65, 1_500_000);
    const older = calculateSavingsGap(50, 50000, 0.07, 65, 1_500_000);
    expect(young.requiredMonthlySavings).toBeLessThan(older.requiredMonthlySavings);
  });

  it('already at retirement with enough savings is on track', () => {
    const result = calculateSavingsGap(65, 2_000_000, 0.07, 65, 1_500_000);
    expect(result.alreadyOnTrack).toBe(true);
  });
});
