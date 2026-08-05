import type { Meta, StoryObj } from '@storybook/react-vite';

import { Badge } from '../Badge';
import { Button } from '../Button';
import { Hero } from './Hero';
import './Hero.stories.css';

/* Chevrons dos Buttons no Figma (vetores exportados, caixa de 24px) */
function ChevronLeftIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6.14645 0.146447C6.34171 -0.0488155 6.65822 -0.0488155 6.85348 0.146447C7.0487 0.341712 7.04873 0.658228 6.85348 0.853478L1.20699 6.49996L6.85348 12.1464C7.0487 12.3417 7.04873 12.6582 6.85348 12.8535C6.65823 13.0487 6.34171 13.0487 6.14645 12.8535L0.146447 6.85348C-0.0488155 6.65822 -0.0488155 6.34171 0.146447 6.14645L6.14645 0.146447Z"
        fill="currentColor"
        transform="translate(8.5 5.5)"
      />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0.146447 0.146447C0.341709 -0.0488155 0.658216 -0.0488155 0.853478 0.146447L6.85348 6.14645C7.0487 6.34171 7.04873 6.65823 6.85348 6.85348L0.853478 12.8535C0.658228 13.0487 0.341712 13.0487 0.146447 12.8535C-0.0488153 12.6582 -0.0488153 12.3417 0.146447 12.1464L5.79293 6.49996L0.146447 0.853478C-0.0488155 0.658216 -0.0488155 0.341709 0.146447 0.146447Z"
        fill="currentColor"
        transform="translate(8.5 5.5)"
      />
    </svg>
  );
}

const defaultBadge = (
  <Badge size="small" variant="neutral">
    Label
  </Badge>
);

const defaultActions = (
  <>
    <Button iconEnd={<ChevronRightIcon />} iconStart={<ChevronLeftIcon />} variant="primary">
      Button
    </Button>
    <Button iconEnd={<ChevronRightIcon />} iconStart={<ChevronLeftIcon />} variant="secondary">
      Button
    </Button>
  </>
);

function SlotPlaceholder() {
  return (
    <span className="hero-story-slot">
      Sou um slot. Remova este texto e selecione para adicionar componentes
    </span>
  );
}

const meta = {
  title: 'Web Components/Hero',
  component: Hero,
  parameters: {
    componentCanvas: {
      width: 1280,
    },
    docs: {
      description: {
        component: `
O Hero reproduz o layout do Figma (Web Components / Hero): seção de destaque com fundo color/white e altura mínima de 280px.

Variantes (propriedade type no Figma):
- default: conteúdo à esquerda (máximo de 600px) e slot livre à direita para imagens, ilustrações ou componentes.
- center: coluna única centralizada, com o slot abaixo — ideal para mensagens de impacto sem mídia.

Anatomia: badge opcional (componha com o Badge do DS — Neutral Solid Small no Figma), título Display - Sm (Plus Jakarta Sans Regular 40 em color/soft-black), descrições Body/Medium (Medium 16 em color/neutral/grey-600) e slot de CTAs (componha com o Button do DS; máximo de 2, um primário e um secundário).

Tokens: paddings e gaps usam Component sizing (16/20/24/40/64) e spacing (10/16), exatamente como as variables do Figma.

Responsividade: abaixo de 768px o layout default empilha o conteúdo sobre o slot e o padding lateral reduz para Component sizing/16; os CTAs quebram automaticamente.

Diretrizes do Figma: use como primeiro bloco da página, títulos de até 8 palavras, no máximo 2 CTAs e imagens de alta qualidade (16:9 ou 4:3) no slot da variante default.
`,
      },
    },
    layout: 'fullscreen',
  },
  argTypes: {
    actions: {
      control: false,
      description: 'Slot dos CTAs (componha com o Button do DS).',
    },
    ariaLabel: {
      control: 'text',
      description: 'Nome acessível opcional da section.',
    },
    badge: {
      control: false,
      description: 'Slot da badge acima do título (componha com o Badge do DS).',
    },
    children: {
      control: false,
      description: 'Slot Right content para imagens, ilustrações ou componentes.',
    },
    className: {
      control: 'text',
      description: 'Classe CSS opcional aplicada à section.',
    },
    description: {
      control: 'text',
      description: 'Descrição principal (até 2 linhas).',
    },
    headingLevel: {
      control: 'select',
      description: 'Nível semântico do título (H1 por padrão).',
      options: [1, 2, 3],
    },
    secondDescription: {
      control: 'text',
      description: 'Segunda descrição opcional.',
    },
    title: {
      control: 'text',
      description: 'Título principal (até 8 palavras).',
    },
    variant: {
      control: 'inline-radio',
      description: 'type no Figma: default (slot à direita) ou center.',
      options: ['default', 'center'],
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Hero>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    actions: defaultActions,
    badge: defaultBadge,
    description: 'Main description for the hero component',
    secondDescription: 'Second description for the hero component',
    title: 'Main hero title',
  },
  render: (args) => (
    <div className="hero-story-shell">
      <Hero {...args}>
        <SlotPlaceholder />
      </Hero>
    </div>
  ),
};

export const Center: Story = {
  args: {
    actions: defaultActions,
    badge: defaultBadge,
    description: 'Main description for the hero component',
    secondDescription: 'Second description for the hero component',
    title: 'Main hero title',
    variant: 'center',
  },
  render: (args) => (
    <div className="hero-story-shell">
      <Hero {...args}>
        <SlotPlaceholder />
      </Hero>
    </div>
  ),
};

export const WithMedia: Story = {
  args: {
    actions: defaultActions,
    badge: defaultBadge,
    description: 'Acompanhe protocolos, agendamentos e documentos em um só lugar.',
    title: 'Serviços digitais para o cidadão',
  },
  render: (args) => (
    <div className="hero-story-shell">
      <Hero {...args}>
        <span aria-hidden="true" className="hero-story-media" />
      </Hero>
    </div>
  ),
};

export const Minimal: Story = {
  args: {
    actions: (
      <Button iconEnd={<ChevronRightIcon />} variant="primary">
        Acessar serviços
      </Button>
    ),
    description: 'Uma mensagem de impacto com um único CTA.',
    title: 'Landing focada em conversão',
    variant: 'center',
  },
  render: (args) => (
    <div className="hero-story-shell">
      <Hero {...args} />
    </div>
  ),
};
