import './ProgressBar.styles.css';

import { useId } from 'react';

import type { CSSProperties, ReactNode } from 'react';
import type { ProgressBarProps, ProgressBarVariant } from './ProgressBar.types';

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function getPercentage(value: number, min: number, max: number) {
  if (max <= min) {
    return 0;
  }

  return ((clamp(value, min, max) - min) / (max - min)) * 100;
}

function SuccessIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" fill="currentColor" r="9" />
      <path
        d="m6.2 10 2.4 2.5 5.3-5.4"
        stroke="var(--progress-bar-icon-mark)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function ErrorIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" fill="currentColor" r="9" />
      <path
        d="M10 5.8v5M10 14.1v.1"
        stroke="var(--progress-bar-icon-mark)"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function ImageIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <rect
        height="14"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.8"
        width="14"
        x="3"
        y="3"
      />
      <path
        d="m5.8 14 3.3-3.4 2.1 2.1 1.2-1.3 1.8 2.6M7 7.3h.1"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

const defaultIcons: Record<ProgressBarVariant, ReactNode> = {
  brand: <ImageIcon />,
  error: <ErrorIcon />,
  neutral: <ImageIcon />,
  success: <SuccessIcon />,
};

export function ProgressBar({
  ariaLabel = 'Progresso',
  barClassName,
  className,
  helperText,
  icon,
  id,
  label,
  max = 100,
  min = 0,
  mode = 'determinate',
  showIcon = false,
  showValue,
  size = 'md',
  value = 0,
  valueLabel,
  variant = 'brand',
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
  const shouldShowValue = showValue ?? isDeterminate;
  const renderedValue = valueLabel ?? `${String(Math.round(percentage))}%`;
  const shouldShowIcon = showIcon || Boolean(icon);
  const rootClassName = [
    'ds-progress-bar',
    `ds-progress-bar--variant-${variant}`,
    `ds-progress-bar--size-${size}`,
    `ds-progress-bar--mode-${mode}`,
    !label ? 'ds-progress-bar--without-label' : undefined,
    !helperText ? 'ds-progress-bar--without-helper' : undefined,
    !shouldShowValue ? 'ds-progress-bar--without-value' : undefined,
    className,
  ]
    .filter(Boolean)
    .join(' ');
  const fillStyle: CSSProperties | undefined = isDeterminate
    ? { inlineSize: `${String(percentage)}%` }
    : undefined;

  return (
    <div className={rootClassName} id={rootId}>
      {label || shouldShowValue || shouldShowIcon ? (
        <div className="ds-progress-bar__header">
          {label ? (
            <span className="ds-progress-bar__label" id={labelId}>
              {label}
            </span>
          ) : null}

          {shouldShowValue || shouldShowIcon ? (
            <span className="ds-progress-bar__meta">
              {shouldShowValue ? <span className="ds-progress-bar__value">{renderedValue}</span> : null}
              {shouldShowIcon ? (
                <span aria-hidden="true" className="ds-progress-bar__icon">
                  {icon ?? defaultIcons[variant]}
                </span>
              ) : null}
            </span>
          ) : null}
        </div>
      ) : null}

      <div
        aria-describedby={helperId}
        aria-label={label ? undefined : ariaLabel}
        aria-labelledby={labelId}
        aria-valuemax={isDeterminate ? safeMax : undefined}
        aria-valuemin={isDeterminate ? safeMin : undefined}
        aria-valuenow={isDeterminate ? clamp(safeValue, safeMin, safeMax) : undefined}
        aria-valuetext={isDeterminate && typeof renderedValue === 'string' ? renderedValue : undefined}
        className={['ds-progress-bar__track', barClassName].filter(Boolean).join(' ')}
        role="progressbar"
      >
        <span className="ds-progress-bar__fill" style={fillStyle} />
      </div>

      {helperText ? (
        <p className="ds-progress-bar__helper" id={helperId}>
          {helperText}
        </p>
      ) : null}
    </div>
  );
}
