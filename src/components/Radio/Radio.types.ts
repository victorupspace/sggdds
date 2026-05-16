export interface RadioProps {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
  className?: string;
  /* injected by RadioGroup — not part of the public API */
  _checked?: boolean;
  _name?: string;
  _onChange?: (value: string) => void;
}

export type RadioGroupOrientation = 'vertical' | 'horizontal';

export interface RadioGroupProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
  orientation?: RadioGroupOrientation;
  label?: string;
  children: React.ReactNode;
  className?: string;
}
