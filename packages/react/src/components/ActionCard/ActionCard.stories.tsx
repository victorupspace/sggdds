import type { Meta, StoryObj } from '@storybook/react-vite';

import { Badge } from '../Badge';
import { ActionCard } from './ActionCard';

const widgetsIcon = (
  <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
    <path
      d="M16.725 12L12.025 7.3L16.725 2.6L21.425 7.3L16.725 12ZM3.8 10.475V3.825H10.45V10.475H3.8ZM13.525 20.2V13.55H20.175V20.2H13.525ZM3.8 20.2V13.55H10.45V20.2H3.8ZM4.95 9.35H9.325V4.95H4.95V9.35ZM16.775 10.475L19.9 7.375L16.775 4.25L13.65 7.375L16.775 10.475ZM14.65 19.05H19.05V14.675H14.65V19.05ZM4.95 19.05H9.325V14.675H4.95V19.05Z"
      fill="currentColor"
    />
  </svg>
);

const meta = {
  title: 'Web Components/Action Card',
  component: ActionCard,
  parameters: {
    componentCanvas: {
      width: 300,
    },
    docs: {
      description: {
        component: `
O Action Card é um card acionável para escolhas e atalhos, seguindo o layout do Figma (Web Components / Action Card).

Anatomia:
- Cabeçalho com ícone em círculo pure-black (56px) e título SemiBold 16.
- Badge opcional entre o cabeçalho e a descrição.
- Descrição em 14/20 com cor secundária.

Estados do Figma:
- Default: superfície branca, borda neutra e elevação nível 1.
- Hover (apenas em dispositivos com ponteiro): superfície neutral/default e elevação nível 2.
- Selected: borda pure-black (aria-pressed no modo botão, aria-current no modo link).
- Focus: anel de foco do Design System.

Semântica:
- Com onClick renderiza um botão; com href renderiza um link; sem ambos, um article estático com heading.

Tokens: superfícies e bordas usam color/background/neutral e pure-black, tipografia usa text-style/content color/typography, espaçamentos usam Component sizing. A borda default do Figma (color/border/default) ainda não existe nas collections e usa border/neutral/subtle como equivalente.

Responsividade: o card é fluido (100% do contêiner) com quebra de texto segura; o estado hover fica restrito a mídia com ponteiro para evitar hover preso no touch. Em grades, use auto-fill/minmax para empilhar no mobile, como na story Grid.
`,
      },
    },
    layout: 'fullscreen',
  },
  argTypes: {
    badge: {
      control: false,
      description: 'Badge opcional exibida entre o cabeçalho e a descrição.',
    },
    className: {
      control: 'text',
      description: 'Classe CSS opcional aplicada ao elemento raiz.',
    },
    description: {
      control: 'text',
      description: 'Texto de apoio exibido abaixo do cabeçalho.',
    },
    headingLevel: {
      control: 'inline-radio',
      options: [2, 3, 4, 5, 6],
      description: 'Nível do heading no modo estático (sem onClick/href).',
    },
    href: {
      control: 'text',
      description: 'Torna o card um link; tem precedência sobre onClick.',
    },
    icon: {
      control: false,
      description: 'Ícone exibido dentro do círculo pure-black do cabeçalho.',
    },
    onClick: {
      control: false,
      description: 'Torna o card um botão acionável.',
    },
    selected: {
      control: 'boolean',
      description: 'Estado Selected do Figma (borda pure-black).',
    },
    title: {
      control: 'text',
      description: 'Título do card.',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ActionCard>;

export default meta;

type Story = StoryObj<typeof meta>;

const baseArgs = {
  title: 'Lorem\nIpsum dor simmet',
  description: 'Place here the content for the body part of the component',
  icon: widgetsIcon,
  badge: (
    <Badge size="small" variant="neutral">
      Label
    </Badge>
  ),
};

export const Default: Story = {
  args: {
    ...baseArgs,
    onClick: () => undefined,
  },
};

export const Selected: Story = {
  args: {
    ...baseArgs,
    selected: true,
    onClick: () => undefined,
  },
};

export const AsLink: Story = {
  args: {
    ...baseArgs,
    href: '#servico',
  },
};

export const WithoutBadge: Story = {
  args: {
    title: 'Consultar solicitação',
    description: 'Acompanhe o andamento do seu pedido em tempo real.',
    icon: widgetsIcon,
    onClick: () => undefined,
  },
};

export const Static: Story = {
  args: {
    ...baseArgs,
  },
};

export const Grid: Story = {
  args: {
    ...baseArgs,
    onClick: () => undefined,
  },
  parameters: {
    componentCanvas: {
      width: 960,
    },
  },
  render: (args) => (
    <div
      style={{
        display: 'grid',
        gap: 16,
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
      }}
    >
      <ActionCard {...args} />
      <ActionCard {...args} selected title={'Card selecionado'} />
      <ActionCard {...args} title={'Outro serviço disponível'} />
    </div>
  ),
};

export const MobileWidth: Story = {
  args: {
    ...baseArgs,
    onClick: () => undefined,
  },
  parameters: {
    componentCanvas: {
      width: 328,
    },
  },
};
