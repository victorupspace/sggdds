import './Stepper.styles.css';

import type { StepperProps, StepperStep } from './Stepper.types';

const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);

function normalizeSteps(steps: StepperStep[]): StepperStep[] {
  return steps.filter((step) => step.id.trim() !== '' && step.label.trim() !== '');
}

/* check — vetor exportado do Figma (Web Components / Stepper, node 40000045:5961) */
function CheckIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9.55 17.6537L4.2155 12.3192L5.2845 11.25L9.55 15.5155L18.7155 6.35L19.7845 7.41925L9.55 17.6537Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Stepper({
  className,
  completed = false,
  completedDescription = 'Todas as etapas foram finalizadas',
  completedTitle = 'Serviço concluído',
  currentStep,
  label = 'Progresso',
  nextLabel = 'Próxima:',
  onRestart,
  restartLabel = 'Recomeçar',
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
  const progressValue = totalSteps > 0 ? (safeCurrentStep / totalSteps) * 100 : 0;
  const progressLabel =
    totalSteps > 0
      ? `${label}: etapa ${String(safeCurrentStep)} de ${String(totalSteps)}${
          currentStepData ? `, ${currentStepData.label}` : ''
        }`
      : `${label}: nenhuma etapa disponivel`;

  const rootClassName = ['ds-stepper', completed ? 'ds-stepper--completed' : null, className]
    .filter(Boolean)
    .join(' ');

  if (completed) {
    return (
      <section aria-label={label} className={rootClassName}>
        <div className="ds-stepper__completed-row">
          <div className="ds-stepper__completed-info">
            <span aria-hidden="true" className="ds-stepper__check">
              <CheckIcon />
            </span>
            <div className="ds-stepper__completed-text">
              <p className="ds-stepper__completed-title">{completedTitle}</p>
              <p className="ds-stepper__completed-description">{completedDescription}</p>
            </div>
          </div>
          <button className="ds-stepper__restart" onClick={onRestart} type="button">
            {restartLabel}
          </button>
        </div>
      </section>
    );
  }

  return (
    <section aria-label={label} className={rootClassName}>
      <div className="ds-stepper__top-row">
        <p className="ds-stepper__label">{label}</p>
        <p
          aria-label={`${String(safeCurrentStep)} de ${String(totalSteps)}`}
          className="ds-stepper__counter"
        >
          {safeCurrentStep}/{totalSteps}
        </p>
      </div>

      <div className="ds-stepper__step-row">
        <span aria-hidden="true" className="ds-stepper__number">
          {safeCurrentStep}
        </span>
        <p className="ds-stepper__title">{currentStepData?.label}</p>
      </div>

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

      {nextStepData ? (
        <p className="ds-stepper__next-row">
          <strong className="ds-stepper__next-label">{nextLabel}</strong>{' '}
          <span className="ds-stepper__next-value">{nextStepData.label}</span>
        </p>
      ) : null}
    </section>
  );
}
