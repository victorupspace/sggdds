import type { MouseEventHandler, ReactNode } from 'react';

export type CookieConsentBannerPosition = 'bottom' | 'bottom-left' | 'bottom-right';

export interface CookieConsentBannerProps {
  allowAllLabel?: string;
  ariaLabel?: string;
  children?: ReactNode;
  className?: string;
  closeOnAllowAll?: boolean;
  closeOnManageCookies?: boolean;
  defaultOpen?: boolean;
  icon?: ReactNode;
  isOpen?: boolean;
  manageCookiesHref?: string;
  manageCookiesLabel?: string;
  onAllowAll?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  onManageCookies?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  onOpenChange?: (isOpen: boolean) => void;
  policyHref?: string;
  policyLabel?: string;
  position?: CookieConsentBannerPosition;
  title?: ReactNode;
}
