import { useCalculator } from '../../state/calculatorContext';
import { SliderInput } from './SliderInput';
import { Card } from '../shared/Card';
import { SectionHeading } from '../shared/SectionHeading';
import { formatCurrency } from '../../utils/formatCurrency';

export function SpendingInputs() {
  const { inputs, dispatch } = useCalculator();

  return (
    <Card>
      <SectionHeading title="Spending" subtitle="Your annual expenses in today's dollars" />
      <SliderInput
        label="Annual Spending"
        value={inputs.annualSpend}
        min={20000}
        max={200000}
        step={5000}
        onChange={(v) => dispatch({ type: 'SET_ANNUAL_SPEND', payload: v })}
        formatValue={formatCurrency}
        tooltip="How much you spend per year right now"
      />
      <SliderInput
        label="Part-Time Income"
        value={inputs.partTimeIncome}
        min={0}
        max={100000}
        step={1000}
        onChange={(v) => dispatch({ type: 'SET_PART_TIME_INCOME', payload: v })}
        formatValue={formatCurrency}
        tooltip="Any retirement income (part-time work, rental, etc.)"
      />
      <div className="flex items-center gap-3 mt-2">
        <button
          onClick={() => dispatch({ type: 'TOGGLE_LIFESTYLE_CREEP' })}
          className={`relative w-10 h-5 rounded-full transition-colors ${
            inputs.lifestyleCreepEnabled ? 'bg-blue-600' : 'bg-slate-300'
          }`}
          role="switch"
          aria-checked={inputs.lifestyleCreepEnabled}
          aria-label="Enable lifestyle creep"
        >
          <span
            className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
              inputs.lifestyleCreepEnabled ? 'translate-x-5' : ''
            }`}
          />
        </button>
        <span className="text-sm text-slate-600">
          Lifestyle creep (+2%/yr)
        </span>
      </div>
    </Card>
  );
}
