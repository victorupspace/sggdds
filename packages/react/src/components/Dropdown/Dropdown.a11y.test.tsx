import { render } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { describe, expect, it } from 'vitest';

import { Dropdown } from './Dropdown';

const options = [
  { value: 'sp', label: 'São Paulo' },
  { value: 'rj', label: 'Rio de Janeiro' },
  { value: 'mg', label: 'Minas Gerais' },
];

describe('Dropdown — accessibility', () => {
  it('has no violations with label and options', async () => {
    const { container } = render(
      <Dropdown label="Estado" options={options} placeholder="Selecione" />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no violations in error state with errorText', async () => {
    const { container } = render(
      <Dropdown
        label="Estado"
        options={options}
        state="error"
        errorText="Selecione um estado."
      />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no violations when disabled', async () => {
    const { container } = render(
      <Dropdown label="Estado" options={options} disabled />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no violations with helper text', async () => {
    const { container } = render(
      <Dropdown
        label="Estado"
        options={options}
        helperText="Apenas para envio de correspondência."
      />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
