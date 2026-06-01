import './Spinner.styles.css';

import type { SpinnerProps } from './Spinner.types';

export function Spinner({
  ariaLabel,
  centered = true,
  className,
  label = 'Carregando',
  showLabel = false,
  size = 'md',
  variant = 'neutral',
}: SpinnerProps) {
  const accessibleLabel = ariaLabel ?? (typeof label === 'string' ? label : 'Carregando');
  const rootClassName = [
    'ds-spinner',
    `ds-spinner--size-${size}`,
    `ds-spinner--variant-${variant}`,
    centered ? 'ds-spinner--centered' : 'ds-spinner--inline',
    showLabel ? 'ds-spinner--with-label' : undefined,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span
      aria-busy="true"
      aria-label={accessibleLabel}
      aria-live="polite"
      className={rootClassName}
      role="status"
    >
      <span aria-hidden="true" className="ds-spinner__circle" />
      {showLabel ? <span className="ds-spinner__label">{label}</span> : null}
    </span>
  );
}
