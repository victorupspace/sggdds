import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';

import { CookieConsentBanner } from './CookieConsentBanner';
import './CookieConsentBanner.stories.css';

const meta = {
  title: 'Web Components/Cookie Consent Banner',
  component: CookieConsentBanner,
  parameters: {
    componentCanvas: {
      width: 1280,
    },
    docs: {
      description: {
        component: `
O Cookie Consent Banner comunica o uso de cookies e oferece acoes claras para aceitar todos os cookies ou gerenciar preferencias.

Use em paginas publicas, portais e produtos digitais que precisam coletar consentimento de cookies de forma objetiva, responsiva e acessivel.

Nao use como alerta generico, toast temporario, modal de confirmacao ou substituto para uma central completa de preferencias de privacidade.

Anatomia:
- Card fixo responsivo.
- Icone de cookie em Material Symbols.
- Titulo curto e direto.
- Mensagem explicativa com link para politica de cookies.
- CTA primario "Permitir todos" usando Button.
- CTA secundario "Gerenciar cookies" usando Button com tratamento neutro.

Responsividade:
No desktop, o banner usa composicao horizontal com icone ao lado do conteudo. Em telas menores, o layout empilha icone, texto e acoes, preservando leitura, quebra de linha e area minima de toque.

Tokens:
Cores, superficie, borda, radius, sombra, espacamentos, tipografia, foco e estados usam variaveis CSS dos tokens do Figma. O CTA secundario usa o componente Button existente com aliases locais para uma aparencia neutra.

Acessibilidade:
- A raiz usa section com role region e nome acessivel.
- O link de politica possui foco visivel.
- CTAs sao componentes Button do Design System.
- O banner pode ser controlado por isOpen/onOpenChange ou usado de forma nao controlada com defaultOpen.
`,
      },
    },
    layout: 'fullscreen',
  },
  argTypes: {
    allowAllLabel: {
      control: 'text',
      description: 'Texto do CTA de aceite total.',
    },
    ariaLabel: {
      control: 'text',
      description: 'Nome acessivel da regiao do banner.',
    },
    children: {
      control: false,
      description:
        'Conteudo customizado da mensagem. Quando ausente, usa texto padrao em portugues.',
    },
    closeOnAllowAll: {
      control: 'boolean',
      description: 'Fecha o banner automaticamente apos clicar em Permitir todos.',
    },
    closeOnManageCookies: {
      control: 'boolean',
      description: 'Fecha o banner automaticamente apos clicar em Gerenciar cookies.',
    },
    defaultOpen: {
      control: 'boolean',
      description: 'Estado inicial quando o componente nao e controlado.',
    },
    icon: {
      control: false,
      description: 'Icone customizado opcional.',
    },
    isOpen: {
      control: 'boolean',
      description: 'Controla a visibilidade do banner.',
    },
    manageCookiesHref: {
      control: 'text',
      description: 'Href opcional para renderizar o CTA de gerenciamento como link.',
    },
    manageCookiesLabel: {
      control: 'text',
      description: 'Texto do CTA de gerenciamento.',
    },
    policyHref: {
      control: 'text',
      description: 'URL da politica de cookies.',
    },
    policyLabel: {
      control: 'text',
      description: 'Texto do link da politica.',
    },
    position: {
      control: 'select',
      description: 'Posicionamento fixo do banner.',
      options: ['bottom', 'bottom-left', 'bottom-right'],
    },
    title: {
      control: 'text',
      description: 'Titulo principal do banner.',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CookieConsentBanner>;

export default meta;

type Story = StoryObj<typeof meta>;

function StoryShell({ children }: { children: ReactNode }) {
  return (
    <div className="cookie-consent-story-shell">
      <div className="cookie-consent-story-page" aria-hidden="true">
        <h2>Portal de servicos</h2>
        <p>Conteudo de apoio apenas para demonstrar a posicao fixa do banner sobre a pagina.</p>
      </div>
      {children}
    </div>
  );
}

export const Default: Story = {
  args: {
    defaultOpen: true,
  },
  render: (args) => (
    <StoryShell>
      <CookieConsentBanner {...args} />
    </StoryShell>
  ),
};

export const BottomLeft: Story = {
  args: {
    defaultOpen: true,
    position: 'bottom-left',
  },
  render: Default.render,
};

export const ManageAsLink: Story = {
  args: {
    defaultOpen: true,
    manageCookiesHref: '#preferencias',
  },
  render: Default.render,
};

export const Mobile: Story = {
  args: {
    defaultOpen: true,
  },
  parameters: {
    componentCanvas: {
      width: 390,
    },
  },
  render: Default.render,
};
