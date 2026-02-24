import { describe, it, expect } from 'vitest';
import { getHealthShare } from '../healthRamp';

describe('getHealthShare', () => {
  it('returns start share at year 0', () => {
    expect(getHealthShare(0, 25, 0.25, 0.50)).toBe(0.25);
  });

  it('returns end share at final year', () => {
    expect(getHealthShare(25, 25, 0.25, 0.50)).toBe(0.50);
  });

  it('returns midpoint at halfway', () => {
    const result = getHealthShare(12.5, 25, 0.25, 0.50);
    expect(result).toBeCloseTo(0.375, 5);
  });

  it('handles totalYears = 0 gracefully', () => {
    expect(getHealthShare(0, 0, 0.25, 0.50)).toBe(0.25);
  });

  it('clamps to end share when yearIndex exceeds totalYears', () => {
    expect(getHealthShare(30, 25, 0.25, 0.50)).toBe(0.50);
  });
});
