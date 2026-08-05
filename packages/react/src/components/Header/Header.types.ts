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

export interface HeaderUserMenuItem {
  label: string;
  href?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
}

/** Conta logada (`account=Logged in` no Figma): exibe o User Menu no lugar do botão gov.br. */
export interface HeaderUser {
  name: string;
  /** Slot do avatar; por padrão compõe o Avatar do DS com as iniciais do nome. */
  avatar?: ReactNode;
  menuItems?: HeaderUserMenuItem[];
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
  /** Ação de conta deslogada (`account=Logout` no Figma): botão gov.br. */
  accountAction?: HeaderAction | null;
  /** Usuário logado; quando presente substitui o accountAction pelo User Menu. */
  user?: HeaderUser | null;
  className?: string;
  navAriaLabel?: string;
  menuButtonLabel?: string;
  defaultMenuOpen?: boolean;
  menuOpen?: boolean;
  onMenuOpenChange?: (open: boolean) => void;
}
