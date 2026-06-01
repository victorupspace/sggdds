import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Toggle } from './Toggle';

describe('Toggle', () => {
  it('renders the label and hint', () => {
    render(<Toggle hint="Hint goes here" label="Toggle Label" />);

    expect(screen.getByText('Toggle Label')).toBeInTheDocument();
    expect(screen.getByText('Hint goes here')).toBeInTheDocument();
  });

  it('renders a native switch control', () => {
    render(<Toggle label="Ativar notificacoes" />);

    expect(screen.getByRole('switch', { name: 'Ativar notificacoes' })).toHaveAttribute(
      'type',
      'checkbox',
    );
  });

  it('associates the hint through aria-describedby', () => {
    render(<Toggle hint="Receba avisos importantes." id="notifications" label="Notificacoes" />);

    const toggle = screen.getByRole('switch', { name: 'Notificacoes' });
    const hint = screen.getByText('Receba avisos importantes.');

    expect(toggle).toHaveAttribute('aria-describedby', hint.id);
    expect(hint.id).toBe('notifications-hint');
  });

  it('is off by default', () => {
    render(<Toggle label="Modo silencioso" />);

    expect(screen.getByRole('switch', { name: 'Modo silencioso' })).not.toBeChecked();
  });

  it('supports default checked state', () => {
    render(<Toggle defaultChecked label="Modo silencioso" />);

    expect(screen.getByRole('switch', { name: 'Modo silencioso' })).toBeChecked();
  });

  it('supports controlled checked state', () => {
    render(<Toggle checked label="Modo silencioso" />);

    expect(screen.getByRole('switch', { name: 'Modo silencioso' })).toBeChecked();
  });

  it('calls onCheckedChange when toggled', () => {
    const handleCheckedChange = vi.fn();

    render(<Toggle label="Ativar recurso" onCheckedChange={handleCheckedChange} />);

    fireEvent.click(screen.getByRole('switch', { name: 'Ativar recurso' }));

    expect(handleCheckedChange).toHaveBeenCalledWith(true);
  });

  it('does not call onCheckedChange when disabled', () => {
    const handleCheckedChange = vi.fn();

    render(<Toggle disabled label="Ativar recurso" onCheckedChange={handleCheckedChange} />);

    fireEvent.click(screen.getByRole('switch', { name: 'Ativar recurso' }));

    expect(screen.getByRole('switch', { name: 'Ativar recurso' })).toBeDisabled();
    expect(handleCheckedChange).not.toHaveBeenCalled();
  });

  it('renders as required', () => {
    render(<Toggle label="Aceitar termos" required />);

    expect(screen.getByRole('switch', { name: 'Aceitar termos' })).toBeRequired();
  });

  it('applies an additional className', () => {
    render(<Toggle className="custom-toggle" label="Ativar recurso" />);

    expect(screen.getByText('Ativar recurso').closest('.ds-toggle')).toHaveClass('custom-toggle');
  });
});
