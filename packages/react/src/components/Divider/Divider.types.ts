import type { ReactNode } from 'react';

export type DividerOrientation = 'horizontal' | 'vertical';

/** Estilo da linha, equivalente à propriedade `style` do componente no Figma. */
export type DividerTone = 'default' | 'darker' | 'subtle';

export interface DividerProps {
  ariaLabel?: string;
  className?: string;
  decorative?: boolean;
  /** Texto opcional entre as linhas (`showLabel`/`label` no Figma, ex.: "Ou"). */
  label?: ReactNode;
  orientation?: DividerOrientation;
  tone?: DividerTone;
}
