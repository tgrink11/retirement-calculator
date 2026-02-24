import { useCalculator } from '../../state/calculatorContext';
import { SliderInput } from './SliderInput';
import { Card } from '../shared/Card';
import { SectionHeading } from '../shared/SectionHeading';

export function AgeInputs() {
  const { inputs, dispatch } = useCalculator();

  return (
    <Card>
      <SectionHeading title="Age & Timeline" />
      <SliderInput
        label="Retirement Age"
        value={inputs.retirementAge}
        min={50}
        max={80}
        step={1}
        onChange={(v) => dispatch({ type: 'SET_RETIREMENT_AGE', payload: v })}
        formatValue={(v) => `${v}`}
        tooltip="The age you plan to stop working"
      />
      <SliderInput
        label="Life Expectancy"
        value={inputs.lifeExpectancy}
        min={70}
        max={100}
        step={1}
        onChange={(v) => dispatch({ type: 'SET_LIFE_EXPECTANCY', payload: v })}
        formatValue={(v) => `${v}`}
        tooltip="Plan for how long you expect to live"
      />
    </Card>
  );
}
