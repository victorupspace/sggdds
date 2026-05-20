import type { Meta, StoryObj } from '@storybook/react-vite';

import { Carousel } from './Carousel';
import type { CarouselCardItem } from './Carousel.types';
import './Carousel.stories.css';

function Media({ tone = 'neutral' }: { tone?: 'brand' | 'info' | 'neutral' }) {
  return (
    <span className={['carousel-story-media', `carousel-story-media--${tone}`].join(' ')}>
      <span aria-hidden="true" />
    </span>
  );
}

const items: CarouselCardItem[] = [
  {
    ariaLabel: 'Destaque sobre servicos digitais',
    badge: { label: 'Novo', variant: 'information' },
    description:
      'Acesse jornadas digitais organizadas por tema, com orientacoes claras para cada etapa.',
    id: 'servicos-digitais',
    media: <Media tone="info" />,
    primaryAction: { href: '#servicos', label: 'Acessar' },
    secondaryAction: { href: '#detalhes-servicos', label: 'Saiba mais' },
    title: 'Servicos digitais em destaque',
    tone: 'info',
  },
  {
    ariaLabel: 'Destaque sobre atendimento ao cidadao',
    badge: { label: 'Atendimento', variant: 'neutral' },
    description:
      'Consulte canais oficiais, acompanhe protocolos e encontre suporte para suas solicitacoes.',
    id: 'atendimento',
    media: <Media />,
    primaryAction: { href: '#atendimento', label: 'Ver canais' },
    title: 'Atendimento ao cidadao',
  },
  {
    ariaLabel: 'Destaque sobre comunicados importantes',
    badge: { label: 'Comunicado', variant: 'negative' },
    description:
      'Fique por dentro de prazos, comunicados oficiais e mudancas em servicos essenciais.',
    id: 'comunicados',
    media: <Media tone="brand" />,
    primaryAction: { href: '#comunicados', label: 'Ler comunicado' },
    title: 'Comunicados importantes',
    tone: 'brand',
  },
  {
    ariaLabel: 'Destaque sobre dados e transparencia',
    badge: { label: 'Transparencia', variant: 'positive' },
    description: 'Explore informacoes publicas, paineis e indicadores para acompanhar a gestao.',
    id: 'transparencia',
    media: <Media tone="info" />,
    primaryAction: { href: '#transparencia', label: 'Explorar' },
    title: 'Dados e transparencia',
    tone: 'success',
  },
  {
    ariaLabel: 'Destaque sobre agendamentos',
    badge: { label: 'Agenda', variant: 'notice' },
    description: 'Encontre unidades de atendimento, horarios disponiveis e documentos necessarios.',
    id: 'agendamentos',
    media: <Media />,
    primaryAction: { href: '#agendamentos', label: 'Agendar' },
    title: 'Agendamentos e unidades',
    tone: 'warning',
  },
];

const meta = {
  title: 'Web Components/Carousel',
  component: Carousel,
  parameters: {
    componentCanvas: {
      width: 1280,
    },
    docs: {
      description: {
        component: `
O Carousel e uma composicao de cards do Design System para destacar uma sequencia curta de conteudos relacionados, com navegacao por setas e indicadores clicaveis.

Use para destaques editoriais, servicos prioritarios, comunicados, campanhas ou grupos pequenos de cards em que a pessoa usuaria pode navegar sem sair do contexto.

Nao use para listas longas, dados tabulares, feed infinito ou conteudos essenciais que precisam estar todos visiveis ao mesmo tempo.

Anatomia:
- Area central com cards renderizados pelo componente Card existente.
- Controles laterais de card anterior e proximo.
- Indicadores clicaveis centralizados.
- Status acessivel com aria-live.

Responsividade:
No desktop, o padrao exibe um card centralizado. A prop visibleItems define o maximo de cards visiveis por grupo, e o componente reduz automaticamente essa quantidade quando a area disponivel nao comporta cards com largura adequada. Em telas menores, a composicao preserva a largura util do Card e posiciona os controles abaixo da area de conteudo.

Tokens:
Cores, superficies, bordas, radius, espacamentos, sombra, tipografia, foco e estados usam variaveis CSS dos tokens do Figma. Os cards herdam os tokens e estados do componente Card.

Acessibilidade:
- A raiz usa section com aria-roledescription de carousel.
- Cada item usa role group com aria-roledescription de slide.
- Indicadores sao buttons com aria-pressed.
- Setas, Home e End navegam via teclado.
- Controles desabilitam no inicio/fim quando loop esta desligado.
`,
      },
    },
    layout: 'fullscreen',
  },
  argTypes: {
    defaultIndex: {
      control: 'number',
      description: 'Indice inicial quando o componente nao e controlado.',
    },
    disabled: {
      control: 'boolean',
      description: 'Desabilita controles e indicadores.',
    },
    items: {
      control: false,
      description: 'Lista de cards renderizados com o componente Card do Design System.',
    },
    loop: {
      control: 'boolean',
      description: 'Permite navegar do ultimo grupo para o primeiro.',
    },
    selectedIndex: {
      control: 'number',
      description: 'Indice selecionado quando o componente e controlado.',
    },
    showControls: {
      control: 'boolean',
      description: 'Exibe ou oculta setas de navegacao.',
    },
    showIndicators: {
      control: 'boolean',
      description: 'Exibe ou oculta indicadores clicaveis.',
    },
    visibleItems: {
      control: { min: 1, step: 1, type: 'number' },
      description:
        'Quantidade maxima de cards visiveis por grupo. O Carousel adapta esse valor para manter legibilidade e area de toque.',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Carousel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items,
  },
  render: (args) => (
    <div className="carousel-story-shell">
      <div className="carousel-story-frame">
        <Carousel {...args} />
      </div>
    </div>
  ),
};

export const Multiple: Story = {
  args: {
    items,
    visibleItems: 3,
  },
  render: Default.render,
};

export const Loop: Story = {
  args: {
    items,
    loop: true,
  },
  render: Default.render,
};

export const Mobile: Story = {
  args: {
    items,
    loop: true,
  },
  parameters: {
    componentCanvas: {
      width: 390,
    },
  },
  render: Default.render,
};
