import './Card.styles.css';

import type { ElementType } from 'react';

import { Badge } from '../Badge';
import { Button } from '../Button';
import type { CardAction, CardProps } from './Card.types';

const headingElements: Record<NonNullable<CardProps['headingLevel']>, ElementType> = {
  2: 'h2',
  3: 'h3',
  4: 'h4',
  5: 'h5',
  6: 'h6',
};

function CardActionElement({
  action,
  disabled,
  kind,
}: {
  action: CardAction;
  disabled: boolean;
  kind: 'primary' | 'secondary';
}) {
  const isDisabled = disabled || action.disabled === true;

  return (
    <Button
      ariaLabel={action.ariaLabel}
      className={['ds-card__action', `ds-card__action--${kind}`].join(' ')}
      disabled={isDisabled}
      href={action.href}
      iconStart={action.icon}
      onClick={action.onClick}
      rel={action.rel}
      target={action.target}
      variant={kind === 'primary' ? 'primary' : 'tertiary'}
    >
      {action.label}
    </Button>
  );
}

export function Card({
  badge,
  children,
  className,
  description,
  disabled = false,
  headingLevel = 3,
  media,
  mediaAspectRatio = 'wide',
  orientation = 'vertical',
  primaryAction,
  secondaryAction,
  title,
  tone = 'neutral',
}: CardProps) {
  const Heading = headingElements[headingLevel];
  const hasActions = primaryAction != null || secondaryAction != null;
  const rootClassName = [
    'ds-card',
    `ds-card--orientation-${orientation}`,
    `ds-card--tone-${tone}`,
    `ds-card--media-${mediaAspectRatio}`,
    disabled ? 'ds-card--disabled' : undefined,
    !media ? 'ds-card--without-media' : undefined,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <article aria-disabled={disabled ? 'true' : undefined} className={rootClassName}>
      {media ? <div className="ds-card__media">{media}</div> : null}

      <div className="ds-card__content">
        {badge ? (
          <div className="ds-card__badge">
            <Badge
              appearance={badge.appearance ?? 'subtle'}
              icon={badge.icon}
              iconPosition={badge.iconPosition}
              size={badge.size ?? 'medium'}
              variant={badge.variant ?? 'neutral'}
            >
              {badge.label}
            </Badge>
          </div>
        ) : null}

        <div className="ds-card__copy">
          <Heading className="ds-card__title">{title}</Heading>
          {description ? <p className="ds-card__description">{description}</p> : null}
        </div>

        {children ? <div className="ds-card__slot">{children}</div> : null}

        {hasActions ? (
          <footer className="ds-card__footer">
            <div className="ds-card__divider" aria-hidden="true" />
            <div className="ds-card__actions">
              {primaryAction ? (
                <CardActionElement action={primaryAction} disabled={disabled} kind="primary" />
              ) : null}
              {secondaryAction ? (
                <CardActionElement action={secondaryAction} disabled={disabled} kind="secondary" />
              ) : null}
            </div>
          </footer>
        ) : null}
      </div>
    </article>
  );
}
