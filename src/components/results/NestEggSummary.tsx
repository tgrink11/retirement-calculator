import { useCalculator } from '../../state/calculatorContext';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatPercent } from '../../utils/formatPercent';
import { Card } from '../shared/Card';

export function NestEggSummary() {
  const { result, monteCarloResult, isSimulating } = useCalculator();

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
      <div className="text-center">
        <p className="text-sm font-medium text-blue-700 uppercase tracking-wide">
          Required Nest Egg
        </p>
        <p className="text-4xl md:text-5xl font-bold text-slate-900 mt-2 tabular-nums">
          {formatCurrency(result.requiredNestEgg)}
        </p>
        <p className="text-sm text-slate-500 mt-2">
          to fund {result.retirementYears} years of retirement
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-blue-200">
        <div className="text-center">
          <p className="text-xs text-slate-500 uppercase">Avg Inflation</p>
          <p className="text-lg font-semibold text-slate-800 tabular-nums">
            {formatPercent(result.averageEffectiveInflation)}
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-slate-500 uppercase">Peak Spend</p>
          <p className="text-lg font-semibold text-slate-800 tabular-nums">
            {formatCurrency(result.peakSpendingYear.grossSpend)}
          </p>
        </div>
      </div>

      {(monteCarloResult || isSimulating) && (
        <div className="mt-4 pt-4 border-t border-blue-200">
          <p className="text-xs text-slate-500 uppercase text-center mb-2">
            Monte Carlo Range (1,000 sims)
          </p>
          {isSimulating ? (
            <p className="text-center text-sm text-slate-400">Simulating...</p>
          ) : monteCarloResult && (
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <p className="text-xs text-green-600">Optimistic (10th)</p>
                <p className="text-sm font-semibold tabular-nums">
                  {formatCurrency(monteCarloResult.percentiles.p10)}
                </p>
              </div>
              <div>
                <p className="text-xs text-blue-600">Median</p>
                <p className="text-sm font-semibold tabular-nums">
                  {formatCurrency(monteCarloResult.percentiles.p50)}
                </p>
              </div>
              <div>
                <p className="text-xs text-red-600">Worst Case (90th)</p>
                <p className="text-sm font-semibold tabular-nums">
                  {formatCurrency(monteCarloResult.percentiles.p90)}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </Card>
  );
}
