import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '@government/design-system';

import { Showcase } from '../native-showcase';

/**
 * SwiftUI `DSButton` — token-driven visual reference.
 *
 * Source of truth: `platforms/ios/Sources/SGGDComponents/Button/DSButton.swift`.
 * Run `swift build` / `swift test` in `platforms/ios` to validate the real component,
 * or open the Xcode previews in `DSButton+Previews.swift`.
 */
const meta: Meta = {
  title: 'SwiftUI/Button',
  parameters: {
    layout: 'fullscreen',
    componentCanvas: { width: 820 },
    docs: {
      description: {
        component:
          'Botão SwiftUI do Design System (`DSButton`). As pré-visualizações abaixo são ' +
          'referências geradas a partir dos tokens compartilhados; o componente real é ' +
          'SwiftUI. Variantes: primary, secondary, tertiary. Tamanhos: small, medium, large.',
      },
    },
  },
};

export default meta;

type Story = StoryObj;

const swift = (snippet: string) => snippet;

export const Variants: Story = {
  render: () => (
    <Showcase
      platform="SwiftUI"
      language="Swift"
      code={swift(`DSButton("Primary", variant: .primary) {}
DSButton("Secondary", variant: .secondary) {}
DSButton("Tertiary", variant: .tertiary) {}`)}
    >
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="tertiary">Tertiary</Button>
    </Showcase>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Showcase
      platform="SwiftUI"
      language="Swift"
      code={swift(`DSButton("Small", size: .small) {}
DSButton("Medium", size: .medium) {}
DSButton("Large", size: .large) {}`)}
    >
      <Button size="small">Small</Button>
      <Button size="medium">Medium</Button>
      <Button size="large">Large</Button>
    </Showcase>
  ),
};

export const States: Story = {
  render: () => (
    <Showcase
      platform="SwiftUI"
      language="Swift"
      code={swift(`DSButton("Loading", isLoading: true) {}
DSButton("Disabled") {}.disabled(true)`)}
    >
      <Button isLoading>Loading</Button>
      <Button disabled>Disabled</Button>
    </Showcase>
  ),
};

export const FullWidth: Story = {
  render: () => (
    <Showcase
      platform="SwiftUI"
      language="Swift"
      code={swift(`DSButton("Full width", fullWidth: true) {}`)}
    >
      <div style={{ width: '100%' }}>
        <Button fullWidth>Full width</Button>
      </div>
    </Showcase>
  ),
};
