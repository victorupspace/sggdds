import type { ChangeEvent, ChangeEventHandler, InputHTMLAttributes, ReactNode } from 'react';

export type TextInputState = 'default' | 'error';

export type TextInputSize = 'medium' | 'large';

export type TextInputType = 'email' | 'password' | 'search' | 'tel' | 'text' | 'url';

export interface TextInputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'children' | 'className' | 'onChange' | 'size' | 'type'
> {
  label: string;
  helperText?: string;
  errorText?: string;
  state?: TextInputState;
  size?: TextInputSize;
  type?: TextInputType;
  iconStart?: ReactNode;
  iconEnd?: ReactNode;
  className?: string;
  inputClassName?: string;
  fullWidth?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onValueChange?: (value: string, event: ChangeEvent<HTMLInputElement>) => void;
}
