import { describe, it, expect } from 'vitest';
import { projectIncome } from '../income';

describe('projectIncome', () => {
  it('grows income by growth rate', () => {
    const result = projectIncome(15000, 0.02, 3);
    expect(result[0]).toBeCloseTo(15300, 0);
    expect(result[1]).toBeCloseTo(15606, 0);
    expect(result[2]).toBeCloseTo(15918.12, 0);
  });

  it('returns zeros for zero base income', () => {
    const result = projectIncome(0, 0.02, 5);
    result.forEach((v) => expect(v).toBe(0));
  });

  it('returns correct length', () => {
    const result = projectIncome(15000, 0.02, 25);
    expect(result).toHaveLength(25);
  });

  it('handles zero growth rate', () => {
    const result = projectIncome(15000, 0, 3);
    result.forEach((v) => expect(v).toBe(15000));
  });
});
