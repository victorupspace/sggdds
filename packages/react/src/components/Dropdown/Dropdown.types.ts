export type DropdownState = 'default' | 'error';

export interface DropdownOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface DropdownProps {
  label: string;
  options: DropdownOption[];
  /** Texto exibido sem seleção ("Selecione" no Figma). */
  placeholder?: string;
  helperText?: string;
  errorText?: string;
  state?: DropdownState;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  fullWidth?: boolean;
  value?: string;
  defaultValue?: string;
  defaultOpen?: boolean;
  id?: string;
  onValueChange?: (value: string) => void;
}
