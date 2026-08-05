import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

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

    expect(screen.getByText('Progresso')).toBeInTheDocument();
  });

  it('renders the current and total counter', () => {
    render(<Stepper currentStep={1} steps={steps} />);

    expect(screen.getByText('1/3')).toBeInTheDocument();
  });

  it('renders the current step label', () => {
    render(<Stepper currentStep={1} steps={steps} />);

    expect(screen.getByText('Versão web')).toBeInTheDocument();
  });

  it('renders the next step', () => {
    render(<Stepper currentStep={1} steps={steps} />);

    expect(screen.getByText('Próxima:')).toBeInTheDocument();
    expect(screen.getByText('Dados do veículo')).toBeInTheDocument();
  });

  it('hides the next row on the last step', () => {
    render(<Stepper currentStep={3} steps={steps} />);

    expect(screen.getByText('3/3')).toBeInTheDocument();
    expect(screen.queryByText('Próxima:')).not.toBeInTheDocument();
  });

  it('sets basic progressbar accessibility attributes', () => {
    render(<Stepper currentStep={2} steps={steps} />);

    const progressbar = screen.getByRole('progressbar');

    expect(progressbar).toHaveAttribute('aria-valuemin', '0');
    expect(progressbar).toHaveAttribute('aria-valuemax', '3');
    expect(progressbar).toHaveAttribute('aria-valuenow', '2');
    expect(progressbar).toHaveAccessibleName('Progresso: etapa 2 de 3, Dados do veículo');
  });

  it('renders the completed state with restart action', () => {
    const onRestart = vi.fn();

    render(<Stepper completed currentStep={3} onRestart={onRestart} steps={steps} />);

    expect(screen.getByText('Serviço concluído')).toBeInTheDocument();
    expect(screen.getByText('Todas as etapas foram finalizadas')).toBeInTheDocument();
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Recomeçar' }));

    expect(onRestart).toHaveBeenCalledTimes(1);
  });

  it('customizes the completed texts', () => {
    render(
      <Stepper
        completed
        completedDescription="Processo encerrado com sucesso"
        completedTitle="Tudo pronto"
        currentStep={3}
        restartLabel="Novo pedido"
        steps={steps}
      />,
    );

    expect(screen.getByText('Tudo pronto')).toBeInTheDocument();
    expect(screen.getByText('Processo encerrado com sucesso')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Novo pedido' })).toBeInTheDocument();
  });
});
