import { useCalculator } from '../../state/calculatorContext';
import { formatCurrency } from '../../utils/formatCurrency';
import { Card } from '../shared/Card';

export function SavingsGapSummary() {
  const { savingsGapResult } = useCalculator();

  if (!savingsGapResult) return null;

  const { yearsToRetirement, savingsGap, requiredMonthlySavings, requiredAnnualSavings, alreadyOnTrack } =
    savingsGapResult;

  // Color-coded severity based on required monthly savings
  const severity = alreadyOnTrack
    ? 'onTrack'
    : requiredMonthlySavings > 5000
      ? 'aggressive'
      : requiredMonthlySavings > 2000
        ? 'stretch'
        : 'achievable';

  const config = {
    onTrack: {
      bg: 'bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200',
      badge: 'bg-emerald-100 text-emerald-700',
      badgeText: 'On Track',
    },
    achievable: {
      bg: 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200',
      badge: 'bg-green-100 text-green-700',
      badgeText: 'Achievable',
    },
    stretch: {
      bg: 'bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200',
      badge: 'bg-amber-100 text-amber-700',
      badgeText: 'Stretch Goal',
    },
    aggressive: {
      bg: 'bg-gradient-to-br from-red-50 to-orange-50 border-red-200',
      badge: 'bg-red-100 text-red-700',
      badgeText: 'Very Aggressive',
    },
  }[severity];

  return (
    <Card className={config.bg}>
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <p className="text-sm font-medium text-slate-700 uppercase tracking-wide">
            Savings Gap
          </p>
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${config.badge}`}>
            {config.badgeText}
          </span>
        </div>

        {alreadyOnTrack ? (
          <div>
            <p className="text-3xl font-bold text-emerald-700 mt-2">
              You're on track!
            </p>
            <p className="text-sm text-slate-500 mt-2">
              Your current savings will grow to cover the required nest egg by retirement.
            </p>
          </div>
        ) : (
          <>
            <p className="text-4xl md:text-5xl font-bold text-slate-900 mt-2 tabular-nums">
              {formatCurrency(requiredMonthlySavings)}
              <span className="text-lg font-normal text-slate-500">/mo</span>
            </p>
            <p className="text-sm text-slate-500 mt-1">
              or {formatCurrency(requiredAnnualSavings)}/year for {yearsToRetirement} years
            </p>
          </>
        )}
      </div>

      {!alreadyOnTrack && (
        <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-slate-200">
          <div className="text-center">
            <p className="text-xs text-slate-500 uppercase">Gap to Close</p>
            <p className="text-lg font-semibold text-slate-800 tabular-nums">
              {formatCurrency(savingsGap)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-slate-500 uppercase">Years Left</p>
            <p className="text-lg font-semibold text-slate-800 tabular-nums">
              {yearsToRetirement}
            </p>
          </div>
        </div>
      )}
    </Card>
  );
}
