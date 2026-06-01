export type CheckboxState = 'unchecked' | 'checked' | 'indeterminate';

export interface CheckboxProps {
  id?: string;
  name?: string;
  label: string;
  hint?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  required?: boolean;
  value?: string;
  onCheckedChange?: (checked: boolean) => void;
  className?: string;
}
