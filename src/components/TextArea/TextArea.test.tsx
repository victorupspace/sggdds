import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { TextArea } from './TextArea';

describe('TextArea', () => {
  it('associates the visible label with the native textarea', () => {
    render(<TextArea label="Descricao" placeholder="Digite aqui" />);

    expect(screen.getByLabelText('Descricao')).toHaveAttribute('placeholder', 'Digite aqui');
  });

  it('marks the textarea as required', () => {
    render(<TextArea required label="Mensagem" />);

    expect(screen.getByLabelText(/Mensagem/)).toBeRequired();
  });

  it('connects helper text and counter with aria-describedby', () => {
    render(<TextArea helperText="Conte ate 100 caracteres" label="Resumo" maxLength={100} />);

    const textarea = screen.getByLabelText('Resumo');

    expect(textarea).toHaveAccessibleDescription('Conte ate 100 caracteres 0/100');
    expect(screen.getByText('0/100')).toHaveAttribute('aria-live', 'polite');
  });

  it('updates the character counter while editing', () => {
    render(<TextArea label="Resumo" maxLength={100} />);

    fireEvent.change(screen.getByLabelText('Resumo'), { target: { value: 'Design System' } });

    expect(screen.getByText('13/100')).toBeInTheDocument();
  });

  it('sets aria-invalid and describes the error message', () => {
    render(<TextArea errorText="Campo obrigatorio" helperText="Helper text" label="Descricao" />);

    const textarea = screen.getByLabelText('Descricao');

    expect(textarea).toHaveAttribute('aria-invalid', 'true');
    expect(textarea).toHaveAccessibleDescription('Campo obrigatorio Helper text 0');
  });

  it('treats a controlled value above maxLength as invalid', () => {
    render(<TextArea label="Resumo" maxLength={4} value="excesso" />);

    expect(screen.getByLabelText('Resumo')).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByText('7/4')).toBeInTheDocument();
  });

  it('calls onChange and onValueChange when edited', () => {
    const onChange = vi.fn();
    const onValueChange = vi.fn();

    render(<TextArea label="Mensagem" onChange={onChange} onValueChange={onValueChange} />);

    fireEvent.change(screen.getByLabelText('Mensagem'), { target: { value: 'Oi' } });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onValueChange).toHaveBeenCalledWith('Oi', expect.any(Object));
  });

  it('supports disabled state accessibly', () => {
    render(<TextArea disabled label="Observacao" value="Bloqueado" />);

    expect(screen.getByLabelText('Observacao')).toBeDisabled();
  });

  it('can hide the character counter', () => {
    render(
      <TextArea helperText="Sem contador" label="Resumo" maxLength={100} showCounter={false} />,
    );

    expect(screen.queryByText('0/100')).not.toBeInTheDocument();
    expect(screen.getByLabelText('Resumo')).toHaveAccessibleDescription('Sem contador');
  });
});
