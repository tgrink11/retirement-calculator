import { useState } from 'react';
import { useCalculator } from '../../state/calculatorContext';
import { SliderInput } from './SliderInput';
import { Card } from '../shared/Card';
import { formatPercent } from '../../utils/formatPercent';

export function AdvancedInputs() {
  const { inputs, dispatch } = useCalculator();
  const [expanded, setExpanded] = useState(false);

  return (
    <Card>
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between text-sm font-semibold text-slate-700 hover:text-slate-900"
        aria-expanded={expanded}
      >
        <span>Advanced Settings</span>
        <svg
          className={`w-4 h-4 transition-transform ${expanded ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {expanded && (
        <div className="mt-4 space-y-1">
          <SliderInput
            label="Safe Withdrawal Rate"
            value={inputs.safeRate}
            min={0.025}
            max={0.06}
            step={0.005}
            onChange={(v) => dispatch({ type: 'SET_SAFE_RATE', payload: v })}
            formatValue={formatPercent}
            tooltip="Discount rate for present value (lower = more conservative)"
          />
          <SliderInput
            label="Health Share (Start)"
            value={inputs.healthShareStart}
            min={0.10}
            max={0.40}
            step={0.05}
            onChange={(v) => dispatch({ type: 'SET_HEALTH_SHARE_START', payload: v })}
            formatValue={formatPercent}
            tooltip="% of spending on healthcare at retirement start"
          />
          <SliderInput
            label="Health Share (End)"
            value={inputs.healthShareEnd}
            min={0.30}
            max={0.70}
            step={0.05}
            onChange={(v) => dispatch({ type: 'SET_HEALTH_SHARE_END', payload: v })}
            formatValue={formatPercent}
            tooltip="% of spending on healthcare at end of life"
          />
          <SliderInput
            label="Income Growth Rate"
            value={inputs.incomeGrowthRate}
            min={0}
            max={0.05}
            step={0.005}
            onChange={(v) => dispatch({ type: 'SET_INCOME_GROWTH_RATE', payload: v })}
            formatValue={formatPercent}
            tooltip="Annual growth of part-time income"
          />
          <div className="pt-2">
            <button
              onClick={() => dispatch({ type: 'RESET_DEFAULTS' })}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              Reset to Defaults
            </button>
          </div>
        </div>
      )}
    </Card>
  );
}
