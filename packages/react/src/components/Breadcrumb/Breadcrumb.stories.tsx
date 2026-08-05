import type { Meta, StoryObj } from '@storybook/react-vite';

import { Breadcrumb } from './Breadcrumb';
import './Breadcrumb.stories.css';

const figmaItems = [
  { href: '#nivel-1', label: 'Opcao' },
  { href: '#nivel-2', label: 'Opcao' },
  { href: '#nivel-3', label: 'Opcao' },
  { href: '#nivel-4', label: 'Opcao' },
  { href: '#nivel-5', label: 'Opcao' },
  { label: 'Opcao' },
];

const realItems = [
  { href: '#servicos', label: 'Servicos' },
  { href: '#cidadao', label: 'Cidadao' },
  { label: 'Agendamento' },
];

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
O Breadcrumb reproduz o layout do Figma (Web Components / Breadcrumbs): barra de largura total com fundo branco e bordas superior e inferior, botao de home (Icon Button Ghost de 32px com o icone vermelho da marca), separadores "/" e a trilha de niveis.

Anatomia:
- First block (showHome): botao circular de home seguido de separador.
- Links: cada nivel em Body/Extra Small (Plus Jakarta Sans Medium 12, typography/secondary); a pagina atual usa Body/Extra Small Bold (SemiBold 12, typography/primary) e nao e link.
- Separadores "/" em Plus Jakarta Sans Medium 14 com color/pure-black.

Tokens: fundo color/white, bordas color/neutral/grey-200, paddings spacing/12 e spacing/40, gap spacing/8, padding vertical dos links [core]/spacing/4, radius do botao border/radius/radius-full e labels truncados em 330px como no Figma. O icone home usa brand/red (#ff161f), fill exato do vetor exportado.

Responsividade: a barra e fluida (100%); labels truncam com reticencias (330px no desktop, 160px abaixo de 640px), o padding lateral reduz para spacing/16 no mobile e a trilha rola horizontalmente sem barra visivel quando nao cabe, mantendo todos os niveis alcancaveis.

Acessibilidade: nav com aria-label e lista ordenada; a pagina atual usa aria-current="page" e nao e renderizada como link; o icone de home e decorativo com nome acessivel no proprio link; separadores usam aria-hidden; foco visivel com o focus ring do DS.
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
    homeHref: {
      control: 'text',
      description: 'Destino do link de inicio.',
    },
    homeLabel: {
      control: 'text',
      description: 'Rotulo acessivel do botao de home.',
    },
    items: {
      control: 'object',
      description: 'Niveis da trilha; o ultimo (ou o marcado com current) e a pagina atual.',
    },
    showHome: {
      control: 'boolean',
      description: 'Exibe o bloco inicial com o botao de home (showFirstBlock no Figma).',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Breadcrumb>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: figmaItems,
  },
  render: (args) => (
    <div className="breadcrumb-story-shell">
      <Breadcrumb {...args} />
    </div>
  ),
};

export const RealContent: Story = {
  args: {
    items: realItems,
  },
  render: (args) => (
    <div className="breadcrumb-story-shell">
      <Breadcrumb {...args} />
    </div>
  ),
};

export const WithoutHome: Story = {
  args: {
    items: realItems,
    showHome: false,
  },
  render: (args) => (
    <div className="breadcrumb-story-shell">
      <Breadcrumb {...args} />
    </div>
  ),
};

export const LongLabels: Story = {
  args: {
    items: [
      {
        href: '#orgao',
        label: 'Secretaria Municipal de Inovacao, Tecnologia e Transformacao Digital',
      },
      {
        href: '#programa',
        label: 'Programa de Modernizacao do Atendimento ao Cidadao em Todas as Regioes',
      },
      { label: 'Relatorio consolidado de indicadores de atendimento digital' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Labels maiores que 330px sao truncados com reticencias, como no Figma.',
      },
    },
  },
  render: (args) => (
    <div className="breadcrumb-story-shell">
      <Breadcrumb {...args} />
    </div>
  ),
};
