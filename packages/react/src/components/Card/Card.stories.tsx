import type { Meta, StoryObj } from '@storybook/react-vite';

import { Badge } from '../Badge';
import { Button } from '../Button';
import { Card } from './Card';
import './Card.stories.css';

/* Chevrons do Button no Figma (vetores exportados, caixa de 24px) */
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

function MediaPlaceholder() {
  return <span aria-hidden="true" className="card-story-media" />;
}

const defaultBadge = (
  <Badge appearance="subtle" showIcon size="small" variant="neutral">
    Badge
  </Badge>
);

const defaultAction = (
  <Button iconEnd={<ChevronRightIcon />} iconStart={<ChevronLeftIcon />} variant="secondary">
    Button
  </Button>
);

const meta = {
  title: 'Web Components/Card',
  component: Card,
  parameters: {
    componentCanvas: {
      width: 400,
    },
    docs: {
      description: {
        component: `
O Card reproduz o layout do Figma (Web Components / Card): container com borda, cantos radius-lg, padding de 24px e elevação sutil, composto por midia, badge, titulo com a barra da marca, descricao, divider e um slot de acao.

Anatomia (as propriedades show* do Figma viram presenca dos slots):
- media: imagem no topo (vertical, 180px de altura) ou a esquerda (horizontal, 140px de largura), com radius-md.
- badge: slot para o Badge do DS (no Figma, Neutral Subtle Small com icone).
- Titulo Title/Medium (SemiBold 20) precedido pela barra vermelha da marca (4x25, brand/primary/default).
- Descricao Body/Medium (Medium 16, typography/tertiary).
- Divider de 1px (color/neutral/grey-300) controlado por showDivider.
- action: slot para o Button do DS (no Figma, secondary com chevrons).

Estados do component set: hover aplica a tinta color/state/hover com elevacao maior, pressed aplica color/state/pressed, e o focus ring do Figma (color/border/focus) aparece quando um elemento interno recebe foco por teclado.

Tokens: superficies, borda, radius, espacamentos, cores de texto e divider usam as mesmas variables do Figma; as variables novas ainda ausentes nas collections exportadas (color/state/*, color/border/focus, color/border/default) usam valores literais documentados no CSS.

Responsividade: o card e fluido (100% do container); o layout horizontal usa min-width de 400px no desktop, como no Figma, e abaixo de 640px empilha como o vertical (midia no topo), sem overflow horizontal.

Acessibilidade: raiz article, heading configuravel via headingLevel, barra do titulo e divider decorativos (aria-hidden) e interacao concentrada nos slots (Button/links), sem elementos interativos aninhados.
`,
      },
    },
    layout: 'fullscreen',
  },
  argTypes: {
    action: {
      control: false,
      description: 'Slot da acao (componha com o Button do DS; showButton no Figma).',
    },
    badge: {
      control: false,
      description: 'Slot da badge (componha com o Badge do DS; showBadge no Figma).',
    },
    className: {
      control: 'text',
      description: 'Classe CSS opcional aplicada ao elemento raiz.',
    },
    description: {
      control: 'text',
      description: 'Texto complementar abaixo do titulo.',
    },
    headingLevel: {
      control: 'select',
      description: 'Nivel semantico do heading do titulo.',
      options: [2, 3, 4, 5, 6],
    },
    media: {
      control: false,
      description: 'Slot de midia (showImagePlaceholder no Figma).',
    },
    orientation: {
      control: 'radio',
      description: 'type no Figma. Horizontal empilha como vertical abaixo de 640px.',
      options: ['vertical', 'horizontal'],
    },
    showDivider: {
      control: 'boolean',
      description: 'Exibe o divider entre a descricao e a acao (showDivider no Figma).',
    },
    title: {
      control: 'text',
      description: 'Titulo principal obrigatorio.',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    action: defaultAction,
    badge: defaultBadge,
    description: 'Description',
    media: <MediaPlaceholder />,
    title: 'Card title',
  },
};

export const Horizontal: Story = {
  args: {
    ...Default.args,
    orientation: 'horizontal',
  },
  parameters: {
    componentCanvas: {
      width: 480,
    },
  },
};

export const WithoutMedia: Story = {
  args: {
    action: defaultAction,
    badge: defaultBadge,
    description: 'Description',
    title: 'Card title',
  },
};

export const WithoutDivider: Story = {
  args: {
    ...Default.args,
    showDivider: false,
  },
};

export const LongContent: Story = {
  args: {
    action: (
      <Button iconEnd={<ChevronRightIcon />} variant="secondary">
        Acessar conteudo
      </Button>
    ),
    badge: (
      <Badge appearance="subtle" showIcon size="small" variant="neutral">
        Orientacao
      </Badge>
    ),
    description:
      'Este exemplo valida titulo, descricao e acao com conteudo maior em telas pequenas, tablets e desktop, sem overflow horizontal.',
    media: <MediaPlaceholder />,
    title: 'Titulo maior para validar quebra de linha e hierarquia visual',
  },
};
