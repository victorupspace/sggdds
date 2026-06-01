import './Button.styles.css';

import type { MouseEvent, ReactNode } from 'react';

import type { ButtonProps } from './Button.types';

function ButtonIcon({ children }: { children: ReactNode }) {
  return (
    <span className="ds-button__icon" aria-hidden="true">
      {children}
    </span>
  );
}

export function Button({
  ariaLabel,
  ariaControls,
  ariaExpanded,
  ariaPressed,
  children,
  className,
  disabled = false,
  fullWidth = false,
  href,
  iconEnd,
  iconStart,
  isLoading = false,
  loadingLabel = 'Carregando',
  onClick,
  rel,
  size = 'medium',
  target,
  type = 'button',
  variant = 'primary',
}: ButtonProps) {
  const isDisabled = disabled || isLoading;
  const rootClassName = [
    'ds-button',
    `ds-button--variant-${variant}`,
    `ds-button--size-${size}`,
    fullWidth ? 'ds-button--full-width' : undefined,
    isLoading ? 'ds-button--loading' : undefined,
    className,
  ]
    .filter(Boolean)
    .join(' ');
  const label = isLoading ? loadingLabel : children;
  const content = (
    <>
      {isLoading ? <span className="ds-button__spinner" aria-hidden="true" /> : null}
      {!isLoading && iconStart ? <ButtonIcon>{iconStart}</ButtonIcon> : null}
      {label ? <span className="ds-button__label">{label}</span> : null}
      {!isLoading && iconEnd ? <ButtonIcon>{iconEnd}</ButtonIcon> : null}
    </>
  );

  if (href) {
    return (
      <a
        aria-busy={isLoading ? 'true' : undefined}
        aria-controls={ariaControls}
        aria-disabled={isDisabled ? 'true' : undefined}
        aria-expanded={ariaExpanded}
        aria-label={ariaLabel}
        aria-pressed={ariaPressed}
        className={rootClassName}
        href={href}
        onClick={(event: MouseEvent<HTMLAnchorElement>) => {
          if (isDisabled) {
            event.preventDefault();
            return;
          }

          onClick?.(event);
        }}
        rel={rel}
        tabIndex={isDisabled ? -1 : undefined}
        target={target}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      aria-busy={isLoading ? 'true' : undefined}
      aria-controls={ariaControls}
      aria-expanded={ariaExpanded}
      aria-label={ariaLabel}
      aria-pressed={ariaPressed}
      className={rootClassName}
      disabled={isDisabled}
      onClick={onClick}
      type={type}
    >
      {content}
    </button>
  );
}
