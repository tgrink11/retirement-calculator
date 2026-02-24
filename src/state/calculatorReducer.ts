import type { CalculatorInputs, PortfolioMode } from '../types/calculator';
import { DEFAULT_INPUTS } from './defaults';

export type CalculatorAction =
  | { type: 'SET_CURRENT_AGE'; payload: number }
  | { type: 'SET_CURRENT_SAVINGS'; payload: number }
  | { type: 'SET_EXPECTED_RETURN'; payload: number }
  | { type: 'SET_PORTFOLIO_MODE'; payload: PortfolioMode }
  | { type: 'SET_RETIREMENT_AGE'; payload: number }
  | { type: 'SET_LIFE_EXPECTANCY'; payload: number }
  | { type: 'SET_ANNUAL_SPEND'; payload: number }
  | { type: 'SET_BASELINE_INFLATION'; payload: number }
  | { type: 'SET_HEALTH_INFLATION'; payload: number }
  | { type: 'SET_TECH_INFLATION'; payload: number }
  | { type: 'SET_CLIMATE_BUFFER'; payload: number }
  | { type: 'SET_HEALTH_SHARE_START'; payload: number }
  | { type: 'SET_HEALTH_SHARE_END'; payload: number }
  | { type: 'SET_PART_TIME_INCOME'; payload: number }
  | { type: 'SET_INCOME_GROWTH_RATE'; payload: number }
  | { type: 'SET_SAFE_RATE'; payload: number }
  | { type: 'TOGGLE_LIFESTYLE_CREEP' }
  | { type: 'SET_LIFESTYLE_CREEP_RATE'; payload: number }
  | { type: 'RESET_DEFAULTS' };

export function calculatorReducer(
  state: CalculatorInputs,
  action: CalculatorAction
): CalculatorInputs {
  switch (action.type) {
    case 'SET_CURRENT_AGE':
      return { ...state, currentAge: action.payload };
    case 'SET_CURRENT_SAVINGS':
      return { ...state, currentSavings: action.payload };
    case 'SET_EXPECTED_RETURN':
      return { ...state, expectedReturn: action.payload };
    case 'SET_PORTFOLIO_MODE':
      return { ...state, portfolioMode: action.payload };
    case 'SET_RETIREMENT_AGE':
      return { ...state, retirementAge: action.payload };
    case 'SET_LIFE_EXPECTANCY':
      return { ...state, lifeExpectancy: action.payload };
    case 'SET_ANNUAL_SPEND':
      return { ...state, annualSpend: action.payload };
    case 'SET_BASELINE_INFLATION':
      return { ...state, baselineInflation: action.payload };
    case 'SET_HEALTH_INFLATION':
      return { ...state, healthInflation: action.payload };
    case 'SET_TECH_INFLATION':
      return { ...state, techLifestyleInflation: action.payload };
    case 'SET_CLIMATE_BUFFER':
      return { ...state, climateBuffer: action.payload };
    case 'SET_HEALTH_SHARE_START':
      return { ...state, healthShareStart: action.payload };
    case 'SET_HEALTH_SHARE_END':
      return { ...state, healthShareEnd: action.payload };
    case 'SET_PART_TIME_INCOME':
      return { ...state, partTimeIncome: action.payload };
    case 'SET_INCOME_GROWTH_RATE':
      return { ...state, incomeGrowthRate: action.payload };
    case 'SET_SAFE_RATE':
      return { ...state, safeRate: action.payload };
    case 'TOGGLE_LIFESTYLE_CREEP':
      return { ...state, lifestyleCreepEnabled: !state.lifestyleCreepEnabled };
    case 'SET_LIFESTYLE_CREEP_RATE':
      return { ...state, lifestyleCreepRate: action.payload };
    case 'RESET_DEFAULTS':
      return DEFAULT_INPUTS;
    default:
      return state;
  }
}
