import type { Meta, StoryObj } from '@storybook/react-vite';

import { Breadcrumb } from './Breadcrumb';
import './Breadcrumb.stories.css';

const defaultItems = [{ href: '#servicos', label: 'Unselected' }, { label: 'Selected' }];

const meta = {
  title: 'Web Components/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    componentCanvas: {
      width: 1040,
    },
    docs: {
      description: {
        component: `
Breadcrumbs sao navegacao secundaria que mostram a posicao atual da pessoa usuaria na hierarquia do site e oferecem acesso rapido aos niveis superiores.

Use quando a pagina faz parte de uma arquitetura com dois ou mais niveis e a pessoa precisa entender contexto, voltar para niveis pais ou comparar onde esta dentro do fluxo.

Nao use Breadcrumb como navegacao primaria, menu global, stepper de progresso ou trilha de acoes executadas. Para fluxos lineares, use Stepper.

Responsividade:
Este componente foi desenvolvido com comportamento responsivo nativo, adaptando espacamentos, alinhamento, largura, quebra de conteudo e areas de toque para diferentes tamanhos de tela. A responsividade e aplicada na implementacao do componente e nao depende de variacoes manuais no Storybook. Em hierarquias longas, o componente evita overflow horizontal da pagina com rolagem interna e pode colapsar niveis intermediarios por meio de maxVisibleItems.

Tokens:
Cores, foco, espacamento, iconografia, bordas, sombra do menu de overflow e tipografia usam variaveis CSS geradas pelos tokens do Figma. Como a camada semantica ainda esta em evolucao no projeto, o componente usa aliases internos semanticos apontando para os tokens disponiveis.

Acessibilidade:
- Renderiza nav com aria-label e lista ordenada.
- O item atual usa aria-current="page" e nao e renderizado como link.
- O icone de home e decorativo, mantendo nome acessivel via aria-label do link.
- Links preservam navegacao por teclado e foco visivel.
- O overflow de niveis intermediarios usa details/summary nativo e mantem os links acessiveis.
- Evite rotulos genericos; prefira nomes de paginas curtos e reconheciveis.
`,
      },
    },
    layout: 'fullscreen',
  },
  argTypes: {
    ariaLabel: {
      control: 'text',
      description: 'Rotulo acessivel do landmark de navegacao.',
    },
    className: {
      control: 'text',
      description: 'Classe CSS opcional aplicada ao elemento raiz.',
    },
    collapseLabel: {
      control: 'text',
      description: 'Rotulo acessivel do controle que mostra niveis intermediarios.',
    },
    homeHref: {
      control: 'text',
      description: 'Destino do link de inicio.',
    },
    homeLabel: {
      control: 'text',
      description: 'Nome acessivel do item de inicio.',
    },
    items: {
      control: 'object',
      description: 'Lista de niveis do breadcrumb. Projetado para ate 8 itens visiveis.',
    },
    maxVisibleItems: {
      control: 'select',
      description: 'Quantidade maxima de itens visiveis antes de colapsar niveis intermediarios.',
      options: [4, 5, 6, 7, 8],
    },
    showHome: {
      control: 'boolean',
      description: 'Exibe ou remove o item inicial com icone de home.',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Breadcrumb>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: defaultItems,
  },
  render: (args) => (
    <div className="breadcrumb-story-surface">
      <div className="breadcrumb-story-panel">
        <Breadcrumb {...args} />
      </div>
    </div>
  ),
};

export const EightLevels: Story = {
  args: {
    showHome: false,
    items: [
      { href: '#level-1', label: 'Level 1' },
      { href: '#level-2', label: 'Level 2' },
      { href: '#level-3', label: 'Level 3' },
      { href: '#level-4', label: 'Level 4' },
      { href: '#level-5', label: 'Level 5' },
      { href: '#level-6', label: 'Level 6' },
      { href: '#level-7', label: 'Level 7' },
      { label: 'Current' },
    ],
  },
  render: (args) => (
    <div className="breadcrumb-story-surface">
      <div className="breadcrumb-story-panel">
        <Breadcrumb {...args} />
      </div>
    </div>
  ),
};

export const Collapsed: Story = {
  args: {
    maxVisibleItems: 5,
    items: [
      { href: '#level-1', label: 'Level 1' },
      { href: '#level-2', label: 'Level 2' },
      { href: '#level-3', label: 'Level 3' },
      { href: '#level-4', label: 'Level 4' },
      { href: '#level-5', label: 'Level 5' },
      { label: 'Current' },
    ],
  },
  render: (args) => (
    <div className="breadcrumb-story-surface">
      <div className="breadcrumb-story-panel">
        <Breadcrumb {...args} />
      </div>
    </div>
  ),
};

export const WithoutHome: Story = {
  args: {
    showHome: false,
    items: [
      { href: '#level-1', label: 'Level 1' },
      { href: '#level-2', label: 'Level 2' },
      { label: 'Current' },
    ],
  },
  render: (args) => (
    <div className="breadcrumb-story-surface">
      <div className="breadcrumb-story-panel">
        <Breadcrumb {...args} />
      </div>
    </div>
  ),
};
