import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { useCalculator } from '../../state/calculatorContext';
import { formatCurrency } from '../../utils/formatCurrency';
import { Card } from '../shared/Card';
import { SectionHeading } from '../shared/SectionHeading';

export function MonteCarloChart() {
  const { monteCarloResult, isSimulating } = useCalculator();

  if (isSimulating) {
    return (
      <Card>
        <SectionHeading title="Monte Carlo Simulation" subtitle="Running 1,000 scenarios..." />
        <div className="h-64 flex items-center justify-center">
          <div className="animate-pulse text-slate-400">Simulating...</div>
        </div>
      </Card>
    );
  }

  if (!monteCarloResult || monteCarloResult.yearlyPercentiles.length === 0) {
    return null;
  }

  // Transform for the fan chart: we need bands between percentiles
  const data = monteCarloResult.yearlyPercentiles.map((yp) => ({
    age: yp.age,
    // For stacked areas, we need the height of each band
    band_10_25: yp.p25 - yp.p10,
    band_25_50: yp.p50 - yp.p25,
    band_50_75: yp.p75 - yp.p50,
    band_75_90: yp.p90 - yp.p75,
    base: yp.p10,
    p50: yp.p50,
  }));

  return (
    <Card>
      <SectionHeading
        title="Monte Carlo Simulation"
        subtitle="1,000 scenarios with randomized health inflation and longevity"
      />
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
              tickFormatter={(v: number) => `$${(v / 1000000).toFixed(1)}M`}
              tick={{ fontSize: 12, fill: '#64748b' }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (!active || !payload?.length) return null;
                const yp = monteCarloResult.yearlyPercentiles.find((y) => y.age === label);
                if (!yp) return null;
                return (
                  <div className="bg-white p-3 rounded-lg shadow-lg border border-slate-200 text-sm">
                    <p className="font-semibold text-slate-700 mb-1">Age {label}</p>
                    <p className="text-red-500">90th: {formatCurrency(yp.p90)}</p>
                    <p className="text-orange-500">75th: {formatCurrency(yp.p75)}</p>
                    <p className="text-blue-600 font-medium">Median: {formatCurrency(yp.p50)}</p>
                    <p className="text-cyan-500">25th: {formatCurrency(yp.p25)}</p>
                    <p className="text-emerald-500">10th: {formatCurrency(yp.p10)}</p>
                  </div>
                );
              }}
            />
            {/* Base invisible layer to offset */}
            <Area
              type="monotone"
              dataKey="base"
              stackId="1"
              fill="transparent"
              stroke="none"
            />
            {/* 10th-25th band */}
            <Area
              type="monotone"
              dataKey="band_10_25"
              stackId="1"
              fill="#22c55e"
              fillOpacity={0.15}
              stroke="none"
            />
            {/* 25th-50th band */}
            <Area
              type="monotone"
              dataKey="band_25_50"
              stackId="1"
              fill="#3b82f6"
              fillOpacity={0.2}
              stroke="none"
            />
            {/* 50th-75th band */}
            <Area
              type="monotone"
              dataKey="band_50_75"
              stackId="1"
              fill="#f59e0b"
              fillOpacity={0.2}
              stroke="none"
            />
            {/* 75th-90th band */}
            <Area
              type="monotone"
              dataKey="band_75_90"
              stackId="1"
              fill="#ef4444"
              fillOpacity={0.15}
              stroke="none"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center justify-center gap-4 mt-3 text-xs text-slate-500">
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded bg-emerald-200" /> Optimistic
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded bg-blue-300" /> Likely
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded bg-amber-200" /> Above Median
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded bg-red-200" /> Worst Case
        </span>
      </div>
    </Card>
  );
}
