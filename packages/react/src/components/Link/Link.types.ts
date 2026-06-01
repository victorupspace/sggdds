import type { MouseEventHandler, ReactNode } from 'react';

export type LinkVariant = 'default' | 'neutral' | 'inverse';

export type LinkSize = 'small' | 'medium' | 'large';

export interface LinkProps {
  children: ReactNode;
  href: string;
  variant?: LinkVariant;
  size?: LinkSize;
  iconStart?: ReactNode;
  iconEnd?: ReactNode;
  showExternalIcon?: boolean;
  external?: boolean;
  target?: string;
  rel?: string;
  disabled?: boolean;
  ariaLabel?: string;
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}
