import { runMonteCarlo } from '../engine/monteCarlo';
import type { CalculatorInputs } from '../types/calculator';

self.onmessage = (event: MessageEvent<{ inputs: CalculatorInputs; runs: number }>) => {
  const { inputs, runs } = event.data;
  const result = runMonteCarlo(inputs, runs);
  self.postMessage(result);
};
