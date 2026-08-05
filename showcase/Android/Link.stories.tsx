import type { Meta, StoryObj } from '@storybook/react-vite';

import { Link } from '@government/design-system';

import { Showcase } from '../native-showcase';

const meta: Meta = {
  title: 'Android/Link',
  parameters: { layout: 'fullscreen', componentCanvas: { width: 820 } },
};
export default meta;
type Story = StoryObj;

export const Overview: Story = {
  render: () => (
    <Showcase
      platform="Android"
      language="XML"
      code={`<br.gov.sggd.designsystem.components.DSLink
      android:text="Link externo"
      app:dsLinkVariant="default" />`}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
        <Link href="#">Link padrão</Link>
        <Link href="#" variant="neutral">
          Link neutro
        </Link>
        <Link href="#" external showExternalIcon>
          Link externo
        </Link>
      </div>
    </Showcase>
  ),
};
