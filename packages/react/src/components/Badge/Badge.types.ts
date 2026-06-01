import type { ReactNode } from 'react';

export type BadgeVariant = 'brand' | 'neutral' | 'information' | 'positive' | 'negative' | 'notice';

export type BadgeAppearance = 'solid' | 'subtle';

export type BadgeSize = 'small' | 'medium' | 'large';

export type BadgeIconPosition = 'start' | 'end';

export interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  appearance?: BadgeAppearance;
  size?: BadgeSize;
  icon?: ReactNode;
  iconPosition?: BadgeIconPosition;
  className?: string;
}
