import { useCalculator } from '../../state/calculatorContext';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatPercent } from '../../utils/formatPercent';
import { Card } from '../shared/Card';

export function AssumptionsSummary() {
  const { inputs } = useCalculator();

  const items = [
    { label: 'Retirement Age', value: `${inputs.retirementAge}` },
    { label: 'Life Expectancy', value: `${inputs.lifeExpectancy}` },
    { label: 'Annual Spending', value: formatCurrency(inputs.annualSpend) },
    { label: 'Part-Time Income', value: formatCurrency(inputs.partTimeIncome) },
    { label: 'Baseline Inflation', value: formatPercent(inputs.baselineInflation) },
    { label: 'Healthcare Inflation', value: formatPercent(inputs.healthInflation) },
    { label: 'Tech/Lifestyle', value: formatPercent(inputs.techLifestyleInflation) },
    { label: 'Climate Buffer', value: formatPercent(inputs.climateBuffer) },
    { label: 'Safe Rate', value: formatPercent(inputs.safeRate) },
    { label: 'Lifestyle Creep', value: inputs.lifestyleCreepEnabled ? 'On (+2%/yr)' : 'Off' },
  ];

  return (
    <Card>
      <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-3">
        Assumptions Used
      </p>
      <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm">
        {items.map((item) => (
          <div key={item.label} className="flex justify-between">
            <span className="text-slate-500">{item.label}</span>
            <span className="font-medium text-slate-700 tabular-nums">{item.value}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
