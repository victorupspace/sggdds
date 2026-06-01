import type { Meta, StoryObj } from '@storybook/react-vite';

import { Header } from './Header';
import './Header.stories.css';

const navigationItems = [
  {
    children: [
      { href: '#agendamento', label: 'Agendamento' },
      { href: '#segunda-via', label: 'Segunda via' },
      { href: '#protocolos', label: 'Protocolos' },
    ],
    label: 'Servicos',
  },
  {
    children: [
      { href: '#guias', label: 'Guias e orientacoes' },
      { href: '#noticias', label: 'Noticias' },
      { href: '#perguntas', label: 'Perguntas frequentes' },
    ],
    label: 'Informacoes',
  },
  { href: '#dados', label: 'Dados' },
  { href: '#regulacao', label: 'Regulacao' },
];

const meta = {
  title: 'Web Components/Header',
  component: Header,
  parameters: {
    componentCanvas: {
      width: 1280,
    },
    docs: {
      description: {
        component: `
O Header e uma composicao de alto nivel para identidade, navegacao primaria e utilitarios globais do website.

Use como hub principal de navegacao em produtos digitais governamentais, portais de servico e experiencias que precisam reunir marca, busca, acessibilidade, idioma e acesso de usuario.

Nao use Header dentro de cards, modais, paineis secundarios ou areas internas que nao representam a estrutura global da pagina.

Anatomia:
- Slot de marca primaria configuravel, usado por padrao para SP.GOV.BR.
- Slot de marca secundaria configuravel, usado por padrao para Portal de Servicos ao Cidadao.
- Navegacao primaria com links simples ou grupos expansivos via Meganav.
- Acoes utilitarias globais.
- CTA de conta/login.
- Botao de menu mobile.

Responsividade:
No desktop, o componente usa duas linhas: identidade no topo e navegacao/acoes abaixo. No mobile, a marca primaria permanece visivel, a marca secundaria pode ser omitida por espaco e a navegacao vira um painel controlado por botao com aria-expanded.

Tokens:
Cores, superficies, bordas, espacamentos, tipografia, foco e estados usam variaveis CSS geradas pelos tokens do Figma. Como a camada semantica ainda nao cobre todos os casos no projeto, o componente cria aliases internos semanticos apontando para tokens disponiveis.

Acessibilidade:
- Header usa elemento semantico header.
- Navegacao principal usa nav com aria-label.
- Menu mobile usa aria-controls e aria-expanded.
- Grupos de navegacao usam Meganav com aria-expanded, fechamento por Escape e clique fora.
- Acoes utilitarias possuem nomes acessiveis.
- CTA de conta reutiliza Button do Design System.
- Estados de foco sao visiveis para teclado.

Configuracao de logos:
primaryLogo e secondaryLogo aceitam qualquer ReactNode. Passe null para remover um dos slots, ou um elemento img/svg/texto para trocar a identidade sem alterar a estrutura.
`,
      },
    },
    layout: 'fullscreen',
  },
  argTypes: {
    accountAction: {
      control: 'object',
      description: 'Acao principal de conta/login.',
    },
    className: {
      control: 'text',
      description: 'Classe CSS opcional aplicada ao header.',
    },
    defaultMenuOpen: {
      control: 'boolean',
      description: 'Estado inicial do menu mobile quando nao controlado.',
    },
    menuOpen: {
      control: 'boolean',
      description: 'Controla abertura do menu mobile.',
    },
    navigationItems: {
      control: 'object',
      description: 'Lista de links ou grupos da navegacao principal.',
    },
    primaryLogo: {
      control: false,
      description: 'Slot configuravel para marca primaria. Passe null para ocultar.',
    },
    secondaryLogo: {
      control: false,
      description: 'Slot configuravel para marca secundaria. Passe null para ocultar.',
    },
    utilityItems: {
      control: 'object',
      description: 'Acoes utilitarias globais como busca, idioma e acessibilidade.',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    navigationItems,
  },
  render: (args) => (
    <div className="header-story-shell">
      <div className="header-story-frame">
        <Header {...args} />
      </div>
    </div>
  ),
};

export const PrimaryLogoOnly: Story = {
  args: {
    navigationItems,
    secondaryLogo: null,
  },
  render: (args) => (
    <div className="header-story-shell">
      <div className="header-story-frame">
        <Header {...args} />
      </div>
    </div>
  ),
};

export const SecondaryLogoOnly: Story = {
  args: {
    navigationItems,
    primaryLogo: null,
  },
  render: (args) => (
    <div className="header-story-shell">
      <div className="header-story-frame">
        <Header {...args} />
      </div>
    </div>
  ),
};

export const CustomLogos: Story = {
  args: {
    navigationItems,
    primaryLogo: <span className="header-story-logo">Minha Marca</span>,
    primaryLogoAriaLabel: 'Minha Marca',
    secondaryLogo: (
      <span>
        Ambiente de
        <br />
        <strong>Homologacao</strong>
      </span>
    ),
    secondaryLogoAriaLabel: 'Ambiente de Homologacao',
  },
  render: (args) => (
    <div className="header-story-shell">
      <div className="header-story-frame">
        <Header {...args} />
      </div>
    </div>
  ),
};

export const MobileOpen: Story = {
  args: {
    defaultMenuOpen: true,
    navigationItems,
  },
  parameters: {
    componentCanvas: {
      width: 390,
    },
    docs: {
      description: {
        story:
          'No mobile, a navegacao e as acoes globais ficam em um painel vertical controlado pelo botao de menu.',
      },
    },
  },
  render: (args) => (
    <div className="header-story-shell">
      <div className="header-story-mobile">
        <Header {...args} />
      </div>
    </div>
  ),
};
