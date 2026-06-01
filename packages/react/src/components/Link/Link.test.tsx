import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Link } from './Link';

const icon = (
  <svg data-testid="link-icon" viewBox="0 0 20 20">
    <path d="M5 10h10" />
  </svg>
);

describe('Link', () => {
  it('renders a native link with href', () => {
    render(<Link href="#target">Link</Link>);

    expect(screen.getByRole('link', { name: 'Link' })).toHaveAttribute('href', '#target');
  });

  it('uses the default variant and medium size', () => {
    render(<Link href="#target">Link</Link>);

    expect(screen.getByRole('link', { name: 'Link' })).toHaveClass('ds-link--variant-default');
    expect(screen.getByRole('link', { name: 'Link' })).toHaveClass('ds-link--size-medium');
  });

  it('renders neutral variant and large size', () => {
    render(
      <Link href="#target" size="large" variant="neutral">
        Link
      </Link>,
    );

    expect(screen.getByRole('link', { name: 'Link' })).toHaveClass('ds-link--variant-neutral');
    expect(screen.getByRole('link', { name: 'Link' })).toHaveClass('ds-link--size-large');
  });

  it('renders decorative start and end icons', () => {
    render(
      <Link href="#target" iconEnd={icon} iconStart={icon}>
        Link
      </Link>,
    );

    expect(screen.getAllByTestId('link-icon')).toHaveLength(2);
    expect(screen.getAllByTestId('link-icon')[0].parentElement).toHaveAttribute(
      'aria-hidden',
      'true',
    );
  });

  it('adds external rel when target blank is used', () => {
    render(
      <Link href="https://example.com" target="_blank">
        External
      </Link>,
    );

    expect(screen.getByRole('link', { name: 'External' })).toHaveAttribute(
      'rel',
      'noopener noreferrer',
    );
  });

  it('calls onClick when activated', () => {
    const onClick = vi.fn();

    render(
      <Link href="#target" onClick={onClick}>
        Link
      </Link>,
    );

    fireEvent.click(screen.getByRole('link', { name: 'Link' }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('blocks click and removes focus order when disabled', () => {
    const onClick = vi.fn();

    render(
      <Link disabled href="#target" onClick={onClick}>
        Link
      </Link>,
    );

    const link = screen.getByRole('link', { name: 'Link' });

    fireEvent.click(link);

    expect(onClick).not.toHaveBeenCalled();
    expect(link).toHaveAttribute('aria-disabled', 'true');
    expect(link).toHaveAttribute('tabIndex', '-1');
  });

  it('supports an accessible label', () => {
    render(
      <Link ariaLabel="Abrir detalhes do protocolo" href="#target">
        Detalhes
      </Link>,
    );

    expect(screen.getByRole('link', { name: 'Abrir detalhes do protocolo' })).toBeInTheDocument();
  });
});
