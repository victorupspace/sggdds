import type { ReactNode } from 'react';

export type ProgressBarMode = 'determinate' | 'indeterminate';

export type ProgressBarSize = 'sm' | 'md';

export type ProgressBarVariant = 'brand' | 'neutral' | 'success' | 'error';

export interface ProgressBarProps {
  ariaLabel?: string;
  barClassName?: string;
  className?: string;
  helperText?: ReactNode;
  icon?: ReactNode;
  id?: string;
  label?: ReactNode;
  max?: number;
  min?: number;
  mode?: ProgressBarMode;
  showIcon?: boolean;
  showValue?: boolean;
  size?: ProgressBarSize;
  value?: number;
  valueLabel?: ReactNode;
  variant?: ProgressBarVariant;
}
