import { render } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { describe, expect, it } from 'vitest';

import { Button } from './Button';

describe('Button — accessibility', () => {
  it('has no violations with text content', async () => {
    const { container } = render(<Button>Salvar</Button>);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no violations when disabled', async () => {
    const { container } = render(<Button disabled>Salvar</Button>);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no violations in loading state', async () => {
    const { container } = render(
      <Button isLoading loadingLabel="Carregando">
        Salvar
      </Button>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no violations as link variant', async () => {
    const { container } = render(
      <Button href="https://example.com" rel="noopener noreferrer">
        Saiba mais
      </Button>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no violations when icon-only with ariaLabel', async () => {
    const { container } = render(
      <Button
        ariaLabel="Fechar"
        iconStart={
          <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" />
          </svg>
        }
      />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
