import type { Meta, StoryObj } from '@storybook/react-vite';

import { Badge } from './Badge';
import type { BadgeAppearance, BadgeSize, BadgeVariant } from './Badge.types';

const variants: BadgeVariant[] = [
  'brand',
  'neutral',
  'information',
  'positive',
  'negative',
  'notice',
];

const appearances: BadgeAppearance[] = ['solid', 'subtle'];
const sizes: BadgeSize[] = ['small', 'medium', 'large'];

const variantLabels: Record<BadgeVariant, string> = {
  brand: 'Brand',
  information: 'Information',
  negative: 'Negative',
  neutral: 'Neutral',
  notice: 'Notice',
  positive: 'Positive',
};

const sizeLabels: Record<BadgeSize, string> = {
  large: 'Large',
  medium: 'Medium',
  small: 'Small',
};

function PercentIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4.5 15.5 15.5 4.5M5.5 7.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM14.5 16.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function BadgeStack({
  appearance,
  size = 'medium',
}: {
  appearance: BadgeAppearance;
  size?: BadgeSize;
}) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
      {variants.map((variant) => (
        <Badge
          appearance={appearance}
          icon={<PercentIcon />}
          key={variant}
          size={size}
          variant={variant}
        >
          {variantLabels[variant]}
        </Badge>
      ))}
    </div>
  );
}


const meta = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    componentCanvas: {
      width: 520,
    },
    docs: {
      description: {
        component: `
O Badge comunica status, categoria, classificacao ou destaque curto em um elemento compacto.

Anatomia:
- Container em formato pill.
- Texto curto obrigatorio.
- Icone opcional e decorativo por padrao.
- Variantes semanticas: brand, neutral, information, positive, negative e notice.
- Aparencias: solid e subtle.
- Tamanhos: small, medium e large.

Use quando precisar exibir status curto, classificar um item, destacar uma categoria ou apresentar metadados visuais compactos.

Nao use como botao, link, navegacao, alerta critico, toast, banner ou para mensagens completas. Em contexto governamental, o Badge deve complementar texto claro e nao depender exclusivamente de cor para informacao essencial.

Responsividade:
- O componente usa inline-flex, max-width: 100% e quebra controlada para labels longos.
- Stories Desktop, Tablet e Mobile demonstram o comportamento em diferentes containers.
`,
      },
    },
    layout: 'fullscreen',
  },
  argTypes: {
    appearance: {
      control: 'select',
      description: 'Intensidade visual do Badge.',
      options: appearances,
    },
    children: {
      control: 'text',
      description: 'Conteudo curto renderizado no Badge.',
    },
    className: {
      control: 'text',
      description: 'Classe CSS opcional aplicada ao elemento raiz.',
    },
    icon: {
      control: false,
      description: 'ReactNode opcional renderizado como icone decorativo.',
    },
    iconPosition: {
      control: 'inline-radio',
      description: 'Posicao do icone.',
      options: ['start', 'end'],
    },
    size: {
      control: 'select',
      description: 'Tamanho visual do Badge.',
      options: sizes,
    },
    variant: {
      control: 'select',
      description: 'Variante semantica do Badge.',
      options: variants,
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    appearance: 'solid',
    children: 'Label',
    icon: <PercentIcon />,
    size: 'medium',
    variant: 'brand',
  },
};

export const AllVariantsSolid: Story = {
  args: {
    children: 'Label',
  },
  render: () => <BadgeStack appearance="solid" />,
};

export const AllVariantsSubtle: Story = {
  args: {
    children: 'Label',
  },
  render: () => <BadgeStack appearance="subtle" />,
};

export const AllSizes: Story = {
  args: {
    children: 'Label',
  },
  render: () => (
    <div style={{ alignItems: 'center', display: 'flex', flexWrap: 'wrap', gap: 12 }}>
      {sizes.map((size) => (
        <Badge icon={<PercentIcon />} key={size} size={size}>
          {sizeLabels[size]}
        </Badge>
      ))}
    </div>
  ),
};


export const WithoutIcon: Story = {
  args: {
    appearance: 'subtle',
    children: 'Ativo',
    size: 'small',
    variant: 'positive',
  },
};

export const IconEnd: Story = {
  args: {
    appearance: 'solid',
    children: 'Desconto',
    icon: <PercentIcon />,
    iconPosition: 'end',
    size: 'large',
    variant: 'information',
  },
};

export const LongLabel: Story = {
  args: {
    appearance: 'subtle',
    children: 'Status complementar com texto maior',
    icon: <PercentIcon />,
    size: 'medium',
    variant: 'neutral',
  },
  parameters: {
    componentCanvas: {
      width: 220,
    },
  },
};

export const Accessibility: Story = {
  args: {
    appearance: 'subtle',
    children: 'Prazo regular',
    icon: <PercentIcon />,
    size: 'medium',
    variant: 'information',
  },
  parameters: {
    docs: {
      description: {
        story:
          'O texto do Badge deve comunicar a informacao. O icone e decorativo por padrao e recebe aria-hidden.',
      },
    },
  },
};
