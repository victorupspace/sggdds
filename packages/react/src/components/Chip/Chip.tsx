import './Chip.styles.css';

import type { ChipProps } from './Chip.types';

/*
 * Ícone padrão dos slots Leading/Trailing Icon no Figma (Web Components /
 * Chip, node 40000114:11143): glifo help exportado, com a cor via
 * currentColor para acompanhar o texto de cada variante.
 */
function HelpIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8.06667 11.6667C8.21111 11.6667 8.33611 11.6139 8.44167 11.5083C8.54722 11.4028 8.6 11.2722 8.6 11.1167C8.6 10.9722 8.54722 10.8472 8.44167 10.7417C8.33611 10.6361 8.21111 10.5833 8.06667 10.5833C7.92222 10.5833 7.79722 10.6361 7.69167 10.7417C7.58611 10.8472 7.53333 10.9722 7.53333 11.1167C7.53333 11.2722 7.58611 11.4028 7.69167 11.5083C7.79722 11.6139 7.92222 11.6667 8.06667 11.6667ZM7.6 9.36667H8.36667C8.36667 9.1 8.40833 8.85556 8.49167 8.63333C8.575 8.41111 8.78333 8.16111 9.11667 7.88333C9.43889 7.59444 9.67222 7.31944 9.81667 7.05833C9.96111 6.79722 10.0333 6.51111 10.0333 6.2C10.0333 5.64444 9.85278 5.19722 9.49167 4.85833C9.13056 4.51944 8.66667 4.35 8.1 4.35C7.6 4.35 7.16111 4.47778 6.78333 4.73333C6.40556 4.98889 6.12778 5.32222 5.95 5.73333L6.63333 6C6.76667 5.7 6.95 5.46667 7.18333 5.3C7.41667 5.13333 7.70556 5.05 8.05 5.05C8.45 5.05 8.76667 5.16111 9 5.38333C9.23333 5.60556 9.35 5.88333 9.35 6.21667C9.35 6.45 9.28056 6.66944 9.14167 6.875C9.00278 7.08056 8.80556 7.29444 8.55 7.51667C8.22778 7.80556 7.98889 8.09167 7.83333 8.375C7.67778 8.65833 7.6 8.98889 7.6 9.36667ZM8 14.3333C7.11111 14.3333 6.28333 14.1722 5.51667 13.85C4.75 13.5278 4.08056 13.0806 3.50833 12.5083C2.93611 11.9361 2.48611 11.2639 2.15833 10.4917C1.83056 9.71944 1.66667 8.88889 1.66667 8C1.66667 7.11111 1.83056 6.28333 2.15833 5.51667C2.48611 4.75 2.93611 4.08056 3.50833 3.50833C4.08056 2.93611 4.75 2.48611 5.51667 2.15833C6.28333 1.83056 7.11111 1.66667 8 1.66667C8.87778 1.66667 9.7 1.83056 10.4667 2.15833C11.2333 2.48611 11.9028 2.93611 12.475 3.50833C13.0472 4.08056 13.5 4.75 13.8333 5.51667C14.1667 6.28333 14.3333 7.11111 14.3333 8C14.3333 8.88889 14.1667 9.71944 13.8333 10.4917C13.5 11.2639 13.0472 11.9361 12.475 12.5083C11.9028 13.0806 11.2333 13.5278 10.4667 13.85C9.7 14.1722 8.87778 14.3333 8 14.3333ZM8 13.5833C9.54444 13.5833 10.8611 13.0361 11.95 11.9417C13.0389 10.8472 13.5833 9.53333 13.5833 8C13.5833 6.46667 13.0389 5.15278 11.95 4.05833C10.8611 2.96389 9.54444 2.41667 8 2.41667C6.44444 2.41667 5.125 2.96389 4.04167 4.05833C2.95833 5.15278 2.41667 6.46667 2.41667 8C2.41667 9.53333 2.95833 10.8472 4.04167 11.9417C5.125 13.0361 6.44444 13.5833 8 13.5833Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Chip({
  children,
  className,
  disabled = false,
  leadingIcon,
  onClick,
  selected = false,
  showLeadingIcon = false,
  showTrailingIcon = false,
  trailingIcon,
  variant = 'support',
}: ChipProps) {
  const isInteractive = Boolean(onClick);
  const rootClassName = [
    'ds-chip',
    `ds-chip--variant-${variant}`,
    isInteractive ? 'ds-chip--interactive' : undefined,
    selected ? 'ds-chip--selected' : undefined,
    disabled ? 'ds-chip--disabled' : undefined,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const leading = leadingIcon ?? (showLeadingIcon ? <HelpIcon /> : null);
  const trailing = trailingIcon ?? (showTrailingIcon ? <HelpIcon /> : null);

  const content = (
    <>
      {leading ? (
        <span aria-hidden="true" className="ds-chip__icon">
          {leading}
        </span>
      ) : null}
      <span className="ds-chip__label">{children}</span>
      {trailing ? (
        <span aria-hidden="true" className="ds-chip__icon">
          {trailing}
        </span>
      ) : null}
    </>
  );

  if (isInteractive) {
    return (
      <button
        aria-pressed={selected}
        className={rootClassName}
        disabled={disabled}
        onClick={onClick}
        type="button"
      >
        {content}
      </button>
    );
  }

  return (
    <span aria-disabled={disabled ? 'true' : undefined} className={rootClassName}>
      {content}
    </span>
  );
}
