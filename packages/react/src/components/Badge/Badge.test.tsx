import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Badge } from './Badge';

const icon = (
  <svg data-testid="badge-icon" viewBox="0 0 14 14">
    <path d="M2.5 11.5 11.5 2.5" />
  </svg>
);

describe('Badge', () => {
  it('renders the children content', () => {
    render(<Badge>Label</Badge>);

    expect(screen.getByText('Label')).toBeInTheDocument();
  });

  it('applies the default variant, appearance and size from Figma', () => {
    render(<Badge>Label</Badge>);

    const badge = screen.getByText('Label').closest('.ds-badge');
    expect(badge).toHaveClass('ds-badge--variant-brand');
    expect(badge).toHaveClass('ds-badge--appearance-solid');
    expect(badge).toHaveClass('ds-badge--size-small');
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

  it('does not render an icon by default', () => {
    render(<Badge>Sem icone</Badge>);

    const badge = screen.getByText('Sem icone').closest('.ds-badge');
    expect(badge?.querySelector('.ds-badge__icon')).not.toBeInTheDocument();
  });

  it('renders the default percent icon with showIcon', () => {
    render(<Badge showIcon>Label</Badge>);

    const badge = screen.getByText('Label').closest('.ds-badge');
    expect(badge?.querySelector('.ds-badge__icon svg')).toBeInTheDocument();
  });

  it('renders a custom icon through the Icon Swap slot', () => {
    render(<Badge icon={icon}>Label</Badge>);

    expect(screen.getByTestId('badge-icon')).toBeInTheDocument();
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
