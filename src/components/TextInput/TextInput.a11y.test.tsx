import { render } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { describe, expect, it } from 'vitest';

import { TextInput } from './TextInput';

describe('TextInput — accessibility', () => {
  it('has no violations with label only', async () => {
    const { container } = render(<TextInput label="E-mail" type="email" />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no violations with helper text', async () => {
    const { container } = render(
      <TextInput
        label="Senha"
        type="password"
        helperText="Mínimo de 8 caracteres."
      />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no violations in error state', async () => {
    const { container } = render(
      <TextInput
        label="CPF"
        type="text"
        state="error"
        errorText="CPF inválido."
      />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no violations when required', async () => {
    const { container } = render(
      <TextInput label="Nome completo" type="text" required />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no violations when disabled', async () => {
    const { container } = render(
      <TextInput label="Matrícula" type="text" disabled defaultValue="12345" />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
