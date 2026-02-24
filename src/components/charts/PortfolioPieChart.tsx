import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from 'recharts';
import { useCalculator } from '../../state/calculatorContext';
import { formatPercent } from '../../utils/formatPercent';
import { Card } from '../shared/Card';
import { SectionHeading } from '../shared/SectionHeading';
import type { PortfolioMode } from '../../types/calculator';

const MODE_LABELS: Record<PortfolioMode, { title: string; subtitle: string }> = {
  glidePath: {
    title: 'Target-Date Glide Path',
    subtitle: 'Industry-standard allocation that shifts with your age',
  },
  riskParity: {
    title: 'Risk Parity Portfolio',
    subtitle: 'Inverse-volatility weighting adjusted for your timeline',
  },
};

export function PortfolioPieChart() {
  const { inputs, dispatch, portfolio } = useCalculator();

  const data = portfolio.allocations
    .filter((a) => a.weight > 0.001)
    .map((a) => ({
      name: a.name,
      value: Math.round(a.weight * 10000) / 100,
      color: a.color,
    }));

  const { title, subtitle } = MODE_LABELS[inputs.portfolioMode];

  return (
    <Card>
      <div className="flex items-start justify-between gap-2 mb-4">
        <SectionHeading title={title} subtitle={subtitle} />
        <div className="flex-shrink-0 flex bg-slate-100 rounded-lg p-0.5">
          <button
            onClick={() => dispatch({ type: 'SET_PORTFOLIO_MODE', payload: 'glidePath' })}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              inputs.portfolioMode === 'glidePath'
                ? 'bg-white text-blue-700 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Glide Path
          </button>
          <button
            onClick={() => dispatch({ type: 'SET_PORTFOLIO_MODE', payload: 'riskParity' })}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              inputs.portfolioMode === 'riskParity'
                ? 'bg-white text-blue-700 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Risk Parity
          </button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="w-48 h-48 md:w-56 md:h-56">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius="40%"
                outerRadius="80%"
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number | undefined) => [`${(value ?? 0).toFixed(1)}%`]}
                contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex-1 space-y-2">
          {portfolio.allocations
            .filter((a) => a.weight > 0.001)
            .map((a) => (
              <div key={a.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-sm flex-shrink-0"
                    style={{ backgroundColor: a.color }}
                  />
                  <span className="text-slate-700">{a.name}</span>
                </div>
                <span className="font-semibold text-slate-900 tabular-nums">
                  {(a.weight * 100).toFixed(1)}%
                </span>
              </div>
            ))}
          <div className="pt-2 mt-2 border-t border-slate-200 space-y-1 text-xs text-slate-500">
            <div className="flex justify-between">
              <span>Expected Return</span>
              <span className="font-medium">{formatPercent(portfolio.expectedPortfolioReturn)}</span>
            </div>
            <div className="flex justify-between">
              <span>Portfolio Volatility</span>
              <span className="font-medium">{formatPercent(portfolio.portfolioVolatility)}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
