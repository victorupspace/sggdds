import type { MouseEventHandler, ReactNode } from 'react';

/**
 * Visual treatment do Hero.
 * - `light`: superfície clara, conteúdo em soft-black.
 * - `dark`: superfície soft-black, conteúdo em branco.
 * - `image`: @deprecated — equivalente a `variant="dark"` + `mediaAspectRatio="1/1"`.
 */
export type HeroVariant = 'light' | 'dark' | 'image';

export type HeroMediaPosition = 'start' | 'end';

export type HeroHeadingLevel = 1 | 2 | 3;

export type HeroMediaAspectRatio = '1/1' | '4/3' | '3/2' | '16/9';

export interface HeroAction {
  ariaLabel?: string;
  disabled?: boolean;
  href?: string;
  iconEnd?: ReactNode;
  iconStart?: ReactNode;
  label: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  rel?: string;
  target?: string;
}

export interface HeroImage {
  alt: string;
  sizes?: string;
  src: string;
  srcSet?: string;
}

export interface HeroProps {
  /** Ação principal renderizada como Button primary. */
  action?: HeroAction;
  /** Nome acessível opcional do `<section>`. Use quando a página tiver múltiplos Heros. */
  ariaLabel?: string;
  /** Slot livre entre a descrição e as ações. */
  children?: ReactNode;
  className?: string;
  /** Texto de apoio abaixo do título. */
  description?: ReactNode;
  /** Texto curto opcional acima do título (eyebrow / categoria). */
  eyebrow?: ReactNode;
  /** Nível semântico do título. Default `1`. */
  headingLevel?: HeroHeadingLevel;
  /** Imagem responsiva. Ignorado quando `media` é informado. */
  image?: HeroImage;
  /** Slot de mídia customizada (ilustração, vídeo, componente). Sobrescreve `image`. */
  media?: ReactNode;
  /** Proporção da mídia. Default `3/2` (`1/1` quando `variant="image"`). */
  mediaAspectRatio?: HeroMediaAspectRatio;
  /** Posição da mídia em desktop. Mobile sempre empilha abaixo do conteúdo. */
  mediaPosition?: HeroMediaPosition;
  /** Ação secundária renderizada como Button tertiary. */
  secondaryAction?: HeroAction;
  /** Título principal. */
  title: ReactNode;
  /** Variant visual. Default `light`. */
  variant?: HeroVariant;
}
