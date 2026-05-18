import { render } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { describe, expect, it } from 'vitest';

import { Datepicker } from './Datepicker';

describe('Datepicker — accessibility', () => {
  it('has no violations on closed default state', async () => {
    const { container } = render(<Datepicker label="Data de nascimento" />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no violations with helper text', async () => {
    const { container } = render(
      <Datepicker
        label="Data do evento"
        helperText="Selecione uma data futura."
      />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no violations in error state', async () => {
    const { container } = render(
      <Datepicker
        label="Data limite"
        state="error"
        errorText="Data obrigatória."
      />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no violations when disabled', async () => {
    const { container } = render(
      <Datepicker label="Data bloqueada" disabled defaultValue="2026-01-15" />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no violations in open state', async () => {
    const { container } = render(
      <Datepicker
        label="Data do evento"
        defaultOpen
        defaultMonth="2026-05-01"
      />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no violations in range mode', async () => {
    const { container } = render(
      <Datepicker
        label="Período"
        mode="range"
        defaultRangeValue={{ start: '2026-05-01', end: '2026-05-15' }}
      />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
