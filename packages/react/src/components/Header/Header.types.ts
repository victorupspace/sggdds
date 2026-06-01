import type { MouseEventHandler, ReactNode } from 'react';

export interface HeaderNavigationItem {
  label: string;
  href?: string;
  current?: boolean;
  children?: HeaderNavigationItem[];
}

export interface HeaderUtilityItem {
  label: string;
  href?: string;
  icon?: ReactNode;
  onClick?: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
}

export interface HeaderAction {
  label: string;
  href?: string;
  icon?: ReactNode;
  onClick?: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
}

export interface HeaderProps {
  primaryLogo?: ReactNode;
  primaryLogoHref?: string;
  primaryLogoAriaLabel?: string;
  secondaryLogo?: ReactNode;
  secondaryLogoHref?: string;
  secondaryLogoAriaLabel?: string;
  navigationItems?: HeaderNavigationItem[];
  utilityItems?: HeaderUtilityItem[];
  accountAction?: HeaderAction | null;
  className?: string;
  navAriaLabel?: string;
  menuButtonLabel?: string;
  defaultMenuOpen?: boolean;
  menuOpen?: boolean;
  onMenuOpenChange?: (open: boolean) => void;
}
