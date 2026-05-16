import './InfoCard.styles.css';

import type { ElementType } from 'react';

import type { InfoCardProps } from './InfoCard.types';

const headingElements: Record<NonNullable<InfoCardProps['headingLevel']>, ElementType> = {
  2: 'h2',
  3: 'h3',
  4: 'h4',
  5: 'h5',
  6: 'h6',
};

export function InfoCard({
  children,
  className,
  description,
  headingLevel = 3,
  icon,
  subtitle,
  title,
}: InfoCardProps) {
  const Heading = headingElements[headingLevel];
  const rootClassName = [
    'ds-info-card',
    !icon ? 'ds-info-card--without-icon' : undefined,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <article className={rootClassName}>
      <header className="ds-info-card__header">
        {icon ? (
          <span className="ds-info-card__icon" aria-hidden="true">
            {icon}
          </span>
        ) : null}

        <div className="ds-info-card__title-block">
          <Heading className="ds-info-card__title">
            <span>{title}</span>
            {subtitle ? <span>{subtitle}</span> : null}
          </Heading>
        </div>
      </header>

      {description ? <p className="ds-info-card__description">{description}</p> : null}

      {children ? <div className="ds-info-card__slot">{children}</div> : null}
    </article>
  );
}
