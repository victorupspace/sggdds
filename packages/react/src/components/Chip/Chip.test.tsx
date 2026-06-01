import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Chip } from './Chip';

describe('Chip', () => {
  it('renders label and removal action', () => {
    render(<Chip onRemove={vi.fn()}>Categoria</Chip>);

    expect(screen.getByText('Categoria')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Remover Categoria' })).toBeInTheDocument();
  });

  it('calls onRemove when the removal action is clicked', () => {
    const onRemove = vi.fn();

    render(<Chip onRemove={onRemove}>Filtro</Chip>);

    fireEvent.click(screen.getByRole('button', { name: 'Remover Filtro' }));

    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  it('uses a custom accessible removal label', () => {
    render(
      <Chip onRemove={vi.fn()} removeLabel="Remover filtro de cidade">
        Sao Paulo
      </Chip>,
    );

    expect(screen.getByRole('button', { name: 'Remover filtro de cidade' })).toBeInTheDocument();
  });

  it('disables the removal action', () => {
    render(
      <Chip disabled onRemove={vi.fn()}>
        Bloqueado
      </Chip>,
    );

    expect(screen.getByRole('button', { name: 'Remover Bloqueado' })).toBeDisabled();
    expect(screen.getByText('Bloqueado').closest('.ds-chip')).toHaveAttribute(
      'aria-disabled',
      'true',
    );
  });

  it('renders selected state class', () => {
    render(
      <Chip onRemove={vi.fn()} selected>
        Ativo
      </Chip>,
    );

    expect(screen.getByText('Ativo').closest('.ds-chip')).toHaveClass('ds-chip--selected');
  });
});
