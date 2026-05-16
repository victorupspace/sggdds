import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Button } from './Button';

const icon = (
  <svg data-testid="button-icon" viewBox="0 0 20 20">
    <path d="M5 10h10" />
  </svg>
);

describe('Button', () => {
  it('renders as a native button by default', () => {
    render(<Button>Button</Button>);

    expect(screen.getByRole('button', { name: 'Button' })).toHaveClass('ds-button');
  });

  it('renders primary variant by default', () => {
    render(<Button>Button</Button>);

    expect(screen.getByRole('button', { name: 'Button' })).toHaveClass(
      'ds-button--variant-primary',
    );
  });

  it('renders secondary variant', () => {
    render(<Button variant="secondary">Button</Button>);

    expect(screen.getByRole('button', { name: 'Button' })).toHaveClass(
      'ds-button--variant-secondary',
    );
  });

  it('renders start and end icons as decorative content', () => {
    render(
      <Button iconEnd={icon} iconStart={icon}>
        Button
      </Button>,
    );

    expect(screen.getAllByTestId('button-icon')).toHaveLength(2);
    expect(screen.getAllByTestId('button-icon')[0].parentElement).toHaveAttribute(
      'aria-hidden',
      'true',
    );
  });

  it('calls onClick when activated', () => {
    const onClick = vi.fn();

    render(<Button onClick={onClick}>Button</Button>);

    fireEvent.click(screen.getByRole('button', { name: 'Button' }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', () => {
    const onClick = vi.fn();

    render(
      <Button disabled onClick={onClick}>
        Button
      </Button>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Button' }));

    expect(onClick).not.toHaveBeenCalled();
    expect(screen.getByRole('button', { name: 'Button' })).toBeDisabled();
  });

  it('renders as a link when href is provided', () => {
    render(<Button href="#target">Abrir</Button>);

    expect(screen.getByRole('link', { name: 'Abrir' })).toHaveAttribute('href', '#target');
  });

  it('disables link interaction accessibly', () => {
    render(
      <Button disabled href="#target">
        Abrir
      </Button>,
    );

    const link = screen.getByRole('link', { name: 'Abrir' });

    expect(link).toHaveAttribute('aria-disabled', 'true');
    expect(link).toHaveAttribute('tabIndex', '-1');
    expect(link).toHaveAttribute('href', '#target');
  });

  it('uses loading state as busy and disabled', () => {
    render(
      <Button isLoading loadingLabel="Enviando">
        Enviar
      </Button>,
    );

    expect(screen.getByRole('button', { name: 'Enviando' })).toHaveAttribute('aria-busy', 'true');
    expect(screen.getByRole('button', { name: 'Enviando' })).toBeDisabled();
  });
});
