import { render } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { describe, expect, it } from 'vitest';

import { Carousel } from './Carousel';

describe('Carousel — accessibility', () => {
  it('has no violations with card composition', async () => {
    const { container } = render(
      <Carousel
        items={[
          { description: 'Descricao do primeiro card', id: 'primeiro', title: 'Primeiro card' },
          { description: 'Descricao do segundo card', id: 'segundo', title: 'Segundo card' },
          { description: 'Descricao do terceiro card', id: 'terceiro', title: 'Terceiro card' },
        ]}
      />,
    );

    expect(await axe(container)).toHaveNoViolations();
  });
});
