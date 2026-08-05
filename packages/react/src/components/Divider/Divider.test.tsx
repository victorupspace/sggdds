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

  it('applies the tone class', () => {
    const { container } = render(<Divider tone="darker" />);

    expect(container.querySelector('.ds-divider')).toHaveClass('ds-divider--tone-darker');
  });

  it('renders a readable label between two lines', () => {
    const { container } = render(<Divider label="Ou" />);

    expect(screen.getByText('Ou')).toBeInTheDocument();
    expect(container.querySelectorAll('.ds-divider__line')).toHaveLength(2);
    expect(container.querySelector('.ds-divider')).not.toHaveAttribute('aria-hidden');
    expect(screen.getByRole('separator')).toBeInTheDocument();
  });
});
