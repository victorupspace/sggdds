import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('renders the label', () => {
    render(<Checkbox label="Checkbox Label" />);

    expect(screen.getByText('Checkbox Label')).toBeInTheDocument();
  });

  it('renders the hint', () => {
    render(<Checkbox hint="Hint goes here" label="Checkbox Label" />);

    expect(screen.getByText('Hint goes here')).toBeInTheDocument();
  });

  it('associates the native input with the label', () => {
    render(<Checkbox label="Checkbox Label" />);

    expect(screen.getByLabelText('Checkbox Label')).toHaveAttribute('type', 'checkbox');
  });

  it('associates the hint through aria-describedby', () => {
    render(<Checkbox hint="Hint goes here" id="terms" label="Checkbox Label" />);

    const checkbox = screen.getByLabelText('Checkbox Label');
    const hint = screen.getByText('Hint goes here');

    expect(checkbox).toHaveAttribute('aria-describedby', hint.id);
    expect(hint.id).toBe('terms-hint');
  });

  it('is unchecked by default', () => {
    render(<Checkbox label="Checkbox Label" />);

    expect(screen.getByLabelText('Checkbox Label')).not.toBeChecked();
  });

  it('is checked when checked is true', () => {
    render(<Checkbox checked label="Checkbox Label" />);

    expect(screen.getByLabelText('Checkbox Label')).toBeChecked();
  });

  it('is disabled when disabled is true', () => {
    render(<Checkbox disabled label="Checkbox Label" />);

    expect(screen.getByLabelText('Checkbox Label')).toBeDisabled();
  });

  it('sets the native indeterminate state', () => {
    render(<Checkbox indeterminate label="Checkbox Label" />);

    const checkbox = screen.getByLabelText<HTMLInputElement>('Checkbox Label');

    expect(checkbox.indeterminate).toBe(true);
  });

  it('calls onCheckedChange when clicked', () => {
    const handleCheckedChange = vi.fn();

    render(<Checkbox label="Checkbox Label" onCheckedChange={handleCheckedChange} />);

    fireEvent.click(screen.getByLabelText('Checkbox Label'));

    expect(handleCheckedChange).toHaveBeenCalledWith(true);
  });

  it('does not call onCheckedChange when disabled', () => {
    const handleCheckedChange = vi.fn();

    render(<Checkbox disabled label="Checkbox Label" onCheckedChange={handleCheckedChange} />);

    fireEvent.click(screen.getByLabelText('Checkbox Label'));

    expect(handleCheckedChange).not.toHaveBeenCalled();
  });

  it('renders without hint', () => {
    render(<Checkbox label="Checkbox Label" />);

    expect(screen.getByLabelText('Checkbox Label')).not.toHaveAttribute('aria-describedby');
  });

  it('renders as required', () => {
    render(<Checkbox label="Checkbox Label" required />);

    expect(screen.getByLabelText('Checkbox Label')).toBeRequired();
  });

  it('applies an additional className', () => {
    render(<Checkbox className="custom-checkbox" label="Checkbox Label" />);

    expect(screen.getByText('Checkbox Label').closest('.ds-checkbox')).toHaveClass(
      'custom-checkbox',
    );
  });

  it('keeps the native checkbox input present', () => {
    render(<Checkbox label="Checkbox Label" />);

    expect(screen.getByRole('checkbox', { name: 'Checkbox Label' })).toBeInTheDocument();
  });

  it('sets aria-checked mixed for assistive technologies', () => {
    render(<Checkbox indeterminate label="Checkbox Label" />);

    expect(screen.getByRole('checkbox', { name: 'Checkbox Label' })).toHaveAttribute(
      'aria-checked',
      'mixed',
    );
  });
});
