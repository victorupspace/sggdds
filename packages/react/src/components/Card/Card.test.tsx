import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Card } from './Card';

describe('Card', () => {
  it('renders title, description, badge, media and action slots', () => {
    render(
      <Card
        action={<button type="button">Action</button>}
        badge={<span>Badge</span>}
        description="Description"
        media={<img alt="" src="placeholder.png" />}
        title="Card title"
      />,
    );

    expect(screen.getByRole('article')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Card title' })).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByText('Badge')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument();
  });

  it('uses the configured heading level', () => {
    render(<Card headingLevel={2} title="Card title" />);

    expect(screen.getByRole('heading', { level: 2, name: 'Card title' })).toBeInTheDocument();
  });

  it('keeps the title bar decorative', () => {
    const { container } = render(<Card title="Card title" />);

    expect(container.querySelector('.ds-card__title-bar')).toHaveAttribute('aria-hidden', 'true');
  });

  it('renders the divider by default and hides it with showDivider={false}', () => {
    const { container, rerender } = render(<Card title="Card title" />);

    expect(container.querySelector('.ds-card__divider')).toBeInTheDocument();

    rerender(<Card showDivider={false} title="Card title" />);

    expect(container.querySelector('.ds-card__divider')).not.toBeInTheDocument();
  });

  it('applies the orientation class', () => {
    render(<Card orientation="horizontal" title="Card title" />);

    expect(screen.getByRole('article')).toHaveClass('ds-card--orientation-horizontal');
  });

  it('forwards interaction to the action slot', () => {
    const onClick = vi.fn();

    render(
      <Card
        action={
          <button onClick={onClick} type="button">
            Action
          </button>
        }
        title="Card title"
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Action' }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
