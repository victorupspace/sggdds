import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Card } from './Card';

const icon = (
  <svg data-testid="card-icon" viewBox="0 0 20 20">
    <path d="M5 10h10" />
  </svg>
);

describe('Card', () => {
  it('renders title, description, badge and actions', () => {
    render(
      <Card
        badge={{ icon, label: 'Badge' }}
        description="Description"
        primaryAction={{ label: 'Primary' }}
        secondaryAction={{ href: '#secondary', label: 'Secondary' }}
        title="Card Title"
      />,
    );

    expect(screen.getByRole('article')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Card Title' })).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByText('Badge')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Primary' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Secondary' })).toHaveAttribute('href', '#secondary');
  });

  it('uses the configured heading level', () => {
    render(<Card headingLevel={2} title="Card Title" />);

    expect(screen.getByRole('heading', { level: 2, name: 'Card Title' })).toBeInTheDocument();
  });

  it('calls the primary action when clicked', () => {
    const onClick = vi.fn();

    render(<Card primaryAction={{ label: 'Primary', onClick }} title="Card Title" />);

    fireEvent.click(screen.getByRole('button', { name: 'Primary' }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('disables button and link actions when the card is disabled', () => {
    render(
      <Card
        disabled
        primaryAction={{ label: 'Primary' }}
        secondaryAction={{ href: '#secondary', label: 'Secondary' }}
        title="Card Title"
      />,
    );

    expect(screen.getByRole('article')).toHaveAttribute('aria-disabled', 'true');
    expect(screen.getByRole('button', { name: 'Primary' })).toBeDisabled();
    expect(screen.getByText('Secondary').closest('a')).toHaveAttribute('aria-disabled', 'true');
    expect(screen.getByText('Secondary').closest('a')).toHaveAttribute('tabIndex', '-1');
  });

  it('applies orientation and tone classes', () => {
    render(<Card orientation="horizontal" title="Card Title" tone="success" />);

    expect(screen.getByRole('article')).toHaveClass('ds-card--orientation-horizontal');
    expect(screen.getByRole('article')).toHaveClass('ds-card--tone-success');
  });

  it('renders custom supporting content', () => {
    render(
      <Card title="Card Title">
        <p>Supporting content</p>
      </Card>,
    );

    expect(screen.getByText('Supporting content')).toBeInTheDocument();
  });
});
