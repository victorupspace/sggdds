import './Divider.styles.css';

import type { DividerProps } from './Divider.types';

export function Divider({
  ariaLabel,
  className,
  decorative = true,
  label,
  orientation = 'horizontal',
  tone = 'default',
}: DividerProps) {
  const rootClassName = [
    'ds-divider',
    `ds-divider--orientation-${orientation}`,
    `ds-divider--tone-${tone}`,
    label != null ? 'ds-divider--with-label' : undefined,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const a11yProps =
    decorative && label == null
      ? ({ 'aria-hidden': 'true' } as const)
      : ({
          'aria-label': ariaLabel,
          'aria-orientation': orientation,
          role: 'separator',
        } as const);

  return (
    <div {...a11yProps} className={rootClassName}>
      {label != null ? (
        <>
          <span aria-hidden="true" className="ds-divider__line ds-divider__line--start" />
          <span className="ds-divider__label">{label}</span>
        </>
      ) : null}
      <span aria-hidden="true" className="ds-divider__line" />
    </div>
  );
}
