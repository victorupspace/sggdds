import type { Meta, StoryObj } from '@storybook/react-vite';

import { Stepper } from './Stepper';
import type { StepperStep } from './Stepper.types';

const defaultSteps: StepperStep[] = [
  { id: 'web-version', label: 'Versão web' },
  { id: 'vehicle-data', label: 'Dados do veículo' },
  { id: 'review', label: 'Revisão' },
];

const mobileSteps: StepperStep[] = [
  { id: 'mobile-version', label: 'Versão mobile' },
  { id: 'vehicle-data', label: 'Dados do veículo' },
  { id: 'owner-data', label: 'Dados do proprietário' },
  { id: 'review', label: 'Revisão' },
];

const fiveSteps: StepperStep[] = [
  { id: 'start', label: 'Início' },
  { id: 'profile', label: 'Dados pessoais' },
  { id: 'vehicle', label: 'Dados do veículo' },
  { id: 'attachments', label: 'Anexos' },
  { id: 'review', label: 'Revisão' },
];

const tenSteps: StepperStep[] = Array.from({ length: 10 }, (_, index) => ({
  id: `step-${String(index + 1)}`,
  label: `Etapa ${String(index + 1)}`,
}));

const meta = {
  title: 'Web Components/Stepper',
  component: Stepper,
  parameters: {
    componentCanvas: {
      width: 600,
    },
    docs: {
      description: {
        component: `
O Stepper comunica o progresso atual de fluxos divididos em etapas. Use quando a pessoa precisa entender em que etapa esta, quantas etapas existem e qual sera a proxima etapa.

Use para fluxos lineares com 2 a 10 etapas. Nao use para navegacao global, abas independentes, breadcrumbs ou fluxos em que a pessoa possa pular livremente entre secoes sem ordem definida.

Regras:
- currentStep e baseado em 1: currentStep={1} renderiza 1/total.
- O componente limita a renderizacao a 10 steps para preservar legibilidade.
- Somente o dot da etapa atual fica destacado; etapas anteriores e futuras permanecem neutras, conforme a referencia visual.
- A barra usa progresso proporcional a etapa atual em relacao ao total.
- O texto "PROGRESSO", o prefixo "Próxima:" e o estado final podem ser customizados.

Acessibilidade:
- A barra usa role="progressbar" com aria-valuemin, aria-valuemax e aria-valuenow.
- O texto visivel comunica o contador e a etapa atual.
- O dot atual usa aria-current="step".
- A informacao nao depende exclusivamente de cor.
`,
      },
    },
    layout: 'fullscreen',
  },
  argTypes: {
    className: {
      control: 'text',
      description: 'Classe CSS opcional aplicada ao elemento raiz.',
    },
    completedLabel: {
      control: 'text',
      description: 'Texto exibido quando a etapa atual e a ultima.',
    },
    currentStep: {
      control: { max: 10, min: 1, type: 'number' },
      description: 'Etapa atual baseada em 1.',
    },
    label: {
      control: 'text',
      description: 'Rotulo superior do componente.',
    },
    nextLabel: {
      control: 'text',
      description: 'Prefixo exibido antes do nome da proxima etapa.',
    },
    steps: {
      control: 'object',
      description: 'Lista de etapas. O componente renderiza no maximo 10.',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Stepper>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    currentStep: 1,
    steps: defaultSteps,
  },
};

export const Mobile: Story = {
  args: {
    currentStep: 1,
    steps: mobileSteps,
  },
  parameters: {
    componentCanvas: {
      width: 328,
    },
    viewport: {
      defaultViewport: 'mobile',
    },
  },
};

export const MiddleStep: Story = {
  args: {
    currentStep: 3,
    steps: fiveSteps,
  },
};

export const LastStep: Story = {
  args: {
    completedLabel: 'Concluído',
    currentStep: 3,
    steps: defaultSteps,
  },
};

export const TenSteps: Story = {
  args: {
    currentStep: 6,
    steps: tenSteps,
  },
};

export const CustomLabels: Story = {
  args: {
    completedLabel: 'Fluxo finalizado',
    currentStep: 2,
    label: 'ANDAMENTO',
    nextLabel: 'Depois:',
    steps: fiveSteps,
  },
};
