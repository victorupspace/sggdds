import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Datepicker } from './Datepicker';

describe('Datepicker', () => {
  it('associates the visible label with the readonly input', () => {
    render(<Datepicker defaultMonth="2026-12-01" label="Data" />);

    expect(screen.getByLabelText('Data')).toHaveAttribute('placeholder', 'DD/MM/AAAA');
    expect(screen.getByLabelText('Data')).toHaveAttribute('readonly');
  });

  it('opens the calendar from the icon button', () => {
    render(<Datepicker defaultMonth="2026-12-01" label="Data" />);

    fireEvent.click(screen.getByRole('button', { name: 'Abrir calendário' }));

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Dezembro 2026')).toBeInTheDocument();
  });

  it('selects a single date and calls onValueChange', () => {
    const onValueChange = vi.fn();

    render(
      <Datepicker
        defaultMonth="2026-12-01"
        label="Data"
        onValueChange={onValueChange}
        showFooter={false}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Abrir calendário' }));
    fireEvent.click(screen.getByRole('button', { name: 'terça-feira, 15 de dezembro de 2026' }));

    expect(onValueChange).toHaveBeenCalledWith('2026-12-15');
    expect(screen.getByLabelText('Data')).toHaveValue('15/12/2026');
  });

  it('navigates between months', () => {
    render(<Datepicker defaultMonth="2026-12-01" label="Data" />);

    fireEvent.click(screen.getByRole('button', { name: 'Abrir calendário' }));
    fireEvent.click(screen.getByRole('button', { name: 'Próximo mês' }));

    expect(screen.getByText('Janeiro 2027')).toBeInTheDocument();
  });

  it('supports range selection with two fields', () => {
    const onRangeValueChange = vi.fn();

    render(
      <Datepicker
        defaultMonth="2026-12-01"
        defaultOpen
        label="Periodo"
        mode="range"
        onRangeValueChange={onRangeValueChange}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'quinta-feira, 17 de dezembro de 2026' }));
    fireEvent.click(screen.getByRole('button', { name: 'sábado, 26 de dezembro de 2026' }));

    expect(onRangeValueChange).toHaveBeenLastCalledWith({
      end: '2026-12-26',
      start: '2026-12-17',
    });
    expect(screen.getByLabelText('Periodo')).toHaveValue('17/12/2026');
    expect(screen.getByLabelText('Periodo (fim)')).toHaveValue('26/12/2026');
    expect(screen.getByText('até')).toBeInTheDocument();
  });

  it('sets aria-invalid and describes the error message', () => {
    render(
      <Datepicker
        defaultMonth="2026-12-01"
        errorText="Data obrigatoria"
        helperText="Helper Text"
        label="Data"
      />,
    );

    const input = screen.getByLabelText('Data');

    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAccessibleDescription('Data obrigatoria Helper Text');
  });

  it('does not open when disabled', () => {
    render(<Datepicker defaultMonth="2026-12-01" disabled label="Data" />);

    fireEvent.click(screen.getByRole('button', { name: 'Abrir calendário' }));

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.getByLabelText('Data')).toBeDisabled();
  });

  it('closes the calendar with Escape', () => {
    render(<Datepicker defaultMonth="2026-12-01" defaultOpen label="Data" />);

    fireEvent.keyDown(screen.getByText('Dezembro 2026'), { key: 'Escape' });

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('marks weekends with the weekend class', () => {
    render(<Datepicker defaultMonth="2026-12-01" defaultOpen label="Data" />);

    const saturday = screen.getByRole('button', { name: 'sábado, 5 de dezembro de 2026' });
    const monday = screen.getByRole('button', { name: 'segunda-feira, 7 de dezembro de 2026' });

    expect(saturday).toHaveClass('ds-datepicker__day--weekend');
    expect(monday).not.toHaveClass('ds-datepicker__day--weekend');
  });
});
