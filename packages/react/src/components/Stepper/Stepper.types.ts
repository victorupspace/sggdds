export interface StepperStep {
  id: string;
  label: string;
}

export interface StepperProps {
  steps: StepperStep[];
  currentStep: number;
  label?: string;
  nextLabel?: string;
  completedLabel?: string;
  className?: string;
}
