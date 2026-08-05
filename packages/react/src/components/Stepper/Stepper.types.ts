export interface StepperStep {
  id: string;
  label: string;
}

export interface StepperProps {
  steps: StepperStep[];
  currentStep: number;
  label?: string;
  nextLabel?: string;
  completed?: boolean;
  completedTitle?: string;
  completedDescription?: string;
  restartLabel?: string;
  onRestart?: () => void;
  className?: string;
}
