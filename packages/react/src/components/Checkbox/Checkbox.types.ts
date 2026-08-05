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
  /** Estado somente leitura (`Ready Only` no Figma): exibe o valor sem permitir alteração. */
  readOnly?: boolean;
  required?: boolean;
  value?: string;
  onCheckedChange?: (checked: boolean) => void;
  className?: string;
}
