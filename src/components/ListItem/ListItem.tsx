import './ListItem.styles.css';

import type { ReactNode } from 'react';
import type { ListItemProps } from './ListItem.types';

function Slot({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) {
  return (
    <span aria-hidden="true" className={className}>
      {children}
    </span>
  );
}

function ChevronIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path
        d="m7.5 4.5 5 5.5-5 5.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

export function ListItem({
  ariaLabel,
  className,
  description,
  density = 'comfortable',
  disabled = false,
  divider = false,
  href,
  leading,
  line,
  onClick,
  radius = 'none',
  rel,
  selected = false,
  target,
  title,
  trailing,
  ...restProps
}: ListItemProps) {
  const resolvedLine = line ?? (description ? 'two-line' : 'one-line');
  const isInteractive = href != null || onClick != null;
  const shouldShowChevron = isInteractive && !trailing;
  const rootClassName = [
    'ds-list-item',
    `ds-list-item--${resolvedLine}`,
    `ds-list-item--density-${density}`,
    `ds-list-item--radius-${radius}`,
    divider ? 'ds-list-item--divider' : undefined,
    selected ? 'ds-list-item--selected' : undefined,
    disabled ? 'ds-list-item--disabled' : undefined,
    isInteractive ? 'ds-list-item--interactive' : undefined,
    !leading ? 'ds-list-item--without-leading' : undefined,
    !trailing && !shouldShowChevron ? 'ds-list-item--without-trailing' : undefined,
    className,
  ]
    .filter(Boolean)
    .join(' ');
  const content = (
    <>
      {leading ? <Slot className="ds-list-item__leading">{leading}</Slot> : null}
      <span className="ds-list-item__content">
        <span className="ds-list-item__title">{title}</span>
        {description ? <span className="ds-list-item__description">{description}</span> : null}
      </span>
      {trailing ? <Slot className="ds-list-item__trailing">{trailing}</Slot> : null}
      {shouldShowChevron ? (
        <Slot className="ds-list-item__trailing ds-list-item__chevron">
          <ChevronIcon />
        </Slot>
      ) : null}
    </>
  );

  if (href) {
    const resolvedRel = target === '_blank' && rel == null ? 'noopener noreferrer' : rel;

    return (
      <li
        {...restProps}
        aria-disabled={disabled ? 'true' : undefined}
        aria-selected={selected ? 'true' : undefined}
        className={rootClassName}
      >
        <a
          aria-label={ariaLabel}
          className="ds-list-item__control"
          href={disabled ? undefined : href}
          onClick={(event) => {
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
          {content}
        </a>
      </li>
    );
  }

  if (onClick) {
    return (
      <li
        {...restProps}
        aria-disabled={disabled ? 'true' : undefined}
        aria-selected={selected ? 'true' : undefined}
        className={rootClassName}
      >
        <button
          aria-label={ariaLabel}
          className="ds-list-item__control"
          disabled={disabled}
          onClick={(event) => {
            onClick(event);
          }}
          type="button"
        >
          {content}
        </button>
      </li>
    );
  }

  return (
    <li
      {...restProps}
      aria-disabled={disabled ? 'true' : undefined}
      aria-selected={selected ? 'true' : undefined}
      className={rootClassName}
    >
      <div aria-label={ariaLabel} className="ds-list-item__control">
        {content}
      </div>
    </li>
  );
}
