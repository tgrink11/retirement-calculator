import type { CalculatorInputs } from '../types/calculator';

export const DEFAULT_INPUTS: CalculatorInputs = {
  currentAge: 35,
  currentSavings: 50000,
  expectedReturn: 0.07,
  portfolioMode: 'glidePath',
  retirementAge: 65,
  lifeExpectancy: 90,
  annualSpend: 60000,
  baselineInflation: 0.035,
  healthInflation: 0.058,
  techLifestyleInflation: 0.015,
  climateBuffer: 0.01,
  healthShareStart: 0.25,
  healthShareEnd: 0.50,
  partTimeIncome: 15000,
  incomeGrowthRate: 0.02,
  safeRate: 0.04,
  lifestyleCreepEnabled: false,
  lifestyleCreepRate: 0.02,
};
