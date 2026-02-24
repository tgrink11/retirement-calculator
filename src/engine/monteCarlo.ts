import { calculateNestEgg } from './nestEgg';
import type { CalculatorInputs, MonteCarloResult, YearlyPercentile } from '../types/calculator';

/**
 * Run Monte Carlo simulation: randomize health inflation +/-1.5%
 * and longevity +/-5 years across N runs.
 */
export function runMonteCarlo(
  inputs: CalculatorInputs,
  runs: number = 1000
): MonteCarloResult {
  const allResults: number[] = [];
  const maxYears = (inputs.lifeExpectancy + 5) - inputs.retirementAge;
  const yearlyNestEggs: number[][] = Array.from({ length: maxYears }, () => []);

  for (let i = 0; i < runs; i++) {
    const healthDelta = (Math.random() - 0.5) * 0.03; // +/- 1.5%
    const longevityDelta = Math.round((Math.random() - 0.5) * 10); // +/- 5 years

    const modifiedInputs: CalculatorInputs = {
      ...inputs,
      healthInflation: Math.max(0, inputs.healthInflation + healthDelta),
      lifeExpectancy: Math.max(
        inputs.retirementAge + 1,
        Math.min(100, inputs.lifeExpectancy + longevityDelta)
      ),
    };

    const result = calculateNestEgg(modifiedInputs);
    allResults.push(result.requiredNestEgg);

    // Collect yearly data for fan chart
    for (let y = 0; y < result.yearProjections.length && y < maxYears; y++) {
      yearlyNestEggs[y].push(result.yearProjections[y].cumulativePV);
    }
  }

  // Sort for percentile computation
  allResults.sort((a, b) => a - b);

  const percentile = (arr: number[], p: number) => {
    const sorted = [...arr].sort((a, b) => a - b);
    return sorted[Math.floor(p * sorted.length)] ?? 0;
  };

  // Compute yearly percentiles for the fan chart
  const yearlyPercentiles: YearlyPercentile[] = [];
  for (let y = 0; y < maxYears; y++) {
    if (yearlyNestEggs[y].length === 0) break;
    yearlyPercentiles.push({
      year: y + 1,
      age: inputs.retirementAge + y + 1,
      p10: percentile(yearlyNestEggs[y], 0.10),
      p25: percentile(yearlyNestEggs[y], 0.25),
      p50: percentile(yearlyNestEggs[y], 0.50),
      p75: percentile(yearlyNestEggs[y], 0.75),
      p90: percentile(yearlyNestEggs[y], 0.90),
    });
  }

  return {
    results: allResults,
    percentiles: {
      p10: percentile(allResults, 0.10),
      p25: percentile(allResults, 0.25),
      p50: percentile(allResults, 0.50),
      p75: percentile(allResults, 0.75),
      p90: percentile(allResults, 0.90),
    },
    mean: allResults.reduce((a, b) => a + b, 0) / allResults.length,
    min: allResults[0],
    max: allResults[allResults.length - 1],
    yearlyPercentiles,
  };
}
