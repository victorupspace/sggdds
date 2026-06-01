import './Badge.styles.css';

import type { BadgeProps } from './Badge.types';

export function Badge({
  appearance = 'solid',
  children,
  className,
  icon,
  iconPosition = 'start',
  size = 'medium',
  variant = 'brand',
}: BadgeProps) {
  const rootClassName = [
    'ds-badge',
    `ds-badge--variant-${variant}`,
    `ds-badge--appearance-${appearance}`,
    `ds-badge--size-${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const iconElement = icon ? (
    <span className="ds-badge__icon" aria-hidden="true">
      {icon}
    </span>
  ) : null;

  return (
    <span className={rootClassName}>
      {iconPosition === 'start' ? iconElement : null}
      <span className="ds-badge__label">{children}</span>
      {iconPosition === 'end' ? iconElement : null}
    </span>
  );
}
