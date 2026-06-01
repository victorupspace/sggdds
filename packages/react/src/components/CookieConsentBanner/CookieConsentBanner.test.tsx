import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { CookieConsentBanner } from './CookieConsentBanner';

describe('CookieConsentBanner', () => {
  it('renders default Portuguese content and actions', () => {
    render(<CookieConsentBanner />);

    expect(
      screen.getByRole('region', { name: 'Aviso de consentimento de cookies' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        name: 'Estamos usando cookies para melhorar sua experiência!',
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Política de Cookies' })).toHaveAttribute(
      'href',
      '#politica-de-cookies',
    );
    expect(screen.getByRole('button', { name: 'Permitir todos' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Gerenciar cookies' })).toBeInTheDocument();
  });

  it('closes by default when allowing all cookies', () => {
    const onAllowAll = vi.fn();
    const onOpenChange = vi.fn();

    render(<CookieConsentBanner onAllowAll={onAllowAll} onOpenChange={onOpenChange} />);

    fireEvent.click(screen.getByRole('button', { name: 'Permitir todos' }));

    expect(onAllowAll).toHaveBeenCalledTimes(1);
    expect(onOpenChange).toHaveBeenCalledWith(false);
    expect(screen.queryByRole('region', { name: 'Aviso de consentimento de cookies' })).toBeNull();
  });

  it('keeps the banner open when managing cookies by default', () => {
    const onManageCookies = vi.fn();

    render(<CookieConsentBanner onManageCookies={onManageCookies} />);

    fireEvent.click(screen.getByRole('button', { name: 'Gerenciar cookies' }));

    expect(onManageCookies).toHaveBeenCalledTimes(1);
    expect(
      screen.getByRole('region', { name: 'Aviso de consentimento de cookies' }),
    ).toBeInTheDocument();
  });

  it('supports controlled visibility', () => {
    const onOpenChange = vi.fn();

    render(<CookieConsentBanner isOpen onOpenChange={onOpenChange} />);

    fireEvent.click(screen.getByRole('button', { name: 'Permitir todos' }));

    expect(onOpenChange).toHaveBeenCalledWith(false);
    expect(
      screen.getByRole('region', { name: 'Aviso de consentimento de cookies' }),
    ).toBeInTheDocument();
  });

  it('renders manage cookies as a link when href is provided', () => {
    render(<CookieConsentBanner manageCookiesHref="#preferencias" />);

    expect(screen.getByRole('link', { name: 'Gerenciar cookies' })).toHaveAttribute(
      'href',
      '#preferencias',
    );
  });
});
