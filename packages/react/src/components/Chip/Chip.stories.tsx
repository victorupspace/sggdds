import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { Chip } from './Chip';
import type { ChipVariant } from './Chip.types';
import './Chip.stories.css';

const variants: ChipVariant[] = [
  'support',
  'action',
  'information',
  'warning',
  'danger',
  'success',
];

const variantLabels: Record<ChipVariant, string> = {
  action: 'Action',
  danger: 'Danger',
  information: 'Information',
  success: 'Success',
  support: 'Support',
  warning: 'Warning',
};

function InteractiveExample() {
  const [selectedVariants, setSelectedVariants] = useState<ChipVariant[]>(['information']);

  return (
    <div className="chip-story-row">
      {variants.map((variant) => {
        const isSelected = selectedVariants.includes(variant);

        return (
          <Chip
            key={variant}
            onClick={() => {
              setSelectedVariants((current) =>
                isSelected ? current.filter((item) => item !== variant) : [...current, variant],
              );
            }}
            selected={isSelected}
            showLeadingIcon
            variant={variant}
          >
            {variantLabels[variant]}
          </Chip>
        );
      })}
    </div>
  );
}

const meta = {
  title: 'Web Components/Chip',
  component: Chip,
  parameters: {
    componentCanvas: {
      width: 640,
    },
    docs: {
      description: {
        component: `
O Chip reproduz o layout do Figma (Web Components / Chip): pill compacta com radius-sm, padding de 6px, gap de 4px, texto Label/Small (Plus Jakarta Sans Medium 12) e ícones opcionais de 16px nos slots Leading/Trailing (glifo help por padrão).

Tipos (propriedade type no Figma):
- Support e Action: borda neutral/subtle com texto typography/tertiary; hover em background/neutral/default; selecionado usa color/state/selected com borda color/border/strong.
- Information, Warning, Danger e Success: fundo subtle da cor com texto na tipografia correspondente, hover em subtle-hover e selecionado com borda de 1.5px na cor do texto (danger escurece o texto para color/typography/danger no hover/selected).

Estados: Default, Hover (apenas quando interativo, via onClick), Selected (borda de 1.5px) e Disabled (fundo neutral/inverse, borda neutral/disabled e texto typography/disabled).

Tokens: as variables novas do Figma ainda ausentes nas collections exportadas (sizing/chip/*, color/state/selected, color/border/strong, color/typography/success e color/typography/danger) usam literais documentados no CSS.

Responsividade: o Chip e inline-flex com max-width de 100%; labels maiores que o container sao truncados com reticencias.

Acessibilidade: com onClick o Chip vira um botao com aria-pressed refletindo selected e foco visivel com o focus ring do DS; sem onClick e um elemento estatico. Icones sao decorativos (aria-hidden).
`,
      },
    },
    layout: 'fullscreen',
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Conteudo textual do chip.',
    },
    className: {
      control: 'text',
      description: 'Classe CSS opcional aplicada ao chip.',
    },
    disabled: {
      control: 'boolean',
      description: 'Estado Disabled do Figma.',
    },
    leadingIcon: {
      control: false,
      description: 'Substitui o icone inicial (slot Leading Icon).',
    },
    onClick: {
      control: false,
      description: 'Torna o Chip interativo (botao com aria-pressed).',
    },
    selected: {
      control: 'boolean',
      description: 'Estado Selected do Figma (borda de 1.5px).',
    },
    showLeadingIcon: {
      control: 'boolean',
      description: 'Exibe o icone padrao help antes do texto.',
    },
    showTrailingIcon: {
      control: 'boolean',
      description: 'Exibe o icone padrao help apos o texto.',
    },
    trailingIcon: {
      control: false,
      description: 'Substitui o icone final (slot Trailing Icon).',
    },
    variant: {
      control: 'select',
      description: 'Tipo do Chip (type no Figma).',
      options: variants,
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Chip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Label',
    showLeadingIcon: true,
    variant: 'support',
  },
};

export const AllVariants: Story = {
  args: {
    children: 'Label',
  },
  render: () => (
    <div className="chip-story-row">
      {variants.map((variant) => (
        <Chip key={variant} showLeadingIcon variant={variant}>
          {variantLabels[variant]}
        </Chip>
      ))}
    </div>
  ),
};

export const Selected: Story = {
  args: {
    children: 'Label',
  },
  render: () => (
    <div className="chip-story-row">
      {variants.map((variant) => (
        <Chip key={variant} selected showLeadingIcon variant={variant}>
          {variantLabels[variant]}
        </Chip>
      ))}
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    children: 'Label',
    disabled: true,
    showLeadingIcon: true,
  },
};

export const Interactive: Story = {
  args: {
    children: 'Label',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Com onClick o Chip vira um botao com aria-pressed e ganha os estados de hover e selecao do Figma.',
      },
    },
  },
  render: () => <InteractiveExample />,
};

export const WithTrailingIcon: Story = {
  args: {
    children: 'Label',
    showLeadingIcon: true,
    showTrailingIcon: true,
    variant: 'information',
  },
};

export const LongLabel: Story = {
  args: {
    children: 'Filtro com texto maior para validar truncamento',
    showLeadingIcon: true,
    variant: 'support',
  },
  parameters: {
    componentCanvas: {
      width: 200,
    },
    docs: {
      description: {
        story:
          'Em containers estreitos o label e truncado com reticencias, preservando o formato do chip.',
      },
    },
  },
};
