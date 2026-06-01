import type { MouseEventHandler, ReactNode } from 'react';

export type ChipSize = 'small' | 'medium';
export type ChipVariant = 'neutral' | 'brand';

export interface ChipProps {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  icon?: ReactNode;
  onRemove?: MouseEventHandler<HTMLButtonElement>;
  removeLabel?: string;
  selected?: boolean;
  size?: ChipSize;
  variant?: ChipVariant;
}
