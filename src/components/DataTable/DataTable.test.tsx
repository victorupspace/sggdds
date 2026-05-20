import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { DataTable } from './DataTable';
import type { DataTableColumn } from './DataTable.types';

interface Person {
  id: number;
  name: string;
  role: string;
  salary: number;
}

const data: Person[] = [
  { id: 1, name: 'Aria', role: 'Lead', salary: 155000 },
  { id: 2, name: 'Marcus', role: 'Manager', salary: 132000 },
  { id: 3, name: 'Priya', role: 'Designer', salary: 118000 },
];

const columns: DataTableColumn<Person>[] = [
  { id: 'name', name: 'Name', selector: (row) => row.name, sortable: true },
  { id: 'role', name: 'Role', selector: (row) => row.role },
  {
    id: 'salary',
    name: 'Salary',
    selector: (row) => String(row.salary),
    sortAccessor: (row) => row.salary,
    sortable: true,
  },
];

describe('DataTable', () => {
  it('renders headers and rows', () => {
    render(<DataTable columns={columns} data={data} keyField="id" />);

    expect(screen.getByRole('table', { name: 'Tabela de dados' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /name/i })).toBeInTheDocument();
    expect(screen.getByText('Aria')).toBeInTheDocument();
    expect(screen.getByText('Marcus')).toBeInTheDocument();
  });

  it('sorts rows by sortable columns', () => {
    render(<DataTable columns={columns} data={data} keyField="id" />);

    fireEvent.click(screen.getByRole('button', { name: /ordenar salary/i }));

    const rows = screen.getAllByRole('row').slice(1);

    expect(within(rows[0]).getByText('Priya')).toBeInTheDocument();
  });

  it('paginates data', () => {
    render(<DataTable columns={columns} data={data} keyField="id" pagination paginationPerPage={2} />);

    expect(screen.getByText('Aria')).toBeInTheDocument();
    expect(screen.queryByText('Priya')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Proxima pagina' }));

    expect(screen.getByText('Priya')).toBeInTheDocument();
  });

  it('selects rows and reports selected state', () => {
    const onSelectedRowsChange = vi.fn();

    render(
      <DataTable
        columns={columns}
        data={data}
        keyField="id"
        onSelectedRowsChange={onSelectedRowsChange}
        selectableRows
      />,
    );

    fireEvent.click(screen.getByRole('checkbox', { name: 'Selecionar linha 1' }));

    expect(onSelectedRowsChange).toHaveBeenCalledWith(
      expect.objectContaining({
        selectedCount: 1,
        selectedRowKeys: [1],
      }),
    );
  });

  it('expands rows with custom content', () => {
    render(
      <DataTable
        columns={columns}
        data={data}
        expandableRows
        expandableRowsComponent={(row) => <span>Detalhes de {row.name}</span>}
        keyField="id"
      />,
    );

    const expandButton = screen.getByRole('button', { name: 'Expandir linha 1' });

    fireEvent.click(expandButton);

    expect(screen.getByText('Detalhes de Aria')).toBeInTheDocument();
    expect(expandButton).toHaveAttribute('aria-expanded', 'true');
    expect(expandButton).toHaveAttribute('aria-controls');
    expect(document.getElementById(expandButton.getAttribute('aria-controls') ?? '')).toBeInTheDocument();
  });
});
