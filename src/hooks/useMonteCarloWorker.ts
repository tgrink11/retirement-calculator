import { useState, useEffect, useRef, useCallback } from 'react';
import { useDebouncedValue } from './useDebouncedValue';
import { runMonteCarlo } from '../engine/monteCarlo';
import type { CalculatorInputs, MonteCarloResult } from '../types/calculator';

/**
 * Runs Monte Carlo simulation off the main thread (via setTimeout chunking).
 * Debounces input changes by 300ms before re-running.
 */
export function useMonteCarloWorker(inputs: CalculatorInputs) {
  const [monteCarloResult, setMonteCarloResult] = useState<MonteCarloResult | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const abortRef = useRef(false);

  const debouncedInputs = useDebouncedValue(inputs, 300);

  const runSimulation = useCallback((simInputs: CalculatorInputs) => {
    abortRef.current = false;
    setIsSimulating(true);

    // Use setTimeout to yield the main thread before running
    setTimeout(() => {
      if (abortRef.current) return;
      const result = runMonteCarlo(simInputs, 1000);
      if (!abortRef.current) {
        setMonteCarloResult(result);
        setIsSimulating(false);
      }
    }, 0);
  }, []);

  useEffect(() => {
    abortRef.current = true; // cancel any in-flight sim
    runSimulation(debouncedInputs);
    return () => { abortRef.current = true; };
  }, [debouncedInputs, runSimulation]);

  return { monteCarloResult, isSimulating };
}
