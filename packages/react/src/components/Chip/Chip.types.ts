import type { MouseEventHandler, ReactNode } from 'react';

export type ChipVariant = 'support' | 'action' | 'information' | 'success' | 'warning' | 'danger';

export interface ChipProps {
  children: ReactNode;
  /** Tipo do Chip, equivalente à propriedade `type` do componente no Figma. */
  variant?: ChipVariant;
  /** Estado Selected do Figma (borda de 1.5px e fundo de seleção). */
  selected?: boolean;
  /** Estado Disabled do Figma (definido para Support/Action; aplicado a todas as variantes). */
  disabled?: boolean;
  /** Exibe o ícone padrão (help) antes do texto (`showLeadingIcon` no Figma). */
  showLeadingIcon?: boolean;
  /** Substitui o ícone inicial (slot Leading Icon). Implica exibição. */
  leadingIcon?: ReactNode;
  /** Exibe o ícone padrão (help) após o texto (`showTrailingIcon` no Figma). */
  showTrailingIcon?: boolean;
  /** Substitui o ícone final (slot Trailing Icon). Implica exibição. */
  trailingIcon?: ReactNode;
  /** Torna o Chip interativo (renderiza um botão com estados hover/pressed). */
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}
