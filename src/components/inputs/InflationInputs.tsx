import { useCalculator } from '../../state/calculatorContext';
import { SliderInput } from './SliderInput';
import { Card } from '../shared/Card';
import { SectionHeading } from '../shared/SectionHeading';
import { formatPercent } from '../../utils/formatPercent';

export function InflationInputs() {
  const { inputs, dispatch } = useCalculator();

  return (
    <Card>
      <SectionHeading title="Inflation Assumptions" subtitle="Adjust for realistic cost pressures" />
      <SliderInput
        label="Baseline Inflation"
        value={inputs.baselineInflation}
        min={0.01}
        max={0.08}
        step={0.005}
        onChange={(v) => dispatch({ type: 'SET_BASELINE_INFLATION', payload: v })}
        formatValue={formatPercent}
        tooltip="General CPI inflation rate"
      />
      <SliderInput
        label="Healthcare Inflation"
        value={inputs.healthInflation}
        min={0.03}
        max={0.10}
        step={0.005}
        onChange={(v) => dispatch({ type: 'SET_HEALTH_INFLATION', payload: v })}
        formatValue={formatPercent}
        tooltip="Medical costs rise faster than general inflation"
      />
      <SliderInput
        label="Tech & Lifestyle"
        value={inputs.techLifestyleInflation}
        min={0}
        max={0.04}
        step={0.005}
        onChange={(v) => dispatch({ type: 'SET_TECH_INFLATION', payload: v })}
        formatValue={formatPercent}
        tooltip="Technology subscriptions, lifestyle upgrades"
      />
      <SliderInput
        label="Climate Buffer"
        value={inputs.climateBuffer}
        min={0}
        max={0.03}
        step={0.005}
        onChange={(v) => dispatch({ type: 'SET_CLIMATE_BUFFER', payload: v })}
        formatValue={formatPercent}
        tooltip="Rising costs from climate change (energy, insurance, food)"
      />
    </Card>
  );
}
