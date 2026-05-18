import { render } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { describe, expect, it } from 'vitest';

import { Toggle } from './Toggle';

describe('Toggle — accessibility', () => {
  it('has no violations with label', async () => {
    const { container } = render(<Toggle label="Modo escuro" />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no violations when checked', async () => {
    const { container } = render(
      <Toggle label="Notificações por e-mail" defaultChecked />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no violations with hint text', async () => {
    const { container } = render(
      <Toggle
        label="Compartilhar telemetria"
        hint="Ajuda a melhorar a aplicação. Não compartilha dados pessoais."
      />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no violations when disabled', async () => {
    const { container } = render(
      <Toggle label="Recurso indisponível" disabled />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
