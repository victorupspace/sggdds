import type { MouseEventHandler, ReactNode } from 'react';

export type HeroVariant = 'light' | 'dark' | 'image';
export type HeroMediaPosition = 'start' | 'end';
export type HeroHeadingLevel = 1 | 2;

export interface HeroAction {
  ariaLabel?: string;
  disabled?: boolean;
  href?: string;
  iconEnd?: ReactNode;
  iconStart?: ReactNode;
  label: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  rel?: string;
  target?: string;
}

export interface HeroImage {
  alt: string;
  sizes?: string;
  src: string;
  srcSet?: string;
}

export interface HeroProps {
  action?: HeroAction;
  ariaLabel?: string;
  children?: ReactNode;
  className?: string;
  description?: ReactNode;
  eyebrow?: ReactNode;
  headingLevel?: HeroHeadingLevel;
  image?: HeroImage;
  media?: ReactNode;
  mediaPosition?: HeroMediaPosition;
  secondaryAction?: HeroAction;
  title: ReactNode;
  variant?: HeroVariant;
}
