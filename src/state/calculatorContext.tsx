import { createContext, useContext, useReducer, useMemo, type ReactNode } from 'react';
import { calculatorReducer, type CalculatorAction } from './calculatorReducer';
import { DEFAULT_INPUTS } from './defaults';
import { calculateNestEgg } from '../engine/nestEgg';
import { calculateRiskParity } from '../engine/riskParity';
import { calculateGlidePath } from '../engine/glidePath';
import { calculateSavingsGap } from '../engine/savingsGap';
import { useMonteCarloWorker } from '../hooks/useMonteCarloWorker';
import type { CalculatorInputs, CalculationResult, MonteCarloResult, SavingsGapResult } from '../types/calculator';
import type { PortfolioAllocation } from '../types/portfolio';

interface CalculatorContextValue {
  inputs: CalculatorInputs;
  dispatch: React.Dispatch<CalculatorAction>;
  result: CalculationResult;
  savingsGapResult: SavingsGapResult;
  portfolio: PortfolioAllocation;
  monteCarloResult: MonteCarloResult | null;
  isSimulating: boolean;
}

const CalculatorContext = createContext<CalculatorContextValue | null>(null);

export function CalculatorProvider({ children }: { children: ReactNode }) {
  const [inputs, dispatch] = useReducer(calculatorReducer, DEFAULT_INPUTS);

  const result = useMemo(() => calculateNestEgg(inputs), [inputs]);

  const savingsGapResult = useMemo(
    () =>
      calculateSavingsGap(
        inputs.currentAge,
        inputs.currentSavings,
        inputs.expectedReturn,
        inputs.retirementAge,
        result.requiredNestEgg
      ),
    [inputs.currentAge, inputs.currentSavings, inputs.expectedReturn, inputs.retirementAge, result.requiredNestEgg]
  );

  const portfolio = useMemo(
    () =>
      inputs.portfolioMode === 'riskParity'
        ? calculateRiskParity(inputs, result.requiredNestEgg)
        : calculateGlidePath(inputs),
    [inputs, result.requiredNestEgg]
  );

  const { monteCarloResult, isSimulating } = useMonteCarloWorker(inputs);

  return (
    <CalculatorContext.Provider
      value={{ inputs, dispatch, result, savingsGapResult, portfolio, monteCarloResult, isSimulating }}
    >
      {children}
    </CalculatorContext.Provider>
  );
}

export function useCalculator(): CalculatorContextValue {
  const ctx = useContext(CalculatorContext);
  if (!ctx) throw new Error('useCalculator must be used within CalculatorProvider');
  return ctx;
}
