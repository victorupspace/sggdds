import { render } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { describe, expect, it } from 'vitest';

import { Checkbox } from './Checkbox';

describe('Checkbox — accessibility', () => {
  it('has no violations with label', async () => {
    const { container } = render(<Checkbox label="Aceito os termos" />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no violations when checked', async () => {
    const { container } = render(
      <Checkbox label="Receber notificações" defaultChecked />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no violations with hint text', async () => {
    const { container } = render(
      <Checkbox
        label="Termos de uso"
        hint="Você pode revogar a qualquer momento."
      />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no violations when indeterminate', async () => {
    const { container } = render(
      <Checkbox label="Selecionar todos" indeterminate />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no violations when disabled', async () => {
    const { container } = render(
      <Checkbox label="Opção bloqueada" disabled />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no violations when required', async () => {
    const { container } = render(
      <Checkbox label="Confirmo a leitura" required />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
