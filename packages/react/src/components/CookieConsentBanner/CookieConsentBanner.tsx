import './CookieConsentBanner.styles.css';

import { useCallback, useState } from 'react';

import { Button } from '../Button';
import type { CookieConsentBannerProps } from './CookieConsentBanner.types';

function CookieIcon() {
  return (
    <span className="ds-cookie-consent__material-symbol" aria-hidden="true">
      cookie
    </span>
  );
}

export function CookieConsentBanner({
  allowAllLabel = 'Permitir todos',
  ariaLabel = 'Aviso de consentimento de cookies',
  children,
  className,
  closeOnAllowAll = true,
  closeOnManageCookies = false,
  defaultOpen = true,
  icon,
  isOpen,
  manageCookiesHref,
  manageCookiesLabel = 'Gerenciar cookies',
  onAllowAll,
  onManageCookies,
  onOpenChange,
  policyHref = '#politica-de-cookies',
  policyLabel = 'Política de Cookies',
  position = 'bottom',
  title = 'Estamos usando cookies para melhorar sua experiência!',
}: CookieConsentBannerProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const currentOpen = isOpen ?? uncontrolledOpen;
  const isControlled = isOpen !== undefined;
  const rootClassName = ['ds-cookie-consent', `ds-cookie-consent--position-${position}`, className]
    .filter(Boolean)
    .join(' ');

  const requestClose = useCallback(() => {
    if (!isControlled) {
      setUncontrolledOpen(false);
    }

    onOpenChange?.(false);
  }, [isControlled, onOpenChange]);

  if (!currentOpen) {
    return null;
  }

  return (
    <section aria-label={ariaLabel} className={rootClassName} role="region">
      <span className="ds-cookie-consent__icon" aria-hidden="true">
        {icon ?? <CookieIcon />}
      </span>

      <div className="ds-cookie-consent__content">
        <h2 className="ds-cookie-consent__title">{title}</h2>

        <div className="ds-cookie-consent__description">
          {children ?? (
            <p>
              Ao clicar em “Permitir todos”, você concorda com o uso de todos os cookies. Visite
              nossa{' '}
              <a className="ds-cookie-consent__policy-link" href={policyHref}>
                {policyLabel}
              </a>{' '}
              para saber mais.
            </p>
          )}
        </div>

        <div className="ds-cookie-consent__actions">
          <Button
            className="ds-cookie-consent__button ds-cookie-consent__button--allow"
            onClick={(event) => {
              onAllowAll?.(event);

              if (!event.defaultPrevented && closeOnAllowAll) {
                requestClose();
              }
            }}
            size="large"
            variant="primary"
          >
            {allowAllLabel}
          </Button>

          <Button
            className="ds-cookie-consent__button ds-cookie-consent__button--manage"
            href={manageCookiesHref}
            onClick={(event) => {
              onManageCookies?.(event);

              if (!event.defaultPrevented && closeOnManageCookies) {
                requestClose();
              }
            }}
            size="large"
            variant="primary"
          >
            {manageCookiesLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}
