import './Card.styles.css';

import type { ElementType } from 'react';

import type { CardProps } from './Card.types';

const headingElements: Record<NonNullable<CardProps['headingLevel']>, ElementType> = {
  2: 'h2',
  3: 'h3',
  4: 'h4',
  5: 'h5',
  6: 'h6',
};

export function Card({
  action,
  badge,
  className,
  description,
  headingLevel = 3,
  media,
  orientation = 'vertical',
  showDivider = true,
  title,
}: CardProps) {
  const Heading = headingElements[headingLevel];
  const rootClassName = ['ds-card', `ds-card--orientation-${orientation}`, className]
    .filter(Boolean)
    .join(' ');

  return (
    <article className={rootClassName}>
      {media ? <div className="ds-card__media">{media}</div> : null}

      <div className="ds-card__body">
        {badge ? <div className="ds-card__badge">{badge}</div> : null}

        <div className="ds-card__title-row">
          {/* Title bar do Figma: Divider vertical de 4x25 na cor da marca */}
          <span aria-hidden="true" className="ds-card__title-bar" />
          <Heading className="ds-card__title">{title}</Heading>
        </div>

        {description ? <p className="ds-card__description">{description}</p> : null}

        {showDivider ? <hr aria-hidden="true" className="ds-card__divider" /> : null}

        {action ? <div className="ds-card__action">{action}</div> : null}
      </div>
    </article>
  );
}
