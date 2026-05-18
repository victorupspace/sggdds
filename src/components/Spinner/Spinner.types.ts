import type { ReactNode } from 'react';

export type SpinnerSize = 'sm' | 'md' | 'lg';

export type SpinnerVariant = 'brand' | 'neutral' | 'inverse';

export interface SpinnerProps {
  ariaLabel?: string;
  centered?: boolean;
  className?: string;
  label?: ReactNode;
  showLabel?: boolean;
  size?: SpinnerSize;
  variant?: SpinnerVariant;
}
