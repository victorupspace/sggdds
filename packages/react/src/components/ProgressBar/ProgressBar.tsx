import './ProgressBar.styles.css';

import { useId } from 'react';

import type { CSSProperties } from 'react';
import type { ProgressBarProps } from './ProgressBar.types';

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function getPercentage(value: number, min: number, max: number) {
  if (max <= min) {
    return 0;
  }

  return ((clamp(value, min, max) - min) / (max - min)) * 100;
}

export function ProgressBar({
  ariaLabel = 'Progresso',
  className,
  helperText,
  id,
  label,
  max = 100,
  min = 0,
  mode = 'determinate',
  showValue,
  value = 0,
  valueLabel,
  variant = 'default',
}: ProgressBarProps) {
  const generatedId = useId();
  const rootId = id ?? `ds-progress-bar-${generatedId}`;
  const labelId = label ? `${rootId}-label` : undefined;
  const helperId = helperText ? `${rootId}-helper` : undefined;
  const safeMin = Number.isFinite(min) ? min : 0;
  const safeMax = Number.isFinite(max) ? max : 100;
  const safeValue = Number.isFinite(value) ? value : safeMin;
  const percentage = getPercentage(safeValue, safeMin, safeMax);
  const isDeterminate = mode === 'determinate';
  const shouldShowValue = (showValue ?? true) && isDeterminate;
  const renderedValue = valueLabel ?? `${String(Math.round(percentage))}%`;
  const rootClassName = ['ds-progress-bar', `ds-progress-bar--variant-${variant}`, className]
    .filter(Boolean)
    .join(' ');
  const fillStyle: CSSProperties | undefined = isDeterminate
    ? { inlineSize: `${String(percentage)}%` }
    : undefined;

  return (
    <div className={rootClassName} id={rootId}>
      {label || shouldShowValue ? (
        <div className="ds-progress-bar__top-content">
          {label ? (
            <span className="ds-progress-bar__label" id={labelId}>
              {label}
            </span>
          ) : null}
          {shouldShowValue ? <span className="ds-progress-bar__value">{renderedValue}</span> : null}
        </div>
      ) : null}

      <div
        aria-describedby={helperId}
        aria-label={label ? undefined : ariaLabel}
        aria-labelledby={labelId}
        aria-valuemax={isDeterminate ? safeMax : undefined}
        aria-valuemin={isDeterminate ? safeMin : undefined}
        aria-valuenow={isDeterminate ? clamp(safeValue, safeMin, safeMax) : undefined}
        aria-valuetext={
          isDeterminate && typeof renderedValue === 'string' ? renderedValue : undefined
        }
        className={['ds-progress-bar__track', `ds-progress-bar--mode-${mode}`]
          .filter(Boolean)
          .join(' ')}
        role="progressbar"
      >
        <span className="ds-progress-bar__range" style={fillStyle} />
      </div>

      {helperText ? (
        <p className="ds-progress-bar__helper" id={helperId}>
          {helperText}
        </p>
      ) : null}
    </div>
  );
}
