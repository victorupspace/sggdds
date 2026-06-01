import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { ButtonGov } from './ButtonGov';

describe('ButtonGov', () => {
  it('renders the default gov.br label', () => {
    render(<ButtonGov />);

    expect(screen.getByRole('button', { name: 'Entrar com o gov.br' })).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const onClick = vi.fn();

    render(<ButtonGov onClick={onClick} />);

    fireEvent.click(screen.getByRole('button', { name: 'Entrar com o gov.br' }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renders as link when href is provided', () => {
    render(<ButtonGov href="#govbr" />);

    expect(screen.getByRole('link', { name: 'Entrar com o gov.br' })).toHaveAttribute(
      'href',
      '#govbr',
    );
  });

  it('prevents interaction when disabled as link', () => {
    const onClick = vi.fn();

    render(<ButtonGov disabled href="#govbr" onClick={onClick} />);

    const link = screen.getByRole('link', { name: 'Entrar com o gov.br' });
    fireEvent.click(link);

    expect(link).toHaveAttribute('aria-disabled', 'true');
    expect(onClick).not.toHaveBeenCalled();
  });

  it('renders loading state accessibly', () => {
    render(<ButtonGov isLoading loadingLabel="Entrando" />);

    expect(screen.getByRole('button', { name: 'Entrando' })).toHaveAttribute('aria-busy', 'true');
    expect(screen.getByRole('button', { name: 'Entrando' })).toBeDisabled();
  });
});
