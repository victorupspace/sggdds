import type { Meta, StoryObj } from '@storybook/react-vite';

import { Stepper } from './Stepper';
import './Stepper.stories.css';
import type { StepperStep } from './Stepper.types';

const threeSteps: StepperStep[] = [
  { id: 'web-version', label: 'Versão web' },
  { id: 'vehicle-data', label: 'Dados do veículo' },
  { id: 'review', label: 'Revisão' },
];

const sixSteps: StepperStep[] = [
  { id: 'start', label: 'Início' },
  { id: 'profile', label: 'Dados pessoais' },
  { id: 'address', label: 'Endereço' },
  { id: 'vehicle', label: 'Dados do veículo' },
  { id: 'attachments', label: 'Anexos' },
  { id: 'review', label: 'Revisão' },
];

const twelveSteps: StepperStep[] = Array.from({ length: 12 }, (_, index) => ({
  id: `step-${String(index + 1)}`,
  label: `Etapa ${String(index + 1)}`,
}));

const meta = {
  title: 'Web Components/Stepper',
  component: Stepper,
  parameters: {
    componentCanvas: {
      width: 640,
    },
    docs: {
      description: {
        component: `
O Stepper comunica o progresso atual de fluxos divididos em etapas, como um card de progresso.

Layout reproduzido do Figma Web Components (node 40000045:5961) com o atomo Progress Line (40000030:6888).

Anatomia (estado In Progress):
- Card com fundo color/background/neutral/default, borda border-sm em color/neutral/grey-200 e radius 12.
- Top row: titulo em caixa alta (SemiBold 11, tracking 0.66px) e contador atual/total (Medium 11), ambos em grey-600.
- Step row: circulo de 32px em typography/primary com o numero da etapa (SemiBold 14, branco) e o nome da etapa (SemiBold 18, typography/primary).
- Progress Line: track de 8px em color/background/neutral/default-hover e Range em color/background/neutral/black, proporcional a etapa atual.
- Next row: prefixo "Próxima:" (SemiBold 12) e nome da proxima etapa (Regular 12) em grey-600; some na ultima etapa.

Estado Completed:
- Card verde claro (#E9FDF3) com borda #E0E0E0 a 80%.
- Circulo de 38px em #1E7D47 com o vetor check do Figma, titulo SemiBold 15 e descricao Regular 12 em #1E7D47.
- Botao Recomeçar (#181818, radius 8) alinhado a direita, com onRestart.

Regras:
- currentStep e baseado em 1: currentStep={1} renderiza 1/total.
- A barra usa progresso proporcional: etapa atual dividida pelo total.
- Textos do titulo, prefixo e estado Completed sao customizaveis.

Responsividade (variante Size=Mobile do Figma, ate 480px):
- Padding 16, gaps 10, circulo de 28px e tipografia reduzida.
- O card e fluido e ocupa 100% do container.

Acessibilidade:
- A barra usa role="progressbar" com aria-valuemin, aria-valuemax, aria-valuenow e aria-valuetext.
- O contador e a etapa atual sao comunicados em texto visivel.
- O botao Recomeçar e um button nativo com focus ring.
`,
      },
    },
    layout: 'fullscreen',
  },
  argTypes: {
    className: {
      control: 'text',
      description: 'Classe CSS opcional aplicada ao container.',
    },
    completed: {
      control: 'boolean',
      description: 'Exibe o estado Completed do Figma.',
    },
    completedDescription: {
      control: 'text',
      description: 'Descricao do estado Completed.',
    },
    completedTitle: {
      control: 'text',
      description: 'Titulo do estado Completed.',
    },
    currentStep: {
      control: { min: 1, step: 1, type: 'number' },
      description: 'Etapa atual (baseada em 1).',
    },
    label: {
      control: 'text',
      description: 'Titulo do card exibido em caixa alta.',
    },
    nextLabel: {
      control: 'text',
      description: 'Prefixo da proxima etapa.',
    },
    onRestart: {
      control: false,
      description: 'Callback do botao Recomeçar no estado Completed.',
    },
    restartLabel: {
      control: 'text',
      description: 'Texto do botao do estado Completed.',
    },
    steps: {
      control: false,
      description: 'Lista de etapas com id e label.',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Stepper>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    currentStep: 1,
    steps: threeSteps,
  },
  render: (args) => (
    <div className="stepper-story-shell">
      <Stepper {...args} />
    </div>
  ),
};

export const SixSteps: Story = {
  args: {
    currentStep: 2,
    steps: sixSteps,
  },
  render: (args) => (
    <div className="stepper-story-shell">
      <Stepper {...args} />
    </div>
  ),
};

export const TwelveSteps: Story = {
  args: {
    currentStep: 5,
    steps: twelveSteps,
  },
  render: (args) => (
    <div className="stepper-story-shell">
      <Stepper {...args} />
    </div>
  ),
};

export const LastStep: Story = {
  args: {
    currentStep: 3,
    steps: threeSteps,
  },
  render: (args) => (
    <div className="stepper-story-shell">
      <Stepper {...args} />
    </div>
  ),
};

export const Completed: Story = {
  args: {
    completed: true,
    currentStep: 3,
    steps: threeSteps,
  },
  render: (args) => (
    <div className="stepper-story-shell">
      <Stepper {...args} />
    </div>
  ),
};
