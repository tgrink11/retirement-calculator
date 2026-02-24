import type { SavingsGapResult } from '../types/calculator';

/**
 * Calculate how much a person needs to save per month/year to reach
 * their required nest egg by retirement, given current savings and
 * expected investment returns.
 */
export function calculateSavingsGap(
  currentAge: number,
  currentSavings: number,
  expectedReturn: number,
  retirementAge: number,
  requiredNestEgg: number
): SavingsGapResult {
  const yearsToRetirement = retirementAge - currentAge;

  if (yearsToRetirement <= 0) {
    return {
      yearsToRetirement: 0,
      futureValueOfSavings: currentSavings,
      savingsGap: Math.max(0, requiredNestEgg - currentSavings),
      requiredAnnualSavings: 0,
      requiredMonthlySavings: 0,
      alreadyOnTrack: currentSavings >= requiredNestEgg,
    };
  }

  // Future value of current savings at retirement
  const futureValueOfSavings =
    currentSavings * Math.pow(1 + expectedReturn, yearsToRetirement);

  const savingsGap = requiredNestEgg - futureValueOfSavings;

  if (savingsGap <= 0) {
    return {
      yearsToRetirement,
      futureValueOfSavings,
      savingsGap: 0,
      requiredAnnualSavings: 0,
      requiredMonthlySavings: 0,
      alreadyOnTrack: true,
    };
  }

  // Required annual savings using future value of annuity formula:
  // FV = PMT * [((1+r)^n - 1) / r]
  // PMT = FV * r / ((1+r)^n - 1)
  const r = expectedReturn;
  const n = yearsToRetirement;
  const fvAnnuityFactor = (Math.pow(1 + r, n) - 1) / r;
  const requiredAnnualSavings = savingsGap / fvAnnuityFactor;

  // Monthly savings using monthly compounding
  const monthlyRate = Math.pow(1 + expectedReturn, 1 / 12) - 1;
  const totalMonths = yearsToRetirement * 12;
  const fvMonthlyAnnuity = (Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate;
  const requiredMonthlySavings = savingsGap / fvMonthlyAnnuity;

  return {
    yearsToRetirement,
    futureValueOfSavings,
    savingsGap,
    requiredAnnualSavings,
    requiredMonthlySavings,
    alreadyOnTrack: false,
  };
}
