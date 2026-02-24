import { useState } from 'react';

export function Guide() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm mb-6 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="text-lg">📖</span>
          <h2 className="text-base font-semibold text-slate-900">
            How to Use This Calculator
          </h2>
        </div>
        <svg
          className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="px-5 pb-5 border-t border-slate-100">
          {/* Step-by-step */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex gap-3">
              <span className="flex-shrink-0 w-7 h-7 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-bold">
                1
              </span>
              <div>
                <p className="text-sm font-semibold text-slate-800">Enter Your Situation</p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Start with the left panel. Enter your current age, how much you've saved so far,
                  and the return you expect on your investments.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="flex-shrink-0 w-7 h-7 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-bold">
                2
              </span>
              <div>
                <p className="text-sm font-semibold text-slate-800">Set Your Retirement Goals</p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Choose when you want to retire, how long you plan to live, and how much
                  you expect to spend per year in retirement.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="flex-shrink-0 w-7 h-7 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-bold">
                3
              </span>
              <div>
                <p className="text-sm font-semibold text-slate-800">Review Your Plan</p>
                <p className="text-xs text-slate-500 mt-0.5">
                  The right panel instantly updates with your required nest egg, monthly savings
                  target, portfolio allocation, and risk analysis.
                </p>
              </div>
            </div>
          </div>

          {/* How to read the results */}
          <div className="mt-5 pt-4 border-t border-slate-100">
            <h3 className="text-sm font-semibold text-slate-800 mb-3">Understanding Your Results</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-xs text-slate-600">
              <div>
                <span className="font-semibold text-slate-700">Required Nest Egg</span> —
                The total amount you need saved by retirement day. This accounts for inflation,
                rising healthcare costs, and your planned spending over your entire retirement.
              </div>
              <div>
                <span className="font-semibold text-slate-700">Savings Gap</span> —
                How much you need to save each month to reach your nest egg goal. It factors in
                the growth of your current savings and your future contributions.
              </div>
              <div>
                <span className="font-semibold text-slate-700">Outcome Verdict</span> —
                A quick assessment of your plan. Green means you're on track, amber means
                it will take discipline, and red means you may need to adjust your goals.
              </div>
              <div>
                <span className="font-semibold text-slate-700">Annual Drawdown Chart</span> —
                Shows your projected spending, income, and net withdrawals year by year
                throughout retirement. The gap between spending and income is what comes from savings.
              </div>
              <div>
                <span className="font-semibold text-slate-700">Portfolio Allocation</span> —
                A suggested investment mix based on your timeline. The Glide Path shifts from
                stocks to bonds as you approach retirement. Risk Parity balances risk across asset classes.
              </div>
              <div>
                <span className="font-semibold text-slate-700">Monte Carlo Simulation</span> —
                Runs 1,000 randomized scenarios to show the range of possible outcomes. The
                fan chart shows best-case to worst-case, so you can plan for uncertainty.
              </div>
            </div>
          </div>

          {/* Pro tips */}
          <div className="mt-5 pt-4 border-t border-slate-100">
            <h3 className="text-sm font-semibold text-slate-800 mb-2">Tips</h3>
            <ul className="text-xs text-slate-600 space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-0.5">&#x2022;</span>
                <span>
                  <strong>Drag the sliders</strong> to see results update in real time — try different retirement ages and spending levels to find your sweet spot.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-0.5">&#x2022;</span>
                <span>
                  <strong>The Inflation section</strong> lets you model healthcare cost increases, technology changes, and climate impacts separately — these matter more than most people realize.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-0.5">&#x2022;</span>
                <span>
                  <strong>Use Advanced Settings</strong> to fine-tune the safe withdrawal rate and income growth. A lower withdrawal rate is more conservative but requires a larger nest egg.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-0.5">&#x2022;</span>
                <span>
                  <strong>Focus on the Monte Carlo range</strong> more than the single number — it shows you the realistic spread of outcomes across 1,000 simulated scenarios.
                </span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
