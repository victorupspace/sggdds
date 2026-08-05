import './Hero.styles.css';

import type { ElementType } from 'react';

import type { HeroProps } from './Hero.types';

const headingElements: Record<NonNullable<HeroProps['headingLevel']>, ElementType> = {
  1: 'h1',
  2: 'h2',
  3: 'h3',
};

export function Hero({
  actions,
  ariaLabel,
  badge,
  children,
  className,
  description,
  headingLevel = 1,
  secondDescription,
  title,
  variant = 'default',
}: HeroProps) {
  const Heading = headingElements[headingLevel];
  const rootClassName = ['ds-hero', `ds-hero--variant-${variant}`, className]
    .filter(Boolean)
    .join(' ');

  return (
    <section aria-label={ariaLabel} className={rootClassName}>
      <div className="ds-hero__content">
        {badge ? <div className="ds-hero__badge">{badge}</div> : null}

        <div className="ds-hero__heading">
          <Heading className="ds-hero__title">{title}</Heading>

          <div className="ds-hero__body">
            {description ? <p className="ds-hero__description">{description}</p> : null}
            {secondDescription ? <p className="ds-hero__description">{secondDescription}</p> : null}
            {actions ? <div className="ds-hero__actions">{actions}</div> : null}
          </div>
        </div>
      </div>

      {children ? <div className="ds-hero__slot">{children}</div> : null}
    </section>
  );
}
