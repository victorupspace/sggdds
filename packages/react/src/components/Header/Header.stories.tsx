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
    label: 'Option',
  },
  { href: '#option-2', label: 'Option' },
  { href: '#option-3', label: 'Option' },
  { href: '#option-4', label: 'Option' },
];

const userMenuItems = [
  { href: '#minha-conta', label: 'Minha conta' },
  { href: '#configuracoes', label: 'Configurações' },
  { href: '#sair', label: 'Sair' },
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
O Header reproduz o layout do Figma (Web Components / Header): duas barras de 80px com fundo navbar/color/background e divisor navbar/color/border.

Anatomia:
- Top content: logo SP.GOV.BR a esquerda e o selo Portal de Servicos ao Cidadao a direita (assets exatos do Figma, ambos com slots customizaveis).
- Bottom content: Nav Items (14px com o chevron keyboard_arrow_down de 18px, gap spacing/32; itens com children abrem o Meganav) e, a direita, os icones utilitarios search/translate/accessibility_new (botoes de 40px com radius-full e os glifos exportados) mais a area de conta.
- Conta (propriedade account do Figma): deslogado exibe o botao gov.br (ButtonGov do DS); com a prop user exibe o User Menu (Avatar do DS + nome + seta) que abre o painel de largura total com Minha conta/Configuracoes/Sair.

Tokens: navbar/color/background e navbar/color/border, espacamentos spacing/4|8|16|20|24|32 e Component sizing, radius-full nos controles circulares e o focus ring do DS. Os textos do Figma em Inter foram normalizados para Plus Jakarta Sans pela politica de fonte unica.

Responsividade (variante type=Mobile do Figma): abaixo de 768px o topo vira duas linhas — logo SP.GOV.BR e, abaixo, o selo do Portal com os icones, avatar e o botao de menu — e a navegacao abre pelo menu, empilhada.

Acessibilidade: header semantico com nav e aria-label, menu do usuario com aria-haspopup/expanded e role menu, icones com rotulos acessiveis e foco visivel em todos os controles.
`,
      },
    },
    layout: 'fullscreen',
  },
  argTypes: {
    accountAction: {
      control: false,
      description: 'Ação de conta deslogada (botão gov.br).',
    },
    className: {
      control: 'text',
      description: 'Classe CSS opcional aplicada ao header.',
    },
    navigationItems: {
      control: false,
      description: 'Itens de navegação; itens com children abrem o Meganav.',
    },
    onMenuOpenChange: {
      control: false,
      description: 'Callback do menu mobile.',
    },
    primaryLogo: {
      control: false,
      description: 'Slot do logo SP.GOV.BR.',
    },
    secondaryLogo: {
      control: false,
      description: 'Slot do selo Portal de Serviços.',
    },
    user: {
      control: false,
      description: 'Usuário logado (account=Logged in no Figma): exibe o User Menu.',
    },
    utilityItems: {
      control: false,
      description: 'Ícones utilitários (search, translate, accessibility_new).',
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
      <Header {...args} />
    </div>
  ),
};

export const LoggedIn: Story = {
  args: {
    navigationItems,
    user: {
      menuItems: userMenuItems,
      name: 'Nome',
    },
  },
  render: (args) => (
    <div className="header-story-shell">
      <Header {...args} />
    </div>
  ),
};

export const WithMeganav: Story = {
  args: {
    navigationItems,
  },
  parameters: {
    docs: {
      description: {
        story: 'Itens de navegação com children abrem o Meganav do DS.',
      },
    },
  },
  render: (args) => (
    <div className="header-story-shell header-story-shell--tall">
      <Header {...args} />
    </div>
  ),
};
