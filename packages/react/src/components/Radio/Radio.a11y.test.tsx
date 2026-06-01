import { render } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { describe, expect, it } from 'vitest';

import { Radio, RadioGroup } from './';

describe('RadioGroup — accessibility', () => {
  it('has no violations with simple options', async () => {
    const { container } = render(
      <RadioGroup
        name="payment"
        value="pix"
        onChange={() => undefined}
        label="Forma de pagamento"
      >
        <Radio value="pix" label="Pix" />
        <Radio value="card" label="Cartão de crédito" />
        <Radio value="boleto" label="Boleto" />
      </RadioGroup>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no violations with descriptions', async () => {
    const { container } = render(
      <RadioGroup
        name="plan"
        value="annual"
        onChange={() => undefined}
        label="Plano"
      >
        <Radio
          value="monthly"
          label="Mensal"
          description="Renovação automática a cada 30 dias."
        />
        <Radio
          value="annual"
          label="Anual"
          description="20% de desconto comparado ao plano mensal."
        />
      </RadioGroup>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no violations with disabled option', async () => {
    const { container } = render(
      <RadioGroup
        name="shipping"
        value="standard"
        onChange={() => undefined}
        label="Entrega"
      >
        <Radio value="standard" label="Padrão" />
        <Radio value="express" label="Expressa" disabled />
      </RadioGroup>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no violations with horizontal orientation', async () => {
    const { container } = render(
      <RadioGroup
        name="size"
        value="m"
        onChange={() => undefined}
        label="Tamanho"
        orientation="horizontal"
      >
        <Radio value="s" label="P" />
        <Radio value="m" label="M" />
        <Radio value="l" label="G" />
      </RadioGroup>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
