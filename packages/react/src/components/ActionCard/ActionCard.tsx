import './ActionCard.styles.css';

import type { ElementType, ReactNode } from 'react';

import type { ActionCardProps } from './ActionCard.types';

const headingElements: Record<NonNullable<ActionCardProps['headingLevel']>, ElementType> = {
  2: 'h2',
  3: 'h3',
  4: 'h4',
  5: 'h5',
  6: 'h6',
};

function ActionCardContent({
  badge,
  description,
  icon,
  title,
}: Pick<ActionCardProps, 'badge' | 'description' | 'icon'> & { title: ReactNode }) {
  return (
    <>
      <span className="ds-action-card__header">
        {icon ? (
          <span className="ds-action-card__icon-circle" aria-hidden="true">
            <span className="ds-action-card__icon">{icon}</span>
          </span>
        ) : null}
        {title}
      </span>

      {badge ? <span className="ds-action-card__badge">{badge}</span> : null}

      {description ? <span className="ds-action-card__description">{description}</span> : null}
    </>
  );
}

export function ActionCard({
  badge,
  className,
  description,
  headingLevel = 3,
  href,
  icon,
  onClick,
  selected = false,
  title,
}: ActionCardProps) {
  const isInteractive = Boolean(href) || Boolean(onClick);
  const rootClassName = [
    'ds-action-card',
    isInteractive ? 'ds-action-card--interactive' : undefined,
    selected ? 'ds-action-card--selected' : undefined,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (href) {
    return (
      <a
        aria-current={selected ? 'true' : undefined}
        className={rootClassName}
        href={href}
        onClick={onClick}
      >
        <ActionCardContent
          badge={badge}
          description={description}
          icon={icon}
          title={<span className="ds-action-card__title">{title}</span>}
        />
      </a>
    );
  }

  if (onClick) {
    return (
      <button aria-pressed={selected} className={rootClassName} onClick={onClick} type="button">
        <ActionCardContent
          badge={badge}
          description={description}
          icon={icon}
          title={<span className="ds-action-card__title">{title}</span>}
        />
      </button>
    );
  }

  const Heading = headingElements[headingLevel];

  return (
    <article className={rootClassName}>
      <ActionCardContent
        badge={badge}
        description={description}
        icon={icon}
        title={<Heading className="ds-action-card__title">{title}</Heading>}
      />
    </article>
  );
}
