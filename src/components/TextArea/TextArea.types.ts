import type { ChangeEvent, ChangeEventHandler, TextareaHTMLAttributes } from 'react';

export type TextAreaState = 'default' | 'error';

export type TextAreaResize = 'none' | 'vertical';

export interface TextAreaProps extends Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  'children' | 'className' | 'onChange'
> {
  label: string;
  helperText?: string;
  errorText?: string;
  state?: TextAreaState;
  resize?: TextAreaResize;
  className?: string;
  textareaClassName?: string;
  fullWidth?: boolean;
  showCounter?: boolean;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  onValueChange?: (value: string, event: ChangeEvent<HTMLTextAreaElement>) => void;
}
