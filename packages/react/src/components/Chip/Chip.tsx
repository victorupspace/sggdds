import './Chip.styles.css';

import type { ReactNode } from 'react';

import type { ChipProps } from './Chip.types';

function DefaultRemoveIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <path
        d="m4.5 4.5 7 7m0-7-7 7"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function ChipIcon({ children }: { children: ReactNode }) {
  return (
    <span className="ds-chip__icon" aria-hidden="true">
      {children}
    </span>
  );
}

function getTextLabel(children: ReactNode) {
  return typeof children === 'string' || typeof children === 'number' ? String(children) : 'item';
}

export function Chip({
  children,
  className,
  disabled = false,
  icon,
  onRemove,
  removeLabel,
  selected = false,
  size = 'medium',
  variant = 'neutral',
}: ChipProps) {
  const rootClassName = [
    'ds-chip',
    `ds-chip--size-${size}`,
    `ds-chip--variant-${variant}`,
    selected ? 'ds-chip--selected' : undefined,
    disabled ? 'ds-chip--disabled' : undefined,
    className,
  ]
    .filter(Boolean)
    .join(' ');
  const accessibleRemoveLabel = removeLabel ?? `Remover ${getTextLabel(children)}`;

  return (
    <span className={rootClassName} aria-disabled={disabled ? 'true' : undefined}>
      {icon ? <ChipIcon>{icon}</ChipIcon> : null}
      <span className="ds-chip__label">{children}</span>
      <button
        aria-label={accessibleRemoveLabel}
        className="ds-chip__remove"
        disabled={disabled}
        onClick={onRemove}
        type="button"
      >
        <DefaultRemoveIcon />
      </button>
    </span>
  );
}
