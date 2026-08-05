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

const sizeLabels: Record<BadgeSize, string> = {
  large: 'Large',
  medium: 'Medium',
  small: 'Small',
};

function BadgeGrid({ appearance }: { appearance: BadgeAppearance }) {
  return (
    <div style={{ display: 'grid', gap: 24 }}>
      {sizes.map((size) => (
        <div
          key={size}
          style={{ alignItems: 'center', display: 'flex', flexWrap: 'wrap', gap: 16 }}
        >
          {variants.map((variant) => (
            <Badge appearance={appearance} key={variant} showIcon size={size} variant={variant}>
              Label
            </Badge>
          ))}
        </div>
      ))}
    </div>
  );
}

const meta = {
  title: 'Web Components/Badge',
  component: Badge,
  parameters: {
    componentCanvas: {
      width: 560,
    },
    docs: {
      description: {
        component: `
O Badge reproduz o layout do Figma (Web Components / Badge Standard): pill compacta com icone opcional (14px) e texto curto.

Propriedades espelhadas do Figma:
- variant = type: brand, neutral, information, positive, negative e notice.
- appearance = style: solid e subtle.
- size: small (22px), medium (24px) e large (28px).
- showIcon = icon: exibe o icone padrao percent; icon substitui o glifo (slot Icon Swap).

Tokens: alturas seguem sizing/badge/height-sm|md|lg, espacamentos usam Component sizing (gap 4, padding 10/0), o radius usa border/radius/radius-full, fundos usam color/background por tipo (negative e notice solid usam os tons default-hover, como no Figma), textos usam text-style/content color/typography e o texto do notice subtle usa o literal #936700 do Figma (sem variable na collection).

Tipografia: Disclaimer/Medium (Regular 10) no small e Body/Extra Small (Medium 12) no medium e large, sempre em Plus Jakarta Sans.

Responsividade: o Badge e inline-flex com max-width de 100%; labels maiores que o container sao truncados com reticencias, mantendo a pill integra em qualquer largura.

Acessibilidade: o icone e decorativo (aria-hidden) e a informacao deve estar no texto. Nao use o Badge como botao ou link.
`,
      },
    },
    layout: 'fullscreen',
  },
  argTypes: {
    appearance: {
      control: 'select',
      description: 'Estilo visual do Badge (style no Figma).',
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
      description: 'ReactNode que substitui o icone padrao (slot Icon Swap).',
    },
    showIcon: {
      control: 'boolean',
      description: 'Exibe o icone padrao percent (propriedade icon no Figma).',
    },
    size: {
      control: 'select',
      description: 'Tamanho do Badge.',
      options: sizes,
    },
    variant: {
      control: 'select',
      description: 'Tipo semantico do Badge (type no Figma).',
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
    showIcon: true,
    size: 'small',
    variant: 'brand',
  },
};

export const AllVariantsSolid: Story = {
  args: {
    children: 'Label',
  },
  render: () => <BadgeGrid appearance="solid" />,
};

export const AllVariantsSubtle: Story = {
  args: {
    children: 'Label',
  },
  render: () => <BadgeGrid appearance="subtle" />,
};

export const AllSizes: Story = {
  args: {
    children: 'Label',
  },
  render: () => (
    <div style={{ alignItems: 'center', display: 'flex', flexWrap: 'wrap', gap: 16 }}>
      {sizes.map((size) => (
        <Badge key={size} showIcon size={size}>
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

export const CustomIcon: Story = {
  args: {
    appearance: 'subtle',
    children: 'Verificado',
    icon: (
      <svg aria-hidden="true" fill="none" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
        <path
          d="m2.9 7.4 2.6 2.6 5.6-5.9"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.4"
        />
      </svg>
    ),
    size: 'medium',
    variant: 'information',
  },
  parameters: {
    docs: {
      description: {
        story:
          'O slot Icon Swap aceita qualquer icone; a cor acompanha a variante via currentColor.',
      },
    },
  },
};

export const LongLabel: Story = {
  args: {
    appearance: 'subtle',
    children: 'Status complementar com texto maior',
    showIcon: true,
    size: 'medium',
    variant: 'neutral',
  },
  parameters: {
    componentCanvas: {
      width: 180,
    },
    docs: {
      description: {
        story:
          'Em containers estreitos o label e truncado com reticencias, preservando o formato pill.',
      },
    },
  },
};
