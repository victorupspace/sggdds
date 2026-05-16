import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Stepper } from './Stepper';
import type { StepperStep } from './Stepper.types';

const steps: StepperStep[] = [
  { id: 'web-version', label: 'Versão web' },
  { id: 'vehicle-data', label: 'Dados do veículo' },
  { id: 'review', label: 'Revisão' },
];

describe('Stepper', () => {
  it('renders the default label', () => {
    render(<Stepper currentStep={1} steps={steps} />);

    expect(screen.getByText('PROGRESSO')).toBeInTheDocument();
  });

  it('renders the current and total counter', () => {
    render(<Stepper currentStep={1} steps={steps} />);

    expect(screen.getByText('1/3')).toBeInTheDocument();
  });

  it('renders the current step label', () => {
    render(<Stepper currentStep={1} steps={steps} />);

    expect(screen.getByRole('heading', { name: 'Versão web' })).toBeInTheDocument();
  });

  it('renders the next step', () => {
    render(<Stepper currentStep={1} steps={steps} />);

    expect(screen.getByText('Próxima:')).toBeInTheDocument();
    expect(screen.getByText('Dados do veículo')).toBeInTheDocument();
  });

  it('renders the completed label on the last step', () => {
    render(<Stepper completedLabel="Finalizado" currentStep={3} steps={steps} />);

    expect(screen.getByText('Finalizado')).toBeInTheDocument();
    expect(screen.queryByText('Próxima:')).not.toBeInTheDocument();
  });

  it('limits rendering to ten steps defensively', () => {
    const manySteps = Array.from({ length: 12 }, (_, index) => ({
      id: `step-${String(index + 1)}`,
      label: `Etapa ${String(index + 1)}`,
    }));

    render(<Stepper currentStep={12} steps={manySteps} />);

    expect(screen.getByText('10/10')).toBeInTheDocument();
    expect(screen.queryByText('Etapa 11')).not.toBeInTheDocument();
    expect(within(screen.getByLabelText('Etapas')).getAllByRole('listitem')).toHaveLength(10);
  });

  it('sets basic progressbar accessibility attributes', () => {
    render(<Stepper currentStep={2} steps={steps} />);

    const progressbar = screen.getByRole('progressbar');

    expect(progressbar).toHaveAttribute('aria-valuemin', '0');
    expect(progressbar).toHaveAttribute('aria-valuemax', '3');
    expect(progressbar).toHaveAttribute('aria-valuenow', '2');
    expect(progressbar).toHaveAccessibleName('PROGRESSO: etapa 2 de 3, Dados do veículo');
  });
});
