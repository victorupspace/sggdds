import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ProgressBar } from './ProgressBar';

describe('ProgressBar', () => {
  it('renders label, helper text and percentage value', () => {
    render(<ProgressBar helperText="Helper text" label="Label" value={25} />);

    const progressBar = screen.getByRole('progressbar', { name: 'Label' });

    expect(progressBar).toHaveAttribute('aria-valuenow', '25');
    expect(progressBar).toHaveAttribute('aria-valuemin', '0');
    expect(progressBar).toHaveAttribute('aria-valuemax', '100');
    expect(screen.getByText('25%')).toBeInTheDocument();
    expect(screen.getByText('Helper text')).toBeInTheDocument();
  });

  it('clamps values outside the configured range', () => {
    render(<ProgressBar label="Upload" max={10} min={0} value={15} />);

    const progressBar = screen.getByRole('progressbar', { name: 'Upload' });

    expect(progressBar).toHaveAttribute('aria-valuenow', '10');
    expect(screen.getByText('100%')).toBeInTheDocument();
  });

  it('uses a custom value label as aria-valuetext', () => {
    render(<ProgressBar label="Processamento" value={50} valueLabel="Metade concluida" />);

    const progressBar = screen.getByRole('progressbar', { name: 'Processamento' });

    expect(screen.getByText('Metade concluida')).toBeInTheDocument();
    expect(progressBar).toHaveAttribute('aria-valuetext', 'Metade concluida');
  });

  it('uses aria-label when no visible label is provided', () => {
    render(<ProgressBar ariaLabel="Carregamento do relatorio" showValue={false} value={60} />);

    expect(screen.getByRole('progressbar', { name: 'Carregamento do relatorio' })).toHaveAttribute(
      'aria-valuenow',
      '60',
    );
  });

  it('omits aria-valuenow in indeterminate mode', () => {
    render(<ProgressBar label="Upload" mode="indeterminate" showValue={false} />);

    const progressBar = screen.getByRole('progressbar', { name: 'Upload' });

    expect(progressBar).not.toHaveAttribute('aria-valuenow');
    expect(progressBar).not.toHaveAttribute('aria-valuemin');
    expect(progressBar).not.toHaveAttribute('aria-valuemax');
  });

  it('can hide the value text', () => {
    render(<ProgressBar label="Upload" showValue={false} value={25} />);

    expect(screen.queryByText('25%')).not.toBeInTheDocument();
  });

  it('renders the status icon when requested', () => {
    render(<ProgressBar label="Upload" showIcon value={100} variant="success" />);

    expect(document.querySelector('.ds-progress-bar__icon')).toBeInTheDocument();
  });
});
