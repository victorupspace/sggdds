import { render } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { describe, expect, it } from 'vitest';

import { Meganav } from './Meganav';

describe('Meganav — accessibility', () => {
  it('has no violations when the drawer is open', async () => {
    const { container } = render(
      <Meganav
        defaultOpen
        featured={{
          actions: [{ href: '#novidades', label: 'Novidades' }],
          description: 'Confira a nova area de servicos.',
          title: 'Atualizacao publicada',
        }}
        items={[
          {
            description: 'Acompanhe comunicados e novidades.',
            href: '#blog',
            icon: 'article',
            label: 'Blog',
          },
          {
            description: 'Atalhos para jornadas principais.',
            icon: 'bolt',
            items: [{ href: '#agendamento', label: 'Agendamento' }],
            label: 'Servicos',
          },
        ]}
        triggerLabel="Menu"
      />,
    );

    expect(await axe(container)).toHaveNoViolations();
  });
});
