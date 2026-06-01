import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Datepicker } from './Datepicker';

describe('Datepicker', () => {
  it('associates the visible label with the readonly input', () => {
    render(<Datepicker defaultMonth="2026-12-01" label="Data" />);

    expect(screen.getByLabelText('Data')).toHaveAttribute('placeholder', 'MM/DD/YYYY');
    expect(screen.getByLabelText('Data')).toHaveAttribute('readonly');
  });

  it('opens the calendar from the icon button', () => {
    render(<Datepicker defaultMonth="2026-12-01" label="Data" />);

    fireEvent.click(screen.getByRole('button', { name: 'Open calendar' }));

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('December 2026')).toBeInTheDocument();
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

    fireEvent.click(screen.getByRole('button', { name: 'Open calendar' }));
    fireEvent.click(screen.getByRole('button', { name: 'Tuesday, December 15, 2026' }));

    expect(onValueChange).toHaveBeenCalledWith('2026-12-15');
    expect(screen.getByLabelText('Data')).toHaveValue('12/15/2026');
  });

  it('navigates between months', () => {
    render(<Datepicker defaultMonth="2026-12-01" label="Data" />);

    fireEvent.click(screen.getByRole('button', { name: 'Open calendar' }));
    fireEvent.click(screen.getByRole('button', { name: 'Next month' }));

    expect(screen.getByText('January 2027')).toBeInTheDocument();
  });

  it('supports range selection', () => {
    const onRangeValueChange = vi.fn();

    render(
      <Datepicker
        defaultMonth="2026-12-01"
        label="Periodo"
        mode="range"
        onRangeValueChange={onRangeValueChange}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Open calendar' }));
    fireEvent.click(screen.getByRole('button', { name: 'Thursday, December 17, 2026' }));
    fireEvent.click(screen.getByRole('button', { name: 'Saturday, December 26, 2026' }));

    expect(onRangeValueChange).toHaveBeenLastCalledWith({
      end: '2026-12-26',
      start: '2026-12-17',
    });
    expect(screen.getByLabelText('Periodo')).toHaveValue('12/17/2026 - 12/26/2026');
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

    fireEvent.click(screen.getByRole('button', { name: 'Open calendar' }));

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.getByLabelText('Data')).toBeDisabled();
  });

  it('closes the calendar with Escape', () => {
    render(<Datepicker defaultMonth="2026-12-01" defaultOpen label="Data" />);

    fireEvent.keyDown(screen.getByText('December 2026'), { key: 'Escape' });

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
