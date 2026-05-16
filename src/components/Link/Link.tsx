import './Link.styles.css';

import type { MouseEvent, ReactNode } from 'react';

import type { LinkProps } from './Link.types';

function ExternalIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7 5h8v8M15 5l-9.5 9.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function LinkIcon({ children }: { children: ReactNode }) {
  return (
    <span className="ds-link__icon" aria-hidden="true">
      {children}
    </span>
  );
}

export function Link({
  ariaLabel,
  children,
  className,
  disabled = false,
  external = false,
  href,
  iconEnd,
  iconStart,
  onClick,
  rel,
  showExternalIcon,
  size = 'medium',
  target,
  variant = 'default',
}: LinkProps) {
  const isExternal = external || target === '_blank';
  const rootClassName = [
    'ds-link',
    `ds-link--variant-${variant}`,
    `ds-link--size-${size}`,
    disabled ? 'ds-link--disabled' : undefined,
    className,
  ]
    .filter(Boolean)
    .join(' ');
  const resolvedRel = isExternal && rel == null ? 'noopener noreferrer' : rel;
  const shouldShowExternalIcon = showExternalIcon ?? isExternal;

  return (
    <a
      aria-disabled={disabled ? 'true' : undefined}
      aria-label={ariaLabel}
      className={rootClassName}
      href={href}
      onClick={(event: MouseEvent<HTMLAnchorElement>) => {
        if (disabled) {
          event.preventDefault();
          return;
        }

        onClick?.(event);
      }}
      rel={resolvedRel}
      tabIndex={disabled ? -1 : undefined}
      target={target}
    >
      {iconStart ? <LinkIcon>{iconStart}</LinkIcon> : null}
      <span className="ds-link__label">{children}</span>
      {iconEnd ? <LinkIcon>{iconEnd}</LinkIcon> : null}
      {!iconEnd && shouldShowExternalIcon ? (
        <LinkIcon>
          <ExternalIcon />
        </LinkIcon>
      ) : null}
    </a>
  );
}
