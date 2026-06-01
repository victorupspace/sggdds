import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { ListItem } from './ListItem';

describe('ListItem', () => {
  it('renders a one-line list item by default', () => {
    render(
      <ul>
        <ListItem title="List item" />
      </ul>,
    );

    const item = screen.getByRole('listitem');

    expect(item).toHaveTextContent('List item');
    expect(item).toHaveClass('ds-list-item--one-line');
  });

  it('renders a two-line item when description is provided', () => {
    render(
      <ul>
        <ListItem description="Secondary text" title="List item title" />
      </ul>,
    );

    const item = screen.getByRole('listitem');

    expect(item).toHaveTextContent('List item title');
    expect(item).toHaveTextContent('Secondary text');
    expect(item).toHaveClass('ds-list-item--two-line');
  });

  it('renders a link when href is provided', () => {
    render(
      <ul>
        <ListItem href="/detalhes" title="Abrir detalhes" />
      </ul>,
    );

    expect(screen.getByRole('link', { name: 'Abrir detalhes' })).toHaveAttribute('href', '/detalhes');
  });

  it('renders a button when onClick is provided', () => {
    const onClick = vi.fn();

    render(
      <ul>
        <ListItem onClick={onClick} title="Selecionar item" />
      </ul>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Selecionar item' }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('disables button interaction', () => {
    const onClick = vi.fn();

    render(
      <ul>
        <ListItem disabled onClick={onClick} title="Indisponivel" />
      </ul>,
    );

    expect(screen.getByRole('button', { name: 'Indisponivel' })).toBeDisabled();
    fireEvent.click(screen.getByRole('button', { name: 'Indisponivel' }));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('removes href and focus when disabled link is rendered', () => {
    render(
      <ul>
        <ListItem disabled href="/detalhes" title="Link indisponivel" />
      </ul>,
    );

    const link = screen.getByText('Link indisponivel').closest('a');

    expect(link).toBeInTheDocument();
    expect(link).not.toHaveAttribute('href');
    expect(link).toHaveAttribute('tabindex', '-1');
  });

  it('exposes selected state', () => {
    render(
      <ul>
        <ListItem selected title="Selecionado" />
      </ul>,
    );

    expect(screen.getByRole('listitem')).toHaveAttribute('aria-selected', 'true');
  });

  it('renders leading and trailing slots as decorative content', () => {
    render(
      <ul>
        <ListItem leading={<span data-testid="leading">L</span>} title="Item" trailing={<span data-testid="trailing">T</span>} />
      </ul>,
    );

    expect(screen.getByTestId('leading')).toBeInTheDocument();
    expect(screen.getByTestId('trailing')).toBeInTheDocument();
  });
});
