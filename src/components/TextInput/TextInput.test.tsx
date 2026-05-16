import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { TextInput } from './TextInput';

const icon = (
  <svg data-testid="text-input-icon" viewBox="0 0 24 24">
    <path d="M4 12h16" />
  </svg>
);

describe('TextInput', () => {
  it('associates the visible label with the native input', () => {
    render(<TextInput label="Email" placeholder="name@example.com" />);

    expect(screen.getByLabelText('Email')).toHaveAttribute('placeholder', 'name@example.com');
  });

  it('marks the input as required', () => {
    render(<TextInput required label="Nome" />);

    expect(screen.getByLabelText(/Nome/)).toBeRequired();
  });

  it('connects helper text with aria-describedby', () => {
    render(<TextInput helperText="Use apenas numeros" label="Codigo" />);

    const input = screen.getByLabelText('Codigo');
    const helper = screen.getByText('Use apenas numeros');

    expect(input).toHaveAccessibleDescription('Use apenas numeros');
    expect(input).toHaveAttribute('aria-describedby', helper.closest('p')?.id);
  });

  it('sets aria-invalid and describes the error message', () => {
    render(<TextInput errorText="Campo obrigatorio" helperText="Helper Text" label="Nome" />);

    const input = screen.getByLabelText('Nome');

    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAccessibleDescription('Campo obrigatorio Helper Text');
  });

  it('calls onChange and onValueChange when edited', () => {
    const onChange = vi.fn();
    const onValueChange = vi.fn();

    render(<TextInput label="Busca" onChange={onChange} onValueChange={onValueChange} />);

    fireEvent.change(screen.getByLabelText('Busca'), { target: { value: 'Design System' } });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onValueChange).toHaveBeenCalledWith('Design System', expect.any(Object));
  });

  it('supports disabled state accessibly', () => {
    render(<TextInput disabled label="Documento" value="123" />);

    expect(screen.getByLabelText('Documento')).toBeDisabled();
  });

  it('renders decorative start and end icons', () => {
    render(<TextInput iconEnd={icon} iconStart={icon} label="Pesquisar" />);

    expect(screen.getAllByTestId('text-input-icon')).toHaveLength(2);
    expect(screen.getAllByTestId('text-input-icon')[0].parentElement).toHaveAttribute(
      'aria-hidden',
      'true',
    );
  });
});
