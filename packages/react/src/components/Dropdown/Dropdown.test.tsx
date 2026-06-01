import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Dropdown } from './Dropdown';

const options = [
  { value: 'financeiro', label: 'Financeiro' },
  { value: 'atendimento', label: 'Atendimento' },
  { value: 'documentos', label: 'Documentos' },
];

describe('Dropdown', () => {
  it('associates the visible label with the native select', () => {
    render(<Dropdown label="Categoria" options={options} placeholder="Selecione" />);

    expect(screen.getByLabelText('Categoria')).toHaveValue('');
  });

  it('renders the provided options', () => {
    render(<Dropdown label="Categoria" options={options} />);

    expect(screen.getByRole('option', { name: 'Financeiro' })).toHaveValue('financeiro');
    expect(screen.getByRole('option', { name: 'Documentos' })).toHaveValue('documentos');
  });

  it('marks the select as required', () => {
    render(<Dropdown required label="Categoria" options={options} />);

    expect(screen.getByLabelText(/Categoria/)).toBeRequired();
  });

  it('connects helper text with aria-describedby', () => {
    render(<Dropdown helperText="Escolha uma categoria" label="Categoria" options={options} />);

    const select = screen.getByLabelText('Categoria');
    const helper = screen.getByText('Escolha uma categoria');

    expect(select).toHaveAccessibleDescription('Escolha uma categoria');
    expect(select).toHaveAttribute('aria-describedby', helper.closest('p')?.id);
  });

  it('sets aria-invalid and describes the error message', () => {
    render(
      <Dropdown
        errorText="Selecione uma opcao"
        helperText="Helper Text"
        label="Categoria"
        options={options}
      />,
    );

    const select = screen.getByLabelText('Categoria');

    expect(select).toHaveAttribute('aria-invalid', 'true');
    expect(select).toHaveAccessibleDescription('Selecione uma opcao Helper Text');
  });

  it('calls onChange and onValueChange when a value is selected', () => {
    const onChange = vi.fn();
    const onValueChange = vi.fn();

    render(
      <Dropdown
        label="Categoria"
        onChange={onChange}
        onValueChange={onValueChange}
        options={options}
        placeholder="Selecione"
      />,
    );

    fireEvent.change(screen.getByLabelText('Categoria'), { target: { value: 'documentos' } });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onValueChange).toHaveBeenCalledWith('documentos', expect.any(Object));
  });

  it('supports disabled state accessibly', () => {
    render(<Dropdown disabled label="Categoria" options={options} value="financeiro" />);

    expect(screen.getByLabelText('Categoria')).toBeDisabled();
  });

  it('renders disabled options', () => {
    render(
      <Dropdown
        label="Categoria"
        options={[...options, { value: 'bloqueado', label: 'Bloqueado', disabled: true }]}
      />,
    );

    expect(screen.getByRole('option', { name: 'Bloqueado' })).toBeDisabled();
  });
});
