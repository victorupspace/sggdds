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
Divider cria separacao visual entre secoes, grupos ou elementos por meio de uma linha horizontal ou vertical.

Use para estruturar conteudo, separar grupos de acoes, listas, areas de formulario e composicoes. Nao use Divider como decoracao sem relacao estrutural, nem para substituir espacamento quando a hierarquia ja estiver clara.

Responsividade:
Este componente foi desenvolvido com comportamento responsivo nativo. A orientacao horizontal ocupa 100% do container e a orientacao vertical estica no eixo do elemento pai, respeitando layouts flexiveis em mobile, tablet e desktop sem gerar overflow horizontal.

Tokens:
Cores, espessuras e tamanhos usam variaveis CSS geradas pelos tokens do Figma. A espessura usa tokens de border width e os tons usam a escala neutral disponivel.

Acessibilidade:
- Por padrao, o divider e decorativo e usa aria-hidden.
- Quando decorative=false, renderiza role="separator" e aria-orientation.
- ariaLabel pode nomear separadores semanticos quando houver necessidade real para leitores de tela.
`,
      },
    },
    layout: 'fullscreen',
  },
  argTypes: {
    ariaLabel: {
      control: 'text',
      description: 'Nome acessivel quando decorative=false.',
    },
    className: {
      control: 'text',
      description: 'Classe CSS opcional aplicada ao divider.',
    },
    decorative: {
      control: 'boolean',
      description: 'Define se o divider deve ser ignorado por tecnologias assistivas.',
    },
    orientation: {
      control: 'select',
      description: 'Orientacao da linha.',
      options: ['horizontal', 'vertical'],
    },
    thickness: {
      control: 'select',
      description: 'Espessura baseada em tokens de borda.',
      options: ['sm', 'md', 'lg'],
    },
    tone: {
      control: 'select',
      description: 'Intensidade visual do divisor.',
      options: ['subtle', 'default', 'strong'],
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Divider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    orientation: 'horizontal',
    thickness: 'sm',
    tone: 'default',
  },
  render: (args) => (
    <div className="divider-story-surface">
      <div className="divider-story-panel">
        <Divider {...args} />
      </div>
    </div>
  ),
};

export const Tones: Story = {
  args: {},
  render: () => (
    <div className="divider-story-surface">
      <div className="divider-story-panel">
        <div className="divider-story-row">
          <span>Subtle</span>
          <Divider tone="subtle" />
        </div>
        <div className="divider-story-row">
          <span>Default</span>
          <Divider tone="default" />
        </div>
        <div className="divider-story-row">
          <span>Strong</span>
          <Divider tone="strong" />
        </div>
      </div>
    </div>
  ),
};

export const Thickness: Story = {
  args: {},
  render: () => (
    <div className="divider-story-surface">
      <div className="divider-story-panel">
        <Divider thickness="sm" />
        <Divider thickness="md" />
        <Divider thickness="lg" />
      </div>
    </div>
  ),
};

export const Vertical: Story = {
  args: {
    decorative: false,
    orientation: 'vertical',
  },
  render: (args) => (
    <div className="divider-story-surface">
      <div className="divider-story-panel">
        <div className="divider-story-vertical">
          <div className="divider-story-box">Grupo A</div>
          <Divider {...args} ariaLabel="Separador entre grupos" />
          <div className="divider-story-box">Grupo B</div>
        </div>
      </div>
    </div>
  ),
};

export const MobileResponsive: Story = {
  args: {
    orientation: 'horizontal',
    tone: 'default',
  },
  parameters: {
    componentCanvas: {
      width: 320,
    },
  },
  render: (args) => (
    <div className="divider-story-surface">
      <div className="divider-story-panel">
        <Divider {...args} />
      </div>
    </div>
  ),
};
