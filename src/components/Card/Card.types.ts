import type { ReactNode } from 'react';

import type { BadgeAppearance, BadgeIconPosition, BadgeSize, BadgeVariant } from '../Badge';

export type CardHeadingLevel = 2 | 3 | 4 | 5 | 6;

export type CardOrientation = 'vertical' | 'horizontal';

export type CardTone = 'neutral' | 'brand' | 'info' | 'success' | 'warning' | 'danger';

export type CardMediaAspectRatio = 'wide' | 'square';

export interface CardBadge {
  label: ReactNode;
  icon?: ReactNode;
  iconPosition?: BadgeIconPosition;
  variant?: BadgeVariant;
  appearance?: BadgeAppearance;
  size?: BadgeSize;
}

export interface CardAction {
  label: ReactNode;
  href?: string;
  onClick?: () => void;
  ariaLabel?: string;
  disabled?: boolean;
  icon?: ReactNode;
  target?: string;
  rel?: string;
}

export interface CardProps {
  title: ReactNode;
  description?: ReactNode;
  badge?: CardBadge;
  media?: ReactNode;
  mediaAspectRatio?: CardMediaAspectRatio;
  primaryAction?: CardAction;
  secondaryAction?: CardAction;
  children?: ReactNode;
  headingLevel?: CardHeadingLevel;
  orientation?: CardOrientation;
  tone?: CardTone;
  disabled?: boolean;
  className?: string;
}
