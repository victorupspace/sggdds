import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Radio } from './Radio';
import { RadioGroup } from './RadioGroup';

describe('Radio', () => {
  it('renders the group label and options', () => {
    render(
      <RadioGroup label="Escolha uma opcao" name="options" onChange={vi.fn()} value="a">
        <Radio label="Opcao A" value="a" />
        <Radio label="Opcao B" value="b" />
      </RadioGroup>,
    );

    expect(screen.getByText('Escolha uma opcao')).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Opcao A' })).toBeChecked();
    expect(screen.getByRole('radio', { name: 'Opcao B' })).not.toBeChecked();
  });

  it('associates the description through aria-describedby', () => {
    render(
      <RadioGroup label="Plano" name="plan" onChange={vi.fn()} value="basic">
        <Radio description="Descricao complementar." label="Basico" value="basic" />
      </RadioGroup>,
    );

    const radio = screen.getByRole('radio', { name: 'Basico' });
    const description = screen.getByText('Descricao complementar.');

    expect(radio).toHaveAttribute('aria-describedby', description.id);
  });

  it('calls onChange when an option is selected', () => {
    const handleChange = vi.fn();

    render(
      <RadioGroup label="Plano" name="plan" onChange={handleChange} value="basic">
        <Radio label="Basico" value="basic" />
        <Radio label="Premium" value="premium" />
      </RadioGroup>,
    );

    fireEvent.click(screen.getByRole('radio', { name: 'Premium' }));

    expect(handleChange).toHaveBeenCalledWith('premium');
  });

  it('does not call onChange for disabled options', () => {
    const handleChange = vi.fn();

    render(
      <RadioGroup label="Plano" name="plan" onChange={handleChange} value="basic">
        <Radio label="Basico" value="basic" />
        <Radio disabled label="Premium" value="premium" />
      </RadioGroup>,
    );

    fireEvent.click(screen.getByRole('radio', { name: 'Premium' }));

    expect(screen.getByRole('radio', { name: 'Premium' })).toBeDisabled();
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('moves selection with vertical arrow keys', () => {
    const handleChange = vi.fn();

    const { container } = render(
      <RadioGroup label="Plano" name="plan" onChange={handleChange} value="basic">
        <Radio label="Basico" value="basic" />
        <Radio label="Intermediario" value="intermediate" />
      </RadioGroup>,
    );

    const firstRadio = screen.getByRole('radio', { name: 'Basico' });
    firstRadio.focus();
    const fieldset = container.querySelector('fieldset');

    expect(fieldset).not.toBeNull();
    if (!fieldset) {
      return;
    }

    fireEvent.keyDown(fieldset, {
      key: 'ArrowDown',
    });

    expect(handleChange).toHaveBeenCalledWith('intermediate');
    expect(screen.getByRole('radio', { name: 'Intermediario' })).toHaveFocus();
  });

  it('moves selection with horizontal arrow keys', () => {
    const handleChange = vi.fn();

    const { container } = render(
      <RadioGroup
        label="Confirmacao"
        name="confirm"
        onChange={handleChange}
        orientation="horizontal"
        value="yes"
      >
        <Radio label="Sim" value="yes" />
        <Radio label="Nao" value="no" />
      </RadioGroup>,
    );

    screen.getByRole('radio', { name: 'Sim' }).focus();
    const fieldset = container.querySelector('fieldset');

    expect(fieldset).not.toBeNull();
    if (!fieldset) {
      return;
    }

    fireEvent.keyDown(fieldset, {
      key: 'ArrowRight',
    });

    expect(handleChange).toHaveBeenCalledWith('no');
    expect(screen.getByRole('radio', { name: 'Nao' })).toHaveFocus();
  });
});
