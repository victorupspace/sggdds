import type { MouseEventHandler } from 'react';

export type BackToTopPosition = 'right' | 'left';
export type BackToTopScrollBehavior = 'auto' | 'smooth';

export interface BackToTopProps {
  ariaLabel?: string;
  className?: string;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  position?: BackToTopPosition;
  scrollBehavior?: BackToTopScrollBehavior;
  target?: HTMLElement | Window | null;
  threshold?: number;
  visible?: boolean;
}
