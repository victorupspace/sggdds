import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Pagination } from './Pagination';

describe('Pagination', () => {
  it('renders pagination navigation with the current page', () => {
    render(<Pagination page={1} totalPages={10} />);

    expect(screen.getByRole('navigation', { name: 'Paginacao' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Pagina 1, atual' })).toHaveAttribute(
      'aria-current',
      'page',
    );
  });

  it('renders ellipsis for long ranges', () => {
    render(<Pagination page={1} totalPages={10} />);

    expect(screen.getByText('...')).toBeInTheDocument();
  });

  it('calls onPageChange when a page is selected', () => {
    const onPageChange = vi.fn();

    render(<Pagination onPageChange={onPageChange} page={1} totalPages={10} />);

    fireEvent.click(screen.getByRole('button', { name: 'Ir para pagina 2' }));

    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('disables previous controls on the first page', () => {
    render(<Pagination page={1} totalPages={10} />);

    expect(screen.getByRole('button', { name: 'Primeira pagina' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Pagina anterior' })).toBeDisabled();
  });

  it('renders metadata controls and range', () => {
    render(
      <Pagination page={1} pageSize={20} showPageSelect showPageSize showRange totalItems={100} />,
    );

    expect(screen.getByText('1 - 20 de 100')).toBeInTheDocument();
    expect(screen.getByLabelText('Resultados por pagina')).toHaveValue('20');
    expect(screen.getByLabelText('Pagina')).toHaveValue('1');
  });

  it('calls onPageSizeChange when page size changes', () => {
    const onPageSizeChange = vi.fn();

    render(
      <Pagination
        onPageSizeChange={onPageSizeChange}
        page={1}
        pageSize={20}
        showPageSize
        totalItems={100}
      />,
    );

    fireEvent.change(screen.getByLabelText('Resultados por pagina'), {
      target: { value: '50' },
    });

    expect(onPageSizeChange).toHaveBeenCalledWith(50, expect.anything());
  });

  it('renders mobile direct page select support', () => {
    render(<Pagination page={3} totalPages={8} />);

    expect(screen.getByText('Pagina 3 de 8')).toBeInTheDocument();
    expect(screen.getByLabelText('Selecionar pagina')).toHaveValue('3');
  });
});
