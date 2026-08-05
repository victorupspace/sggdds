import type { ReactNode } from 'react';

/**
 * `type` no Figma: `default` (conteúdo à esquerda com slot à direita) ou
 * `center` (coluna única centralizada, com o slot abaixo).
 */
export type HeroVariant = 'default' | 'center';

export type HeroHeadingLevel = 1 | 2 | 3;

export interface HeroProps {
  /** Título principal (H1 por padrão). Mantenha conciso: até 8 palavras. */
  title: ReactNode;
  /** Descrição principal (`Show Hero Body Text` no Figma). Até 2 linhas. */
  description?: ReactNode;
  /** Segunda descrição opcional (`Show Hero Second Body` no Figma). */
  secondDescription?: ReactNode;
  /** Slot da badge acima do título (componha com o Badge do DS; `Show Badge` no Figma). */
  badge?: ReactNode;
  /** Slot dos CTAs (componha com o Button do DS; máximo de 2, um primário e um secundário). */
  actions?: ReactNode;
  /** Slot Right content: imagens, ilustrações ou componentes complementares. */
  children?: ReactNode;
  variant?: HeroVariant;
  headingLevel?: HeroHeadingLevel;
  /** Nome acessível opcional do `<section>`. */
  ariaLabel?: string;
  className?: string;
}
