export type DividerOrientation = 'horizontal' | 'vertical';
export type DividerThickness = 'sm' | 'md' | 'lg';
export type DividerTone = 'subtle' | 'default' | 'strong';

export interface DividerProps {
  ariaLabel?: string;
  className?: string;
  decorative?: boolean;
  orientation?: DividerOrientation;
  thickness?: DividerThickness;
  tone?: DividerTone;
}
