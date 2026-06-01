import type { ReactElement, ReactNode } from 'react';

export type TooltipPlacement = 'top' | 'right' | 'bottom' | 'left';

export type TooltipTone = 'dark' | 'light';

export interface TooltipProps {
  children: ReactElement<Record<string, unknown>>;
  content: ReactNode;
  className?: string;
  tooltipClassName?: string;
  id?: string;
  placement?: TooltipPlacement;
  tone?: TooltipTone;
  disabled?: boolean;
  isOpen?: boolean;
  defaultOpen?: boolean;
  delayDuration?: number;
  closeDelay?: number;
  onOpenChange?: (isOpen: boolean) => void;
}
