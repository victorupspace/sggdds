import './Stepper.styles.css';

import type { StepperProps, StepperStep } from './Stepper.types';

const MAX_STEPS = 10;

const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);

function normalizeSteps(steps: StepperStep[]): StepperStep[] {
  return steps
    .filter((step) => step.id.trim() !== '' && step.label.trim() !== '')
    .slice(0, MAX_STEPS);
}

export function Stepper({
  className,
  completedLabel = 'Concluído',
  currentStep,
  label = 'PROGRESSO',
  nextLabel = 'Próxima:',
  steps,
}: StepperProps) {
  const normalizedSteps = normalizeSteps(steps);
  const totalSteps = normalizedSteps.length;
  const safeCurrentStep = totalSteps > 0 ? clamp(Math.trunc(currentStep), 1, totalSteps) : 0;
  const currentStepIndex = safeCurrentStep > 0 ? safeCurrentStep - 1 : -1;
  const currentStepData: StepperStep | undefined =
    currentStepIndex >= 0 ? normalizedSteps[currentStepIndex] : undefined;
  const nextStepData: StepperStep | undefined =
    currentStepIndex + 1 < totalSteps ? normalizedSteps[currentStepIndex + 1] : undefined;
  const progressValue =
    totalSteps > 1 ? ((safeCurrentStep - 1) / (totalSteps - 1)) * 100 : 0;
  const progressLabel =
    totalSteps > 0
      ? `${label}: etapa ${String(safeCurrentStep)} de ${String(totalSteps)}${
          currentStepData ? `, ${currentStepData.label}` : ''
        }`
      : `${label}: nenhuma etapa disponivel`;

  const rootClassName = ['ds-stepper', className].filter(Boolean).join(' ');

  return (
    <section aria-label={label} className={rootClassName}>
      <header className="ds-stepper__header">
        <p className="ds-stepper__label">{label}</p>
        <p
          className="ds-stepper__counter"
          aria-label={`${String(safeCurrentStep)} de ${String(totalSteps)}`}
        >
          {safeCurrentStep}/{totalSteps}
        </p>
      </header>

      <div className="ds-stepper__current">
        <span className="ds-stepper__number" aria-hidden="true">
          {safeCurrentStep}
        </span>
        <h2 className="ds-stepper__title">{currentStepData?.label ?? completedLabel}</h2>
      </div>

      <div className="ds-stepper__progress-group">
        <div
          aria-label={progressLabel}
          aria-valuemax={totalSteps}
          aria-valuemin={0}
          aria-valuenow={safeCurrentStep}
          aria-valuetext={progressLabel}
          className="ds-stepper__progress"
          role="progressbar"
        >
          <span
            className="ds-stepper__progress-fill"
            style={{ inlineSize: `${String(progressValue)}%` }}
          />
        </div>

        {totalSteps > 0 ? (
          <ol className="ds-stepper__dots" aria-label="Etapas">
            {normalizedSteps.map((step, index) => {
              const stepNumber = index + 1;
              const isCurrent = stepNumber === safeCurrentStep;
              const isCompleted = stepNumber < safeCurrentStep;
              const dotClassName = [
                'ds-stepper__dot',
                isCurrent ? 'ds-stepper__dot--current' : undefined,
                isCompleted ? 'ds-stepper__dot--completed' : undefined,
              ]
                .filter(Boolean)
                .join(' ');

              return (
                <li className="ds-stepper__dot-item" key={step.id}>
                  <span
                    aria-current={isCurrent ? 'step' : undefined}
                    aria-label={`Etapa ${String(stepNumber)} de ${String(totalSteps)}: ${step.label}`}
                    className={dotClassName}
                  />
                </li>
              );
            })}
          </ol>
        ) : null}
      </div>

      <p className="ds-stepper__next">
        {nextStepData ? (
          <>
            <span>{nextLabel}</span> <strong>{nextStepData.label}</strong>
          </>
        ) : (
          <strong>{completedLabel}</strong>
        )}
      </p>
    </section>
  );
}
