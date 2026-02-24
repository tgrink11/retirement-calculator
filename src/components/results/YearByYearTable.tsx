import { useCalculator } from '../../state/calculatorContext';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatPercent } from '../../utils/formatPercent';
import { Card } from '../shared/Card';
import { SectionHeading } from '../shared/SectionHeading';

export function YearByYearTable() {
  const { result } = useCalculator();

  return (
    <Card>
      <SectionHeading title="Year-by-Year Projection" />
      <div className="overflow-x-auto -mx-5 px-5">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase text-slate-500 border-b border-slate-200">
              <th className="pb-2 pr-3">Age</th>
              <th className="pb-2 pr-3 text-right">Spending</th>
              <th className="pb-2 pr-3 text-right">Income</th>
              <th className="pb-2 pr-3 text-right">Net Draw</th>
              <th className="pb-2 pr-3 text-right">Health %</th>
              <th className="pb-2 text-right">Eff. Inflation</th>
            </tr>
          </thead>
          <tbody>
            {result.yearProjections.map((yp) => (
              <tr
                key={yp.year}
                className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
              >
                <td className="py-1.5 pr-3 font-medium text-slate-700 tabular-nums">
                  {yp.age}
                </td>
                <td className="py-1.5 pr-3 text-right tabular-nums">
                  {formatCurrency(yp.grossSpend)}
                </td>
                <td className="py-1.5 pr-3 text-right tabular-nums text-emerald-600">
                  {formatCurrency(yp.income)}
                </td>
                <td className="py-1.5 pr-3 text-right tabular-nums font-medium">
                  {formatCurrency(yp.netWithdrawal)}
                </td>
                <td className="py-1.5 pr-3 text-right tabular-nums">
                  {formatPercent(yp.healthShare)}
                </td>
                <td className="py-1.5 text-right tabular-nums">
                  {formatPercent(yp.effectiveInflation)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
