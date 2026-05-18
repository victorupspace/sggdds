import './ButtonGov.styles.css';

import type { MouseEvent, ReactNode } from 'react';

import type { ButtonGovProps } from './ButtonGov.types';

const DEFAULT_LABEL = 'Entrar com o gov.br';

function GovUserIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10 9.65a4.1 4.1 0 1 0 0-8.2 4.1 4.1 0 0 0 0 8.2ZM2.25 17.95c.58-4.1 3.5-6.55 7.75-6.55s7.17 2.45 7.75 6.55c.1.7-.47 1.3-1.18 1.3H3.43c-.71 0-1.28-.6-1.18-1.3Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ButtonGovIcon({ children }: { children: ReactNode }) {
  return (
    <span className="ds-button-gov__icon" aria-hidden="true">
      {children}
    </span>
  );
}

function ButtonGovLabel({ children }: { children: ReactNode }) {
  if (children === DEFAULT_LABEL) {
    return (
      <span className="ds-button-gov__label">
        <span className="ds-button-gov__label-base">Entrar com o</span>
        <span className="ds-button-gov__label-brand">gov.br</span>
      </span>
    );
  }

  return <span className="ds-button-gov__label">{children}</span>;
}

export function ButtonGov({
  ariaLabel,
  children = DEFAULT_LABEL,
  className,
  disabled = false,
  href,
  icon = <GovUserIcon />,
  isLoading = false,
  loadingLabel = 'Carregando',
  onClick,
  rel,
  target,
  type = 'button',
}: ButtonGovProps) {
  const isDisabled = disabled || isLoading;
  const resolvedAriaLabel =
    ariaLabel ?? (children === DEFAULT_LABEL && !isLoading ? DEFAULT_LABEL : undefined);
  const rootClassName = [
    'ds-button-gov',
    isLoading ? 'ds-button-gov--loading' : undefined,
    className,
  ]
    .filter(Boolean)
    .join(' ');
  const label = isLoading ? loadingLabel : children;
  const content = (
    <>
      {isLoading ? (
        <span className="ds-button-gov__spinner" aria-hidden="true" />
      ) : (
        <ButtonGovIcon>{icon}</ButtonGovIcon>
      )}
      <ButtonGovLabel>{label}</ButtonGovLabel>
    </>
  );

  if (href) {
    return (
      <a
        aria-busy={isLoading ? 'true' : undefined}
        aria-disabled={isDisabled ? 'true' : undefined}
        aria-label={resolvedAriaLabel}
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
      aria-label={resolvedAriaLabel}
      className={rootClassName}
      disabled={isDisabled}
      onClick={onClick}
      type={type}
    >
      {content}
    </button>
  );
}
