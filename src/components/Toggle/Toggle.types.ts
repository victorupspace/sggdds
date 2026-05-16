export interface ToggleProps {
  id?: string;
  name?: string;
  label: string;
  hint?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  required?: boolean;
  value?: string;
  onCheckedChange?: (checked: boolean) => void;
  className?: string;
}
