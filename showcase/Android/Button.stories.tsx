import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '@government/design-system';

import { Showcase } from '../native-showcase';

/**
 * Android `DSButton` (Views/XML) — token-driven visual reference.
 *
 * Source of truth: `platforms/android/sggd-components/.../DSButton.kt`.
 * Open in Android Studio to validate the real component; the gallery layout lives
 * in `res/layout/ds_button_gallery.xml`.
 */
const meta: Meta = {
  title: 'Android/Button',
  parameters: {
    layout: 'fullscreen',
    componentCanvas: { width: 820 },
    docs: {
      description: {
        component:
          'Botão Android (Views/XML) do Design System (`DSButton`). As pré-visualizações ' +
          'abaixo são referências geradas a partir dos tokens compartilhados; o componente ' +
          'real é um AppCompatButton customizado. Variantes: primary, secondary, tertiary. ' +
          'Tamanhos: small, medium, large.',
      },
    },
  },
};

export default meta;

type Story = StoryObj;

const code = (snippet: string) => snippet;

export const Variants: Story = {
  render: () => (
    <Showcase
      platform="Android"
      language="XML"
      code={code(`<br.gov.sggd.designsystem.components.DSButton
    android:text="Primary"
    app:dsVariant="primary" />

<br.gov.sggd.designsystem.components.DSButton
    android:text="Secondary"
    app:dsVariant="secondary" />

<br.gov.sggd.designsystem.components.DSButton
    android:text="Tertiary"
    app:dsVariant="tertiary" />`)}
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
      platform="Android"
      language="XML"
      code={code(`<DSButton app:dsSize="small"  android:text="Small" />
<DSButton app:dsSize="medium" android:text="Medium" />
<DSButton app:dsSize="large"  android:text="Large" />`)}
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
      platform="Android"
      language="Kotlin"
      code={code(`DSButton(context).apply {
    text = "Loading"
    isLoading = true
}
DSButton(context).apply {
    text = "Disabled"
    isEnabled = false
}`)}
    >
      <Button isLoading>Loading</Button>
      <Button disabled>Disabled</Button>
    </Showcase>
  ),
};

export const FullWidth: Story = {
  render: () => (
    <Showcase
      platform="Android"
      language="XML"
      code={code(`<DSButton
    android:layout_width="match_parent"
    android:text="Full width"
    app:dsFullWidth="true" />`)}
    >
      <div style={{ width: '100%' }}>
        <Button fullWidth>Full width</Button>
      </div>
    </Showcase>
  ),
};
