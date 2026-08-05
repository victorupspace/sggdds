import type { ReactNode } from 'react';

export interface BreadcrumbItem {
  id?: string;
  label: ReactNode;
  href?: string;
  ariaLabel?: string;
  current?: boolean;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  ariaLabel?: string;
  className?: string;
  /** Exibe o bloco inicial com o botão de home (`showFirstBlock` no Figma). */
  showHome?: boolean;
  homeHref?: string;
  homeLabel?: string;
}
