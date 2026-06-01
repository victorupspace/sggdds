import type { ChangeEvent, ChangeEventHandler, SelectHTMLAttributes } from 'react';

export type DropdownState = 'default' | 'error';

export type DropdownSize = 'medium' | 'large';

export interface DropdownOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface DropdownProps extends Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  'children' | 'className' | 'defaultValue' | 'multiple' | 'onChange' | 'size' | 'value'
> {
  label: string;
  options: DropdownOption[];
  placeholder?: string;
  helperText?: string;
  errorText?: string;
  state?: DropdownState;
  size?: DropdownSize;
  className?: string;
  selectClassName?: string;
  fullWidth?: boolean;
  defaultValue?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
  onValueChange?: (value: string, event: ChangeEvent<HTMLSelectElement>) => void;
}
