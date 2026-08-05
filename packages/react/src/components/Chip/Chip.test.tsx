import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Chip } from './Chip';

describe('Chip', () => {
  it('renders the label as a static element by default', () => {
    render(<Chip>Categoria</Chip>);

    expect(screen.getByText('Categoria')).toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('applies the variant class', () => {
    render(<Chip variant="danger">Alerta</Chip>);

    expect(screen.getByText('Alerta').closest('.ds-chip')).toHaveClass('ds-chip--variant-danger');
  });

  it('renders a button with aria-pressed when interactive', () => {
    const onClick = vi.fn();

    render(
      <Chip onClick={onClick} selected>
        Filtro
      </Chip>,
    );

    const button = screen.getByRole('button', { name: 'Filtro' });
    expect(button).toHaveAttribute('aria-pressed', 'true');

    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('does not fire onClick when disabled', () => {
    const onClick = vi.fn();

    render(
      <Chip disabled onClick={onClick}>
        Bloqueado
      </Chip>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Bloqueado' }));

    expect(onClick).not.toHaveBeenCalled();
    expect(screen.getByRole('button', { name: 'Bloqueado' })).toBeDisabled();
  });

  it('marks the static disabled chip with aria-disabled', () => {
    render(<Chip disabled>Estatico</Chip>);

    expect(screen.getByText('Estatico').closest('.ds-chip')).toHaveAttribute(
      'aria-disabled',
      'true',
    );
  });

  it('renders the default leading icon with showLeadingIcon', () => {
    const { container } = render(<Chip showLeadingIcon>Label</Chip>);

    expect(container.querySelector('.ds-chip__icon svg')).toBeInTheDocument();
  });

  it('renders custom leading and trailing icons', () => {
    render(
      <Chip
        leadingIcon={<svg data-testid="leading" />}
        trailingIcon={<svg data-testid="trailing" />}
      >
        Label
      </Chip>,
    );

    expect(screen.getByTestId('leading')).toBeInTheDocument();
    expect(screen.getByTestId('trailing')).toBeInTheDocument();
  });

  it('keeps icons decorative', () => {
    const { container } = render(<Chip showLeadingIcon>Label</Chip>);

    expect(container.querySelector('.ds-chip__icon')).toHaveAttribute('aria-hidden', 'true');
  });

  it('applies the selected class', () => {
    render(<Chip selected>Ativo</Chip>);

    expect(screen.getByText('Ativo').closest('.ds-chip')).toHaveClass('ds-chip--selected');
  });

  it('applies an additional className', () => {
    render(<Chip className="custom-chip">Label</Chip>);

    expect(screen.getByText('Label').closest('.ds-chip')).toHaveClass('custom-chip');
  });
});
