import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Badge } from './Badge';

const icon = (
  <svg data-testid="badge-icon" viewBox="0 0 20 20">
    <path d="M4.5 15.5 15.5 4.5" />
  </svg>
);

describe('Badge', () => {
  it('renders the children content', () => {
    render(<Badge>Label</Badge>);

    expect(screen.getByText('Label')).toBeInTheDocument();
  });

  it('applies the default variant', () => {
    render(<Badge>Label</Badge>);

    expect(screen.getByText('Label').closest('.ds-badge')).toHaveClass('ds-badge--variant-brand');
  });

  it('applies the default appearance', () => {
    render(<Badge>Label</Badge>);

    expect(screen.getByText('Label').closest('.ds-badge')).toHaveClass(
      'ds-badge--appearance-solid',
    );
  });

  it('applies the default size', () => {
    render(<Badge>Label</Badge>);

    expect(screen.getByText('Label').closest('.ds-badge')).toHaveClass('ds-badge--size-medium');
  });

  it('renders the positive variant', () => {
    render(<Badge variant="positive">Ativo</Badge>);

    expect(screen.getByText('Ativo').closest('.ds-badge')).toHaveClass(
      'ds-badge--variant-positive',
    );
  });

  it('renders the subtle appearance', () => {
    render(<Badge appearance="subtle">Ativo</Badge>);

    expect(screen.getByText('Ativo').closest('.ds-badge')).toHaveClass(
      'ds-badge--appearance-subtle',
    );
  });

  it('renders the large size', () => {
    render(<Badge size="large">Destaque</Badge>);

    expect(screen.getByText('Destaque').closest('.ds-badge')).toHaveClass('ds-badge--size-large');
  });

  it('renders with an icon', () => {
    render(<Badge icon={icon}>Label</Badge>);

    expect(screen.getByTestId('badge-icon')).toBeInTheDocument();
  });

  it('renders the icon at the end', () => {
    render(
      <Badge icon={icon} iconPosition="end">
        Desconto
      </Badge>,
    );

    const badge = screen.getByText('Desconto').closest('.ds-badge');

    expect(badge?.lastElementChild).toHaveClass('ds-badge__icon');
  });

  it('renders without an icon', () => {
    render(<Badge>Sem icone</Badge>);

    expect(screen.queryByTestId('badge-icon')).not.toBeInTheDocument();
  });

  it('keeps the icon decorative', () => {
    render(<Badge icon={icon}>Label</Badge>);

    const badge = screen.getByText('Label').closest('.ds-badge');
    const iconWrapper = within(badge as HTMLElement).getByTestId('badge-icon').parentElement;

    expect(iconWrapper).toHaveAttribute('aria-hidden', 'true');
  });

  it('applies an additional className', () => {
    render(<Badge className="custom-badge">Label</Badge>);

    expect(screen.getByText('Label').closest('.ds-badge')).toHaveClass('custom-badge');
  });

  it('renders a long label without losing accessible text', () => {
    render(<Badge>Etiqueta complementar com texto maior</Badge>);

    expect(screen.getByText('Etiqueta complementar com texto maior')).toBeInTheDocument();
  });
});
