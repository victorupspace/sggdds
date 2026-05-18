import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Loading, Spinner } from './index';

describe('Spinner', () => {
  it('renders an accessible loading status', () => {
    render(<Spinner />);

    const spinner = screen.getByRole('status', { name: 'Carregando' });

    expect(spinner).toHaveAttribute('aria-busy', 'true');
    expect(spinner).toHaveAttribute('aria-live', 'polite');
  });

  it('is centered by default', () => {
    render(<Spinner />);

    expect(screen.getByRole('status', { name: 'Carregando' })).toHaveClass('ds-spinner--centered');
  });

  it('supports inline usage', () => {
    render(<Spinner centered={false} />);

    expect(screen.getByRole('status', { name: 'Carregando' })).toHaveClass('ds-spinner--inline');
  });

  it('renders visible label when requested', () => {
    render(<Spinner label="Carregando dados" showLabel />);

    expect(screen.getByText('Carregando dados')).toBeInTheDocument();
    expect(screen.getByRole('status', { name: 'Carregando dados' })).toBeInTheDocument();
  });

  it('uses ariaLabel when the visible label is not a string', () => {
    render(
      <Spinner ariaLabel="Carregando relatorio" label={<strong>Carregando</strong>} showLabel />,
    );

    expect(screen.getByRole('status', { name: 'Carregando relatorio' })).toBeInTheDocument();
  });

  it('applies size and variant classes', () => {
    render(<Spinner centered={false} size="lg" variant="brand" />);

    const spinner = screen.getByRole('status', { name: 'Carregando' });

    expect(spinner).toHaveClass('ds-spinner--size-lg');
    expect(spinner).toHaveClass('ds-spinner--variant-brand');
  });

  it('exports Loading as an alias', () => {
    render(<Loading ariaLabel="Loading alias" />);

    expect(screen.getByRole('status', { name: 'Loading alias' })).toBeInTheDocument();
  });
});
