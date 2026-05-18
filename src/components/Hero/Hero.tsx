import './Hero.styles.css';

import type { ElementType } from 'react';

import { Button } from '../Button';
import type { HeroAction, HeroProps } from './Hero.types';

const headingElements: Record<NonNullable<HeroProps['headingLevel']>, ElementType> = {
  1: 'h1',
  2: 'h2',
};

function HeroActionElement({ action, kind }: { action: HeroAction; kind: 'primary' | 'secondary' }) {
  return (
    <Button
      ariaLabel={action.ariaLabel}
      className={['ds-hero__action', `ds-hero__action--${kind}`].join(' ')}
      disabled={action.disabled}
      href={action.href}
      iconEnd={action.iconEnd}
      iconStart={action.iconStart}
      onClick={action.onClick}
      rel={action.rel}
      size="medium"
      target={action.target}
      variant={kind === 'primary' ? 'primary' : 'tertiary'}
    >
      {action.label}
    </Button>
  );
}

function HeroMedia({ image, media }: Pick<HeroProps, 'image' | 'media'>) {
  if (media) {
    return <div className="ds-hero__media-inner">{media}</div>;
  }

  if (image) {
    return (
      <img
        alt={image.alt}
        className="ds-hero__image"
        sizes={image.sizes}
        src={image.src}
        srcSet={image.srcSet}
      />
    );
  }

  return null;
}

export function Hero({
  action,
  ariaLabel,
  children,
  className,
  description,
  eyebrow,
  headingLevel = 1,
  image,
  media,
  mediaPosition = 'end',
  secondaryAction,
  title,
  variant = 'light',
}: HeroProps) {
  const Heading = headingElements[headingLevel];
  const hasMedia = media != null || image != null;
  const hasActions = action != null || secondaryAction != null;
  const rootClassName = [
    'ds-hero',
    `ds-hero--variant-${variant}`,
    `ds-hero--media-${mediaPosition}`,
    !hasMedia ? 'ds-hero--without-media' : undefined,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section aria-label={ariaLabel} className={rootClassName}>
      <div className="ds-hero__container">
        <div className="ds-hero__content">
          {eyebrow ? <p className="ds-hero__eyebrow">{eyebrow}</p> : null}
          <Heading className="ds-hero__title">{title}</Heading>
          {description ? <p className="ds-hero__description">{description}</p> : null}
          {children ? <div className="ds-hero__slot">{children}</div> : null}
          {hasActions ? (
            <div className="ds-hero__actions">
              {action ? <HeroActionElement action={action} kind="primary" /> : null}
              {secondaryAction ? (
                <HeroActionElement action={secondaryAction} kind="secondary" />
              ) : null}
            </div>
          ) : null}
        </div>

        {hasMedia ? (
          <div className="ds-hero__media">
            <HeroMedia image={image} media={media} />
          </div>
        ) : null}
      </div>
    </section>
  );
}
