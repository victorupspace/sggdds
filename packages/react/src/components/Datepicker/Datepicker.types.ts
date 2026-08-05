import type { InputHTMLAttributes } from 'react';

export type DatepickerMode = 'single' | 'range';

export type DatepickerState = 'default' | 'error' | 'success';

/** Superfície do componente (`background` no Figma): white ou inverse. */
export type DatepickerBackground = 'white' | 'inverse';

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
  /** `selection` no Figma: Single (um campo) ou Period (dois campos com "até"). */
  mode?: DatepickerMode;
  background?: DatepickerBackground;
  state?: DatepickerState;
  helperText?: string;
  errorText?: string;
  successText?: string;
  minDate?: string;
  maxDate?: string;
  defaultMonth?: string;
  /** Exibe a área de botões Cancelar/Confirmar (`showButtonArea` no Figma). */
  showFooter?: boolean;
  className?: string;
  inputClassName?: string;
  fullWidth?: boolean;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onValueChange?: (value: string) => void;
  onRangeValueChange?: (value: DatepickerRangeValue) => void;
}
