import type { AnchorHTMLAttributes, HTMLAttributes, MouseEvent, ReactNode } from 'react';

export type ListItemDensity = 'comfortable' | 'compact';

export type ListItemLine = 'one-line' | 'two-line';

export type ListItemRadius = 'none' | 'sm' | 'md';

export type ListItemClickEvent = MouseEvent<HTMLAnchorElement> | MouseEvent<HTMLButtonElement>;

export interface ListItemProps
  extends Omit<HTMLAttributes<HTMLLIElement>, 'children' | 'onClick' | 'title'> {
  ariaLabel?: string;
  description?: ReactNode;
  density?: ListItemDensity;
  disabled?: boolean;
  divider?: boolean;
  href?: string;
  leading?: ReactNode;
  line?: ListItemLine;
  onClick?: (event: ListItemClickEvent) => void;
  radius?: ListItemRadius;
  rel?: AnchorHTMLAttributes<HTMLAnchorElement>['rel'];
  selected?: boolean;
  target?: AnchorHTMLAttributes<HTMLAnchorElement>['target'];
  title: ReactNode;
  trailing?: ReactNode;
}
