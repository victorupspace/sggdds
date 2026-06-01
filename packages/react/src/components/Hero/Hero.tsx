import './Hero.styles.css';

import type { CSSProperties, ElementType } from 'react';

import { Button } from '../Button';
import type {
  HeroAction,
  HeroMediaAspectRatio,
  HeroProps,
  HeroVariant,
} from './Hero.types';

const headingElements: Record<NonNullable<HeroProps['headingLevel']>, ElementType> = {
  1: 'h1',
  2: 'h2',
  3: 'h3',
};

let hasWarnedImageVariant = false;

function resolveVariant(variant: HeroVariant): Exclude<HeroVariant, 'image'> {
  if (variant === 'image') {
    if (process.env.NODE_ENV !== 'production' && !hasWarnedImageVariant) {
      hasWarnedImageVariant = true;
      console.warn(
        '[Hero] variant="image" está deprecated. Use variant="dark" com mediaAspectRatio="1/1".',
      );
    }
    return 'dark';
  }
  return variant;
}

function resolveAspectRatio(
  variant: HeroVariant,
  mediaAspectRatio?: HeroMediaAspectRatio,
): HeroMediaAspectRatio {
  if (mediaAspectRatio) {
    return mediaAspectRatio;
  }
  return variant === 'image' ? '1/1' : '3/2';
}

function HeroActionButton({ action, variant }: { action: HeroAction; variant: 'primary' | 'tertiary' }) {
  return (
    <Button
      ariaLabel={action.ariaLabel}
      disabled={action.disabled}
      href={action.href}
      iconEnd={action.iconEnd}
      iconStart={action.iconStart}
      onClick={action.onClick}
      rel={action.rel}
      size="medium"
      target={action.target}
      variant={variant}
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
  mediaAspectRatio,
  mediaPosition = 'end',
  secondaryAction,
  title,
  variant = 'light',
}: HeroProps) {
  const Heading = headingElements[headingLevel];
  const resolvedVariant = resolveVariant(variant);
  const resolvedAspectRatio = resolveAspectRatio(variant, mediaAspectRatio);
  const hasMedia = media != null || image != null;
  const hasActions = action != null || secondaryAction != null;

  const rootClassName = [
    'ds-hero',
    `ds-hero--variant-${resolvedVariant}`,
    `ds-hero--media-${mediaPosition}`,
    !hasMedia ? 'ds-hero--without-media' : undefined,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const rootStyle = {
    '--hero-media-aspect-ratio': resolvedAspectRatio.replace('/', ' / '),
  } as CSSProperties;

  return (
    <section aria-label={ariaLabel} className={rootClassName} style={rootStyle}>
      <div className="ds-hero__container">
        <div className="ds-hero__content">
          {eyebrow ? <p className="ds-hero__eyebrow">{eyebrow}</p> : null}
          <Heading className="ds-hero__title">{title}</Heading>
          {description ? <p className="ds-hero__description">{description}</p> : null}
          {children ? <div className="ds-hero__slot">{children}</div> : null}
          {hasActions ? (
            <div className="ds-hero__actions">
              {action ? <HeroActionButton action={action} variant="primary" /> : null}
              {secondaryAction ? (
                <HeroActionButton action={secondaryAction} variant="tertiary" />
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
