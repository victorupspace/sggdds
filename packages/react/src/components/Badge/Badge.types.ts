import type { ReactNode } from 'react';

export type BadgeVariant = 'brand' | 'neutral' | 'information' | 'positive' | 'negative' | 'notice';

export type BadgeAppearance = 'solid' | 'subtle';

export type BadgeSize = 'small' | 'medium' | 'large';

export interface BadgeProps {
  children: ReactNode;
  /** Tipo do Badge, equivalente à propriedade `type` do componente no Figma. */
  variant?: BadgeVariant;
  /** Estilo visual, equivalente à propriedade `style` do Figma. */
  appearance?: BadgeAppearance;
  size?: BadgeSize;
  /**
   * Exibe o ícone padrão do Figma (percent) antes do texto, equivalente à
   * propriedade booleana `icon` do componente.
   */
  showIcon?: boolean;
  /** Substitui o ícone padrão (slot Icon Swap do Figma). Implica exibição. */
  icon?: ReactNode;
  className?: string;
}
