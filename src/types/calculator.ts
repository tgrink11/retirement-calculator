export type PortfolioMode = 'glidePath' | 'riskParity';

export interface CalculatorInputs {
  currentAge: number;
  currentSavings: number;
  expectedReturn: number;
  portfolioMode: PortfolioMode;
  retirementAge: number;
  lifeExpectancy: number;
  annualSpend: number;
  baselineInflation: number;
  healthInflation: number;
  techLifestyleInflation: number;
  climateBuffer: number;
  healthShareStart: number;
  healthShareEnd: number;
  partTimeIncome: number;
  incomeGrowthRate: number;
  safeRate: number;
  lifestyleCreepEnabled: boolean;
  lifestyleCreepRate: number;
}

export interface YearProjection {
  year: number;
  age: number;
  healthShare: number;
  effectiveInflation: number;
  grossSpend: number;
  income: number;
  netWithdrawal: number;
  presentValueNet: number;
  cumulativePV: number;
}

export interface CalculationResult {
  requiredNestEgg: number;
  yearProjections: YearProjection[];
  retirementYears: number;
  averageEffectiveInflation: number;
  peakSpendingYear: YearProjection;
}

export interface SavingsGapResult {
  yearsToRetirement: number;
  futureValueOfSavings: number;
  savingsGap: number;
  requiredAnnualSavings: number;
  requiredMonthlySavings: number;
  alreadyOnTrack: boolean;
}

export interface MonteCarloResult {
  results: number[];
  percentiles: {
    p10: number;
    p25: number;
    p50: number;
    p75: number;
    p90: number;
  };
  mean: number;
  min: number;
  max: number;
  yearlyPercentiles: YearlyPercentile[];
}

export interface YearlyPercentile {
  year: number;
  age: number;
  p10: number;
  p25: number;
  p50: number;
  p75: number;
  p90: number;
}
