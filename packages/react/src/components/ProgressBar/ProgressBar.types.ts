import type { ReactNode } from 'react';

export type ProgressBarMode = 'determinate' | 'indeterminate';

export type ProgressBarVariant = 'default' | 'success' | 'error' | 'information' | 'warning';

export interface ProgressBarProps {
  ariaLabel?: string;
  className?: string;
  helperText?: ReactNode;
  id?: string;
  label?: ReactNode;
  max?: number;
  min?: number;
  mode?: ProgressBarMode;
  showValue?: boolean;
  value?: number;
  valueLabel?: ReactNode;
  variant?: ProgressBarVariant;
}
