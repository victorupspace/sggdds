import type { ReactNode } from 'react';

export type AccordionBackground = 'white' | 'inverse';

export interface AccordionProps {
  children?: ReactNode;
  allowMultiple?: boolean;
  defaultExpanded?: string[];
  /**
   * Superfície dos cards conforme o Figma: `white` (card branco com slot
   * cinza) ou `inverse` (card cinza com slot branco).
   */
  background?: AccordionBackground;
  className?: string;
}

export interface AccordionItemProps {
  id: string;
  title: ReactNode;
  children: ReactNode;
  /** Conteúdo à esquerda do título (ex.: Avatar). */
  leading?: ReactNode;
  /** Badge exibida à direita do título, antes da ação. */
  badge?: ReactNode;
  /** Ação (ex.: Button) exibida entre a badge e o chevron. */
  action?: ReactNode;
  disabled?: boolean;
  className?: string;
}
