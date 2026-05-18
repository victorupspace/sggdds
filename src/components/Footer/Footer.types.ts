import type { MouseEventHandler, ReactNode } from 'react';

export interface FooterLink {
  label: string;
  href?: string;
  ariaLabel?: string;
  current?: boolean;
  disabled?: boolean;
  external?: boolean;
  onClick?: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
  defaultOpen?: boolean;
}

export interface FooterSocialItem {
  label: string;
  href?: string;
  ariaLabel?: string;
  icon?: ReactNode;
  external?: boolean;
  onClick?: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
}

export interface FooterProps {
  brand?: ReactNode | null;
  brandHref?: string;
  brandAriaLabel?: string;
  className?: string;
  copyright?: ReactNode;
  legalLinks?: FooterLink[];
  navAriaLabel?: string;
  sections?: FooterSection[];
  socialAriaLabel?: string;
  socialItems?: FooterSocialItem[];
}
