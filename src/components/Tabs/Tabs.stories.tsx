import type { Meta, StoryObj } from '@storybook/react-vite';

import { Tabs } from './Tabs';
import './Tabs.stories.css';

function CubeIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M16 3 27 9.5v13L16 29 5 22.5v-13L16 3Zm0 0v13m11-6.5L16 16 5 9.5m22 13L16 16 5 22.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.4"
      />
    </svg>
  );
}

function PanelContent({ title }: { title: string }) {
  return (
    <div className="tabs-story-content">
      <h3>{title}</h3>
      <p>
        Conteudo associado a tab selecionada. Use tabs para alternar secoes relacionadas sem trocar
        de pagina nem perder o contexto da tarefa.
      </p>
    </div>
  );
}

const defaultItems = [
  {
    content: <PanelContent title="Visao geral" />,
    icon: <CubeIcon />,
    id: 'overview',
    label: 'Tab',
  },
  {
    content: <PanelContent title="Detalhes" />,
    icon: <CubeIcon />,
    id: 'details',
    label: 'Tab',
  },
  {
    content: <PanelContent title="Historico" />,
    icon: <CubeIcon />,
    id: 'history',
    label: 'Tab',
  },
  {
    content: <PanelContent title="Anexos" />,
    disabled: true,
    icon: <CubeIcon />,
    id: 'files',
    label: 'Tab',
  },
];

const sevenItems = Array.from({ length: 7 }, (_, index) => ({
  badge: index === 0 ? '3' : undefined,
  content: <PanelContent title={`Tab ${String(index + 1)}`} />,
  icon: <CubeIcon />,
  id: `tab-${String(index + 1)}`,
  label: 'Tab',
}));

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    componentCanvas: {
      width: 900,
    },
    docs: {
      description: {
        component: `
Tabs organizam multiplas secoes de conteudo no mesmo contexto de pagina e controlam a troca do painel ativo.

Use quando as secoes sao equivalentes, relacionadas e a pessoa precisa alternar entre elas sem navegar para outra pagina. Nao use Tabs para etapas sequenciais, menus globais, filtros simples ou conteudos que precisam ficar visiveis ao mesmo tempo.

Responsividade:
Este componente foi desenvolvido com comportamento responsivo nativo, adaptando espacamentos, alinhamento, largura, quebra de conteudo e areas de toque para diferentes tamanhos de tela. A responsividade e aplicada na implementacao do componente e nao depende de variacoes manuais no Storybook. Em telas pequenas, a lista de tabs preserva a hierarquia visual e usa rolagem horizontal interna para evitar overflow da pagina.

Tokens:
Cores, foco, espacamento, bordas, iconografia e tipografia usam variaveis CSS geradas pelos tokens do Figma. Como nao existe token roxo na base atual, o estado selecionado usa o token de identidade disponivel no DS.

Acessibilidade:
- Usa role="tablist", role="tab" e role="tabpanel".
- Cada tab informa aria-selected e aria-controls.
- O painel ativo informa aria-labelledby.
- Navegacao por teclado suporta ArrowLeft, ArrowRight, Home e End.
- Tabs desabilitadas usam disabled nativo e sao ignoradas na navegacao por setas.
- O modo automatic troca conteudo ao navegar com setas; o modo manual apenas move foco.
`,
      },
    },
    layout: 'fullscreen',
  },
  argTypes: {
    activationMode: {
      control: 'select',
      description: 'Define se setas selecionam automaticamente ou apenas movem foco.',
      options: ['automatic', 'manual'],
    },
    ariaLabel: {
      control: 'text',
      description: 'Rotulo acessivel da lista de tabs.',
    },
    className: {
      control: 'text',
      description: 'Classe CSS opcional aplicada ao elemento raiz.',
    },
    defaultValue: {
      control: 'text',
      description: 'Tab inicial em uso nao controlado.',
    },
    items: {
      control: 'object',
      description: 'Lista de tabs com id, label, conteudo, icone, badge e disabled.',
    },
    onKeyDown: {
      control: false,
      description: 'Callback opcional de teclado no tablist.',
    },
    onValueChange: {
      control: false,
      description: 'Callback chamado quando a tab selecionada muda.',
    },
    panelClassName: {
      control: 'text',
      description: 'Classe CSS opcional aplicada ao painel ativo.',
    },
    value: {
      control: 'text',
      description: 'Valor controlado da tab ativa.',
    },
    variant: {
      control: 'select',
      description: 'Densidade e direcao visual da tab.',
      options: ['standard', 'compact'],
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: defaultItems,
  },
  render: (args) => (
    <div className="tabs-story-surface">
      <div className="tabs-story-panel">
        <Tabs {...args} />
      </div>
    </div>
  ),
};

export const Standard: Story = {
  args: {
    items: sevenItems,
    variant: 'standard',
  },
  render: (args) => (
    <div className="tabs-story-surface">
      <div className="tabs-story-panel">
        <Tabs {...args} />
      </div>
    </div>
  ),
};

export const Compact: Story = {
  args: {
    items: sevenItems,
    variant: 'compact',
  },
  render: (args) => (
    <div className="tabs-story-surface">
      <div className="tabs-story-panel">
        <Tabs {...args} />
      </div>
    </div>
  ),
};

export const Densities: Story = {
  args: {
    items: sevenItems,
  },
  render: () => (
    <div className="tabs-story-surface">
      <div className="tabs-story-panel tabs-story-stack">
        <Tabs items={sevenItems} variant="standard" />
        <Tabs items={sevenItems} variant="compact" />
      </div>
    </div>
  ),
};
