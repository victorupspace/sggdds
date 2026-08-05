import './Badge.styles.css';

import type { BadgeProps } from './Badge.types';

/*
 * Ícone padrão do slot Icon Swap no Figma (Web Components / Badge Standard,
 * node 38:1035): glifo percent exportado do Figma, com a cor controlada por
 * CSS via currentColor.
 */
function PercentIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
      <path
        clipRule="evenodd"
        d="M11.4958 2.50419C11.7236 2.73199 11.7236 3.10134 11.4958 3.32915L3.32915 11.4958C3.10134 11.7236 2.73199 11.7236 2.50419 11.4958C2.27638 11.268 2.27638 10.8987 2.50419 10.6709L10.6709 2.50419C10.8987 2.27638 11.268 2.27638 11.4958 2.50419Z"
        fill="currentColor"
        fillRule="evenodd"
      />
      <path
        clipRule="evenodd"
        d="M3.79167 2.91667C3.30842 2.91667 2.91667 3.30842 2.91667 3.79167C2.91667 4.27492 3.30842 4.66667 3.79167 4.66667C4.27492 4.66667 4.66667 4.27492 4.66667 3.79167C4.66667 3.30842 4.27492 2.91667 3.79167 2.91667ZM1.75 3.79167C1.75 2.66409 2.66409 1.75 3.79167 1.75C4.91925 1.75 5.83333 2.66409 5.83333 3.79167C5.83333 4.91925 4.91925 5.83333 3.79167 5.83333C2.66409 5.83333 1.75 4.91925 1.75 3.79167Z"
        fill="currentColor"
        fillRule="evenodd"
      />
      <path
        clipRule="evenodd"
        d="M10.2083 9.33333C9.72508 9.33333 9.33333 9.72508 9.33333 10.2083C9.33333 10.6916 9.72508 11.0833 10.2083 11.0833C10.6916 11.0833 11.0833 10.6916 11.0833 10.2083C11.0833 9.72508 10.6916 9.33333 10.2083 9.33333ZM8.16667 10.2083C8.16667 9.08075 9.08075 8.16667 10.2083 8.16667C11.3359 8.16667 12.25 9.08075 12.25 10.2083C12.25 11.3359 11.3359 12.25 10.2083 12.25C9.08075 12.25 8.16667 11.3359 8.16667 10.2083Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
}

export function Badge({
  appearance = 'solid',
  children,
  className,
  icon,
  showIcon = false,
  size = 'small',
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

  const iconContent = icon ?? (showIcon ? <PercentIcon /> : null);

  return (
    <span className={rootClassName}>
      {iconContent ? (
        <span className="ds-badge__icon" aria-hidden="true">
          {iconContent}
        </span>
      ) : null}
      <span className="ds-badge__label">{children}</span>
    </span>
  );
}
