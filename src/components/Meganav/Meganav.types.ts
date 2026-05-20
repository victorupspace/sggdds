import type { MouseEventHandler, ReactNode } from 'react';

export type MeganavIcon = ReactNode | string;

export type MeganavTriggerVariant = 'button' | 'navigation';

export type MeganavAlign = 'start' | 'end' | 'stretch';

export interface MeganavItem {
  label: string;
  href?: string;
  description?: string;
  icon?: MeganavIcon;
  current?: boolean;
  children?: MeganavItem[];
  items?: MeganavItem[];
  rel?: string;
  target?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
}

export interface MeganavFeaturedAction {
  label: string;
  href?: string;
  rel?: string;
  target?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
}

export interface MeganavFeatured {
  title: string;
  description?: string;
  eyebrow?: string;
  href?: string;
  imageAlt?: string;
  imageSrc?: string;
  mediaIcon?: MeganavIcon;
  actions?: MeganavFeaturedAction[];
}

export interface MeganavProps {
  items?: MeganavItem[];
  align?: MeganavAlign;
  ariaLabel?: string;
  className?: string;
  closeLabel?: string;
  defaultOpen?: boolean;
  drawerClassName?: string;
  featured?: MeganavFeatured;
  mobileTitle?: string;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
  triggerAriaLabel?: string;
  triggerIcon?: MeganavIcon;
  triggerLabel?: string;
  triggerVariant?: MeganavTriggerVariant;
}
