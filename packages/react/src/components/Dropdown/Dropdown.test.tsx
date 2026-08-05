import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Dropdown } from './Dropdown';

const options = [
  { value: 'sao-paulo', label: 'São Paulo' },
  { value: 'rio-de-janeiro', label: 'Rio de Janeiro' },
  { value: 'belo-horizonte', label: 'Belo Horizonte' },
];

describe('Dropdown', () => {
  it('associates the visible label with the trigger button', () => {
    render(<Dropdown label="Cidade" options={options} />);

    const trigger = screen.getByLabelText('Cidade');

    expect(trigger).toHaveAttribute('aria-haspopup', 'listbox');
    expect(trigger).toHaveTextContent('Selecione');
  });

  it('opens the listbox and renders the options', () => {
    render(<Dropdown label="Cidade" options={options} />);

    fireEvent.click(screen.getByLabelText('Cidade'));

    expect(screen.getByRole('listbox')).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'São Paulo' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Belo Horizonte' })).toBeInTheDocument();
  });

  it('selects an option on click and calls onValueChange', () => {
    const onValueChange = vi.fn();

    render(<Dropdown label="Cidade" onValueChange={onValueChange} options={options} />);

    fireEvent.click(screen.getByLabelText('Cidade'));
    fireEvent.click(screen.getByRole('option', { name: 'Rio de Janeiro' }));

    expect(onValueChange).toHaveBeenCalledWith('rio-de-janeiro');
    expect(screen.getByLabelText('Cidade')).toHaveTextContent('Rio de Janeiro');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('supports keyboard selection', () => {
    const onValueChange = vi.fn();

    render(<Dropdown label="Cidade" onValueChange={onValueChange} options={options} />);

    fireEvent.click(screen.getByLabelText('Cidade'));

    const listbox = screen.getByRole('listbox');
    fireEvent.keyDown(listbox, { key: 'ArrowDown' });
    fireEvent.keyDown(listbox, { key: 'Enter' });

    expect(onValueChange).toHaveBeenCalledWith('rio-de-janeiro');
  });

  it('closes the listbox with Escape', () => {
    render(<Dropdown defaultOpen label="Cidade" options={options} />);

    fireEvent.keyDown(screen.getByRole('listbox'), { key: 'Escape' });

    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('does not select disabled options', () => {
    const onValueChange = vi.fn();

    render(
      <Dropdown
        label="Cidade"
        onValueChange={onValueChange}
        options={[...options, { value: 'bloqueado', label: 'Bloqueado', disabled: true }]}
      />,
    );

    fireEvent.click(screen.getByLabelText('Cidade'));
    fireEvent.click(screen.getByRole('option', { name: 'Bloqueado' }));

    expect(onValueChange).not.toHaveBeenCalled();
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  it('connects helper text with aria-describedby', () => {
    render(<Dropdown helperText="Escolha uma cidade" label="Cidade" options={options} />);

    expect(screen.getByLabelText('Cidade')).toHaveAccessibleDescription('Escolha uma cidade');
  });

  it('sets aria-invalid and describes the error message', () => {
    render(
      <Dropdown
        errorText="Selecione uma opcao"
        helperText="Helper Text"
        label="Cidade"
        options={options}
      />,
    );

    const trigger = screen.getByLabelText('Cidade');

    expect(trigger).toHaveAttribute('aria-invalid', 'true');
    expect(trigger).toHaveAccessibleDescription('Selecione uma opcao Helper Text');
  });

  it('does not open when disabled', () => {
    render(<Dropdown disabled label="Cidade" options={options} />);

    const trigger = screen.getByLabelText('Cidade');
    fireEvent.click(trigger);

    expect(trigger).toBeDisabled();
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('shows the controlled value', () => {
    render(<Dropdown label="Cidade" options={options} value="belo-horizonte" />);

    expect(screen.getByLabelText('Cidade')).toHaveTextContent('Belo Horizonte');
  });
});
