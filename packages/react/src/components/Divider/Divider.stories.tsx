import type { Meta, StoryObj } from '@storybook/react-vite';

import { Divider } from './Divider';
import './Divider.stories.css';

const meta = {
  title: 'Web Components/Divider',
  component: Divider,
  parameters: {
    componentCanvas: {
      width: 720,
    },
    docs: {
      description: {
        component: `
O Divider reproduz o layout do Figma (Web Components / Divider): linha de 1px com pontas arredondadas (radius-full na horizontal) e label central opcional.

Estilos (propriedade style no Figma):
- default: color/neutral/grey-300.
- darker: color/neutral/grey-600.
- subtle: color/neutral/grey-100.

Com label, a linha horizontal tem um segmento fixo de 100px antes do texto e o restante flexivel, como no Figma; na vertical os dois segmentos dividem o espaco. O label usa 14px com line-height 20 em color/neutral/grey-600 (o Figma usa Inter nesse texto; normalizado para Plus Jakarta Sans pela politica de fonte unica do DS).

Responsividade: a linha horizontal ocupa 100% do container e a vertical estica no eixo do elemento pai, sem overflow em nenhuma largura.

Acessibilidade: por padrao o divider e decorativo (aria-hidden); com decorative=false ou com label renderiza role="separator" com aria-orientation, e o label permanece legivel por leitores de tela.
`,
      },
    },
    layout: 'fullscreen',
  },
  argTypes: {
    ariaLabel: {
      control: 'text',
      description: 'Nome acessivel quando o divider nao e decorativo.',
    },
    className: {
      control: 'text',
      description: 'Classe CSS opcional aplicada ao divider.',
    },
    decorative: {
      control: 'boolean',
      description: 'Define se o divider deve ser ignorado por tecnologias assistivas.',
    },
    label: {
      control: 'text',
      description: 'Texto central opcional (showLabel/label no Figma).',
    },
    orientation: {
      control: 'select',
      description: 'Orientacao da linha.',
      options: ['horizontal', 'vertical'],
    },
    tone: {
      control: 'select',
      description: 'Estilo da linha (style no Figma).',
      options: ['default', 'darker', 'subtle'],
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Divider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="divider-story-surface">
      <div className="divider-story-panel">
        <Divider {...args} />
      </div>
    </div>
  ),
};

export const Tones: Story = {
  render: () => (
    <div className="divider-story-surface">
      <div className="divider-story-panel">
        <div className="divider-story-row">
          <span>default</span>
          <Divider />
        </div>
        <div className="divider-story-row">
          <span>darker</span>
          <Divider tone="darker" />
        </div>
        <div className="divider-story-row">
          <span>subtle</span>
          <Divider tone="subtle" />
        </div>
      </div>
    </div>
  ),
};

export const WithLabel: Story = {
  args: {
    label: 'Ou',
  },
  render: (args) => (
    <div className="divider-story-surface">
      <div className="divider-story-panel">
        <Divider {...args} />
      </div>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="divider-story-surface">
      <div className="divider-story-panel">
        <div className="divider-story-vertical">
          <div className="divider-story-box">Conteudo A</div>
          <Divider orientation="vertical" />
          <div className="divider-story-box">Conteudo B</div>
        </div>
      </div>
    </div>
  ),
};

export const VerticalWithLabel: Story = {
  render: () => (
    <div className="divider-story-surface">
      <div className="divider-story-panel">
        <div className="divider-story-vertical">
          <div className="divider-story-box">Conteudo A</div>
          <Divider label="Ou" orientation="vertical" />
          <div className="divider-story-box">Conteudo B</div>
        </div>
      </div>
    </div>
  ),
};
