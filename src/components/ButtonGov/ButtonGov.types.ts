import type { MouseEventHandler, ReactNode } from 'react';

export interface ButtonGovProps {
  ariaLabel?: string;
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
  href?: string;
  icon?: ReactNode;
  isLoading?: boolean;
  loadingLabel?: string;
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  rel?: string;
  target?: string;
  type?: 'button' | 'submit' | 'reset';
}
