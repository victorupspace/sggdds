import type { Meta, StoryObj } from '@storybook/react-vite';

import { Link } from '@government/design-system';

import { Showcase } from '../native-showcase';

const meta: Meta = {
  title: 'SwiftUI/Link',
  parameters: { layout: 'fullscreen', componentCanvas: { width: 820 } },
};
export default meta;
type Story = StoryObj;

export const Overview: Story = {
  render: () => (
      <Showcase platform="SwiftUI" language="Swift" code={`DSLink("Link padrão", url: URL(string: "https://gov.br"))
  DSLink("Link neutro", variant: .neutral)
  DSLink("Link externo", showExternalIcon: true)`}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
            <Link href="#">Link padrão</Link>
            <Link href="#" variant="neutral">Link neutro</Link>
            <Link href="#" external showExternalIcon>Link externo</Link>
          </div>
      </Showcase>
  ),
};
