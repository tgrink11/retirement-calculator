import { useCalculator } from '../../state/calculatorContext';
import { SliderInput } from './SliderInput';
import { Card } from '../shared/Card';
import { SectionHeading } from '../shared/SectionHeading';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatPercent } from '../../utils/formatPercent';

export function SavingsInputs() {
  const { inputs, dispatch } = useCalculator();

  return (
    <Card>
      <SectionHeading title="Your Situation" subtitle="Where you are today" />
      <SliderInput
        label="Current Age"
        value={inputs.currentAge}
        min={18}
        max={70}
        step={1}
        onChange={(v) => dispatch({ type: 'SET_CURRENT_AGE', payload: v })}
        formatValue={(v) => `${v}`}
        tooltip="Your current age"
      />
      <SliderInput
        label="Current Savings"
        value={inputs.currentSavings}
        min={0}
        max={2000000}
        step={5000}
        onChange={(v) => dispatch({ type: 'SET_CURRENT_SAVINGS', payload: v })}
        formatValue={formatCurrency}
        tooltip="Total retirement savings you have today (401k, IRA, etc.)"
      />
      <SliderInput
        label="Expected Annual Return"
        value={inputs.expectedReturn}
        min={0.01}
        max={0.12}
        step={0.005}
        onChange={(v) => dispatch({ type: 'SET_EXPECTED_RETURN', payload: v })}
        formatValue={formatPercent}
        tooltip="Average annual return you expect on your investments"
      />
    </Card>
  );
}
