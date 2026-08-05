import type { MouseEventHandler, ReactNode } from 'react';

export type ActionCardHeadingLevel = 2 | 3 | 4 | 5 | 6;

export interface ActionCardProps {
  /** Ícone exibido dentro do círculo preto do cabeçalho. */
  icon?: ReactNode;
  title: string;
  /** Badge opcional exibida entre o cabeçalho e a descrição. */
  badge?: ReactNode;
  description?: string;
  /** Estado Selected do Figma: borda pure-black. */
  selected?: boolean;
  /** Torna o card um botão acionável. */
  onClick?: MouseEventHandler<HTMLElement>;
  /** Torna o card um link; tem precedência sobre onClick. */
  href?: string;
  /** Nível do heading no modo estático (sem onClick/href). */
  headingLevel?: ActionCardHeadingLevel;
  className?: string;
}
