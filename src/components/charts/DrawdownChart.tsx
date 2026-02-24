import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { useCalculator } from '../../state/calculatorContext';
import { formatCurrency } from '../../utils/formatCurrency';
import { Card } from '../shared/Card';
import { SectionHeading } from '../shared/SectionHeading';

export function DrawdownChart() {
  const { result } = useCalculator();

  const data = result.yearProjections.map((yp) => ({
    age: yp.age,
    grossSpend: Math.round(yp.grossSpend),
    income: Math.round(yp.income),
    netWithdrawal: Math.round(yp.netWithdrawal),
  }));

  return (
    <Card>
      <SectionHeading title="Annual Drawdown Projection" subtitle="Spending, income, and net withdrawal over time" />
      <div className="h-64 md:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 5, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="age"
              tick={{ fontSize: 12, fill: '#64748b' }}
              tickLine={false}
            />
            <YAxis
              tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`}
              tick={{ fontSize: 12, fill: '#64748b' }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              formatter={(value: number | undefined, name: string | undefined) => [
                formatCurrency(value ?? 0),
                name === 'grossSpend' ? 'Total Spending' :
                name === 'income' ? 'Income' : 'Net Withdrawal',
              ]}
              labelFormatter={(label) => `Age ${label}`}
              contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
            />
            <Legend
              formatter={(value: string) =>
                value === 'grossSpend' ? 'Total Spending' :
                value === 'income' ? 'Income' : 'Net Withdrawal'
              }
            />
            <Area
              type="monotone"
              dataKey="netWithdrawal"
              fill="#3b82f6"
              fillOpacity={0.15}
              stroke="#3b82f6"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="grossSpend"
              stroke="#ef4444"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="income"
              stroke="#22c55e"
              strokeWidth={2}
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
