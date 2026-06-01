import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Carousel } from './Carousel';

const items = [
  {
    description: 'Descricao do primeiro card',
    id: 'primeiro',
    title: 'Primeiro card',
  },
  {
    description: 'Descricao do segundo card',
    id: 'segundo',
    title: 'Segundo card',
  },
  {
    description: 'Descricao do terceiro card',
    id: 'terceiro',
    title: 'Terceiro card',
  },
  {
    description: 'Descricao do quarto card',
    id: 'quarto',
    title: 'Quarto card',
  },
];

describe('Carousel', () => {
  it('renders cards, controls and indicators', () => {
    render(<Carousel items={items} />);

    expect(screen.getByRole('region', { name: 'Carrossel' })).toHaveAttribute(
      'aria-roledescription',
      'carousel',
    );
    expect(screen.getByRole('heading', { name: 'Primeiro card' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Card anterior' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Proximo card' })).toBeEnabled();
    expect(screen.getByRole('button', { name: 'Proximo card' }).querySelector('svg')).toBeTruthy();
    expect(screen.getByRole('button', { name: /selecionado/ })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
  });

  it('navigates to a specific group from an indicator', () => {
    const onIndexChange = vi.fn();

    render(<Carousel items={items} onIndexChange={onIndexChange} />);

    fireEvent.click(screen.getByRole('button', { name: 'Ir para grupo 2 de 4' }));

    expect(onIndexChange).toHaveBeenCalledWith(1, items[1]);
    expect(screen.getByRole('button', { name: 'Grupo 2 de 4, selecionado' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
  });

  it('supports next and previous controls', () => {
    render(<Carousel items={items} />);

    fireEvent.click(screen.getByRole('button', { name: 'Proximo card' }));

    expect(screen.getByText('Grupo 2 de 4')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Card anterior' }));

    expect(screen.getByText('Grupo 1 de 4')).toBeInTheDocument();
  });

  it('supports loop navigation', () => {
    render(<Carousel items={items} loop />);

    fireEvent.click(screen.getByRole('button', { name: 'Card anterior' }));

    expect(screen.getByText('Grupo 4 de 4')).toBeInTheDocument();
  });

  it('supports multiple visible cards as grouped navigation', () => {
    render(<Carousel items={items} visibleItems={3} />);

    expect(screen.getByRole('button', { name: 'Ir para grupo 2 de 2' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Ir para grupo 3 de 2' })).not.toBeInTheDocument();
  });

  it('allows a maximum visibleItems value greater than the current amount of cards', () => {
    render(<Carousel items={items} visibleItems={10} />);

    expect(screen.getByRole('button', { name: 'Grupo 1 de 1, selecionado' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Proximo card' })).toBeDisabled();
  });

  it('supports controlled selectedIndex', () => {
    const onIndexChange = vi.fn();

    render(<Carousel items={items} onIndexChange={onIndexChange} selectedIndex={1} />);

    fireEvent.click(screen.getByRole('button', { name: 'Ir para grupo 3 de 4' }));

    expect(onIndexChange).toHaveBeenCalledWith(2, items[2]);
    expect(screen.getByText('Grupo 2 de 4')).toBeInTheDocument();
  });

  it('supports keyboard navigation', () => {
    render(<Carousel items={items} />);

    fireEvent.keyDown(screen.getByRole('region', { name: 'Carrossel' }), { key: 'End' });

    expect(screen.getByText('Grupo 4 de 4')).toBeInTheDocument();
  });
});
