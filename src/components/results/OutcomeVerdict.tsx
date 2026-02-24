import { useCalculator } from '../../state/calculatorContext';
import { formatCurrency } from '../../utils/formatCurrency';
import { Card } from '../shared/Card';

export function OutcomeVerdict() {
  const { result, monteCarloResult } = useCalculator();

  // Use median MC result for a more realistic assessment
  const effectiveNestEgg = monteCarloResult
    ? monteCarloResult.percentiles.p50
    : result.requiredNestEgg;

  // Classify severity
  const severity =
    effectiveNestEgg > 3_000_000
      ? 'critical'
      : effectiveNestEgg > 2_000_000
        ? 'warning'
        : 'manageable';

  const config = {
    critical: {
      bg: 'bg-red-50 border-red-200',
      icon: '!',
      iconBg: 'bg-red-100 text-red-700',
      title: 'High Risk of Outliving Savings',
      description: `At ${formatCurrency(effectiveNestEgg)}, you'll need aggressive saving and investment strategies. Consider delaying retirement or reducing planned spending.`,
    },
    warning: {
      bg: 'bg-amber-50 border-amber-200',
      icon: '!',
      iconBg: 'bg-amber-100 text-amber-700',
      title: 'Moderate Risk — Plan Carefully',
      description: `${formatCurrency(effectiveNestEgg)} is achievable but requires disciplined saving. The portfolio recommendation below can help optimize your approach.`,
    },
    manageable: {
      bg: 'bg-emerald-50 border-emerald-200',
      icon: '\u2713',
      iconBg: 'bg-emerald-100 text-emerald-700',
      title: 'On Track — Savings Goal is Realistic',
      description: `${formatCurrency(effectiveNestEgg)} is a solid target. Stick with the allocation below and you're well positioned.`,
    },
  }[severity];

  return (
    <Card className={config.bg}>
      <div className="flex gap-3">
        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold ${config.iconBg}`}>
          {config.icon}
        </div>
        <div>
          <h3 className="font-semibold text-slate-900">{config.title}</h3>
          <p className="text-sm text-slate-600 mt-1">{config.description}</p>
        </div>
      </div>
    </Card>
  );
}
