import type { Meta, StoryObj } from '@storybook/react-vite';

import { Meganav } from './Meganav';
import type { MeganavItem } from './Meganav.types';
import './Meganav.stories.css';

const portalItems: MeganavItem[] = [
  {
    description: 'Acesse noticias, comunicados e atualizacoes do portal.',
    href: '#blog',
    icon: 'article',
    label: 'Blog',
  },
  {
    description: 'Servicos e jornadas usados com mais frequencia pelo cidadao.',
    href: '#servicos',
    icon: 'bolt',
    items: [
      { href: '#agendamento', label: 'Agendamento' },
      { href: '#segunda-via', label: 'Segunda via' },
      { href: '#protocolos', label: 'Protocolos' },
    ],
    label: 'Servicos digitais',
  },
  {
    description: 'Aprenda a usar novos recursos e acompanhar solicitacoes.',
    href: '#videos',
    icon: 'play_circle',
    label: 'Tutoriais em video',
  },
  {
    description: 'Guias, normas, perguntas frequentes e documentacao tecnica.',
    href: '#documentacao',
    icon: 'description',
    label: 'Documentacao',
  },
  {
    description: 'Canais de atendimento, suporte e respostas para duvidas.',
    href: '#suporte',
    icon: 'support_agent',
    label: 'Ajuda e suporte',
  },
];

const featured = {
  actions: [
    { href: '#dispensar', label: 'Dispensar' },
    { href: '#novidades', label: 'Novidades' },
  ],
  description: 'A nova area de servicos organiza protocolos, agendamentos e documentos recentes.',
  eyebrow: 'Atualizacao',
  mediaIcon: 'play_circle',
  title: 'Nova navegacao do portal disponivel',
};

const meta = {
  title: 'Web Components/Meganav',
  component: Meganav,
  parameters: {
    componentCanvas: {
      width: 1280,
    },
    docs: {
      description: {
        component: `
Meganav e a navegacao dedicada para areas globais acionadas pelo Header. O componente abre uma gaveta de navegacao com links ricos, grupos internos e uma area opcional de destaque.

Use para menus principais que precisam mostrar mais contexto do que uma lista simples: descricao dos destinos, agrupamento de jornadas, chamadas editoriais e atalhos frequentes.

Nao use para menus pequenos com uma ou duas opcoes, dropdowns de formulario ou navegacao local de conteudo.

Anatomia:
- Trigger com Material Symbols e estados de aria-expanded.
- Gaveta responsiva com nav semantico.
- Itens com label, descricao, icone e estado atual.
- Grupos com navegacao interna.
- Area featured opcional com midia, texto e acoes.

Responsividade:
No desktop, a gaveta abre como popover amplo alinhado ao trigger. No mobile, a gaveta ocupa a lateral ou a tela inteira em viewports estreitos, com cabecalho fixo e botao de fechar.

Tokens:
Cores, superficies, bordas, radius, shadow, espacamentos, tipografia, foco e estados usam variaveis CSS dos tokens do Figma. O visual do trigger prioriza soft black e neutros sem depender de cores hardcoded.

Acessibilidade:
- Trigger usa aria-controls e aria-expanded.
- Conteudo da gaveta e montado apenas quando aberto.
- Navegacao usa nav com aria-label.
- Links atuais usam aria-current.
- Escape e clique fora fecham a gaveta.
- Estados de foco sao visiveis para teclado.
`,
      },
    },
    layout: 'fullscreen',
  },
  argTypes: {
    align: {
      control: 'select',
      description: 'Alinhamento horizontal da gaveta no desktop.',
      options: ['start', 'end', 'stretch'],
    },
    ariaLabel: {
      control: 'text',
      description: 'Nome acessivel do nav interno.',
    },
    defaultOpen: {
      control: 'boolean',
      description: 'Estado inicial quando o componente nao e controlado.',
    },
    featured: {
      control: 'object',
      description: 'Area opcional de destaque exibida ao lado ou abaixo dos links.',
    },
    items: {
      control: 'object',
      description: 'Itens e grupos de navegacao.',
    },
    open: {
      control: 'boolean',
      description: 'Controla abertura da gaveta.',
    },
    triggerLabel: {
      control: 'text',
      description: 'Texto visivel do trigger.',
    },
    triggerVariant: {
      control: 'select',
      description: 'Estilo do trigger para uso solto ou dentro do Header.',
      options: ['button', 'navigation'],
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Meganav>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultOpen: true,
    featured,
    items: portalItems,
    triggerLabel: 'Navegar',
  },
  render: (args) => (
    <div className="meganav-story-shell">
      <div className="meganav-story-frame">
        <Meganav {...args} />
      </div>
    </div>
  ),
};

export const HeaderTrigger: Story = {
  args: {
    defaultOpen: true,
    featured,
    items: portalItems.slice(0, 3),
    triggerLabel: 'Servicos',
    triggerVariant: 'navigation',
  },
  render: (args) => (
    <div className="meganav-story-shell">
      <div className="meganav-story-frame">
        <div className="meganav-story-header">
          <span className="meganav-story-brand">SP.GOV.BR</span>
          <Meganav {...args} />
        </div>
      </div>
    </div>
  ),
};

export const MobileOpen: Story = {
  args: {
    defaultOpen: true,
    featured,
    items: portalItems,
    mobileTitle: 'Menu principal',
    triggerLabel: 'Menu',
  },
  parameters: {
    componentCanvas: {
      width: 390,
    },
    docs: {
      description: {
        story:
          'No mobile, a navegacao abre em formato de gaveta com cabecalho fixo, fechamento explicito e conteudo em uma coluna.',
      },
    },
  },
  render: (args) => (
    <div className="meganav-story-shell">
      <div className="meganav-story-frame">
        <Meganav {...args} />
      </div>
    </div>
  ),
};
