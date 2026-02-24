import { Tooltip } from '../shared/Tooltip';

interface SliderInputProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  formatValue: (value: number) => string;
  tooltip?: string;
}

export function SliderInput({
  label,
  value,
  min,
  max,
  step,
  onChange,
  formatValue,
  tooltip,
}: SliderInputProps) {
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-sm font-medium text-slate-700 flex items-center gap-1">
          {label}
          {tooltip && (
            <Tooltip content={tooltip}>
              <span className="inline-flex items-center justify-center w-4 h-4 text-xs text-slate-400 bg-slate-100 rounded-full cursor-help">
                ?
              </span>
            </Tooltip>
          )}
        </label>
        <span className="text-sm font-semibold text-slate-900 tabular-nums">
          {formatValue(value)}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600
          [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
          [&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md
          [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:hover:bg-blue-700"
        aria-label={label}
      />
      <div className="flex justify-between text-xs text-slate-400 mt-0.5">
        <span>{formatValue(min)}</span>
        <span>{formatValue(max)}</span>
      </div>
    </div>
  );
}
