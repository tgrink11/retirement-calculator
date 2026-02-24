import {
  ResponsiveContainer,
  BarChart,
  Bar,
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

export function SpendingBreakdownChart() {
  const { result } = useCalculator();

  const data = result.yearProjections.map((yp) => ({
    age: yp.age,
    healthSpend: Math.round(yp.grossSpend * yp.healthShare),
    otherSpend: Math.round(yp.grossSpend * (1 - yp.healthShare)),
  }));

  return (
    <Card>
      <SectionHeading title="Spending Breakdown" subtitle="Healthcare vs other expenses over time" />
      <div className="h-64 md:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 5, left: 10, bottom: 5 }}>
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
                name === 'healthSpend' ? 'Healthcare' : 'Other Expenses',
              ]}
              labelFormatter={(label) => `Age ${label}`}
              contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
            />
            <Legend
              formatter={(value: string) =>
                value === 'healthSpend' ? 'Healthcare' : 'Other Expenses'
              }
            />
            <Bar dataKey="otherSpend" stackId="a" fill="#3b82f6" radius={[0, 0, 0, 0]} />
            <Bar dataKey="healthSpend" stackId="a" fill="#ef4444" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
