import type { InputHTMLAttributes } from 'react';

export type DatepickerMode = 'single' | 'range';

export type DatepickerState = 'default' | 'error' | 'success';

export interface DatepickerRangeValue {
  start?: string;
  end?: string;
}

export interface DatepickerProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'children' | 'className' | 'defaultValue' | 'onChange' | 'type' | 'value'
> {
  label: string;
  value?: string;
  defaultValue?: string;
  rangeValue?: DatepickerRangeValue;
  defaultRangeValue?: DatepickerRangeValue;
  mode?: DatepickerMode;
  state?: DatepickerState;
  helperText?: string;
  errorText?: string;
  successText?: string;
  minDate?: string;
  maxDate?: string;
  defaultMonth?: string;
  showTime?: boolean;
  timeValue?: string;
  defaultTimeValue?: string;
  showFooter?: boolean;
  className?: string;
  inputClassName?: string;
  fullWidth?: boolean;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onValueChange?: (value: string) => void;
  onRangeValueChange?: (value: DatepickerRangeValue) => void;
  onTimeValueChange?: (value: string) => void;
}
