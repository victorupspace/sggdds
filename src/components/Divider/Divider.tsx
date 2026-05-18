import './Divider.styles.css';

import type { DividerProps } from './Divider.types';

export function Divider({
  ariaLabel,
  className,
  decorative = true,
  orientation = 'horizontal',
  thickness = 'sm',
  tone = 'default',
}: DividerProps) {
  const rootClassName = [
    'ds-divider',
    `ds-divider--orientation-${orientation}`,
    `ds-divider--thickness-${thickness}`,
    `ds-divider--tone-${tone}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span
      aria-hidden={decorative ? 'true' : undefined}
      aria-label={!decorative ? ariaLabel : undefined}
      aria-orientation={!decorative ? orientation : undefined}
      className={rootClassName}
      role={!decorative ? 'separator' : undefined}
    />
  );
}
