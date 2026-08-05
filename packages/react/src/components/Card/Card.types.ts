import type { ReactNode } from 'react';

export type CardHeadingLevel = 2 | 3 | 4 | 5 | 6;

export type CardOrientation = 'vertical' | 'horizontal';

export interface CardProps {
  title: ReactNode;
  /** Texto de apoio abaixo do título (Body/Medium no Figma). */
  description?: ReactNode;
  /** Slot da badge acima do título (componha com o Badge do DS; `showBadge` no Figma). */
  badge?: ReactNode;
  /** Slot de mídia (imagem, vídeo etc.); `showImagePlaceholder` no Figma. */
  media?: ReactNode;
  /** Slot da ação (componha com o Button do DS; `showButton` no Figma). */
  action?: ReactNode;
  /** Linha divisória entre a descrição e a ação (`showDivider` no Figma). */
  showDivider?: boolean;
  headingLevel?: CardHeadingLevel;
  /** `type` no Figma: vertical (mídia no topo) ou horizontal (mídia à esquerda). */
  orientation?: CardOrientation;
  className?: string;
}
