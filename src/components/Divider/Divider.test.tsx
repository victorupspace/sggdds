import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Divider } from './Divider';

describe('Divider', () => {
  it('renders as decorative by default', () => {
    const { container } = render(<Divider />);
    const divider = container.querySelector('.ds-divider');

    expect(divider).toHaveAttribute('aria-hidden', 'true');
    expect(divider).not.toHaveAttribute('role');
  });

  it('renders an accessible separator when decorative is false', () => {
    render(<Divider decorative={false} />);

    expect(screen.getByRole('separator')).toHaveAttribute('aria-orientation', 'horizontal');
  });

  it('supports vertical orientation', () => {
    render(<Divider ariaLabel="Separador lateral" decorative={false} orientation="vertical" />);

    const divider = screen.getByRole('separator', { name: 'Separador lateral' });

    expect(divider).toHaveAttribute('aria-orientation', 'vertical');
    expect(divider).toHaveClass('ds-divider--orientation-vertical');
  });

  it('applies tone and thickness classes', () => {
    const { container } = render(<Divider thickness="lg" tone="strong" />);
    const divider = container.querySelector('.ds-divider');

    expect(divider).toHaveClass('ds-divider--tone-strong');
    expect(divider).toHaveClass('ds-divider--thickness-lg');
  });
});
