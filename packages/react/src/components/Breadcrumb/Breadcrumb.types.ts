import type { ReactNode } from 'react';

export interface BreadcrumbItem {
  id?: string;
  label: ReactNode;
  href?: string;
  ariaLabel?: string;
  current?: boolean;
  disabled?: boolean;
}

export type BreadcrumbMaxVisibleItems = 4 | 5 | 6 | 7 | 8;

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  ariaLabel?: string;
  className?: string;
  showHome?: boolean;
  homeHref?: string;
  homeLabel?: string;
  maxVisibleItems?: BreadcrumbMaxVisibleItems;
  collapseLabel?: string;
}
