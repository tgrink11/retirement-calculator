import { describe, it, expect } from 'vitest';
import { runMonteCarlo } from '../monteCarlo';
import { DEFAULT_INPUTS } from '../../state/defaults';

describe('runMonteCarlo', () => {
  it('returns correct number of results', () => {
    const result = runMonteCarlo(DEFAULT_INPUTS, 100);
    expect(result.results).toHaveLength(100);
  });

  it('percentiles are in ascending order', () => {
    const result = runMonteCarlo(DEFAULT_INPUTS, 200);
    const { p10, p25, p50, p75, p90 } = result.percentiles;
    expect(p10).toBeLessThanOrEqual(p25);
    expect(p25).toBeLessThanOrEqual(p50);
    expect(p50).toBeLessThanOrEqual(p75);
    expect(p75).toBeLessThanOrEqual(p90);
  });

  it('mean is between min and max', () => {
    const result = runMonteCarlo(DEFAULT_INPUTS, 200);
    expect(result.mean).toBeGreaterThanOrEqual(result.min);
    expect(result.mean).toBeLessThanOrEqual(result.max);
  });

  it('produces yearly percentiles', () => {
    const result = runMonteCarlo(DEFAULT_INPUTS, 100);
    expect(result.yearlyPercentiles.length).toBeGreaterThan(0);
    result.yearlyPercentiles.forEach((yp) => {
      expect(yp.p10).toBeLessThanOrEqual(yp.p90);
    });
  });

  it('all results are positive', () => {
    const result = runMonteCarlo(DEFAULT_INPUTS, 100);
    result.results.forEach((r) => {
      expect(r).toBeGreaterThan(0);
    });
  });
});
