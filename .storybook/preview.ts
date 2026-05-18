import type { Preview } from '@storybook/react-vite';
import { createElement } from 'react';

import '../src/foundations/tokens/css/tokens.css';

const preview: Preview = {
  decorators: [
    (Story, context) => {
      if (!context.title.startsWith('Web Components/')) {
        return createElement(Story);
      }

      const width =
        typeof context.parameters.componentCanvas?.width === 'number'
          ? context.parameters.componentCanvas.width
          : 320;

      return createElement(
        'div',
        {
          style: {
            alignItems: 'flex-start',
            background: 'var(--ds-primitive-color-neutral-grey-100, #f5f5f5)',
            boxSizing: 'border-box',
            display: 'flex',
            fontFamily:
              'var(--ds-primitive-typography-font-family-plus-jakarta-sans), Inter, system-ui, sans-serif',
            justifyContent: 'center',
            minWidth: 0,
            overflow: 'visible',
            padding: '24px',
            width: '100%',
          },
        },
        createElement(
          'div',
          {
            style: {
              boxSizing: 'border-box',
              maxWidth: width,
              minWidth: 0,
              width: '100%',
            },
          },
          createElement(Story),
        ),
      );
    },
  ],
  parameters: {
    actions: {
      argTypesRegex: '^on[A-Z].*',
    },
    backgrounds: {
      options: {
        canvas: {
          name: 'Canvas',
          value: 'var(--ds-primitive-color-neutral-grey-100, #f5f5f5)',
        },
        surface: {
          name: 'Surface',
          value: 'var(--ds-primitive-color-white, #ffffff)',
        },
        contrast: {
          name: 'Contrast',
          value: 'var(--ds-primitive-color-soft-black, #292929)',
        },
      },
    },
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      toc: true,
    },
    options: {
      storySort: {
        order: [
          'Documentation',
          ['Introdução', '*'],
          'Foundations',
          'Web Components',
        ],
      },
    },
    viewport: {
      options: {
        mobileSmall: {
          name: 'Mobile pequeno',
          styles: {
            height: '667px',
            width: '320px',
          },
          type: 'mobile',
        },
        mobile: {
          name: 'Mobile padrao',
          styles: {
            height: '844px',
            width: '390px',
          },
          type: 'mobile',
        },
        tablet: {
          name: 'Tablet',
          styles: {
            height: '1024px',
            width: '768px',
          },
          type: 'tablet',
        },
        desktop: {
          name: 'Desktop',
          styles: {
            height: '900px',
            width: '1280px',
          },
          type: 'desktop',
        },
        desktopWide: {
          name: 'Desktop amplo',
          styles: {
            height: '1080px',
            width: '1440px',
          },
          type: 'desktop',
        },
      },
    },
  },
  globalTypes: {
    theme: {
      description: 'Tema semantico do Design System',
      toolbar: {
        icon: 'paintbrush',
        items: [
          { value: 'default', title: 'Default' },
          { value: 'government', title: 'Government' },
        ],
        title: 'Theme',
      },
    },
    mode: {
      description: 'Modo visual para validacao futura de tokens',
      toolbar: {
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
          { value: 'high-contrast', title: 'High contrast' },
        ],
        title: 'Mode',
      },
    },
  },
  initialGlobals: {
    backgrounds: { value: 'canvas' },
    mode: 'light',
    theme: 'default',
  },
};

export default preview;
