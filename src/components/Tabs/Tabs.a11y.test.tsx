import { render } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { describe, expect, it } from 'vitest';

import { Tabs } from './Tabs';

const items = [
  { id: 'profile', label: 'Perfil', content: <p>Conteúdo do perfil.</p> },
  { id: 'security', label: 'Segurança', content: <p>Conteúdo de segurança.</p> },
  { id: 'notifications', label: 'Notificações', content: <p>Preferências.</p> },
];

describe('Tabs — accessibility', () => {
  it('has no violations on default render', async () => {
    const { container } = render(
      <Tabs items={items} ariaLabel="Configurações da conta" />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no violations with disabled tab', async () => {
    const itemsWithDisabled = [
      ...items,
      { id: 'billing', label: 'Faturamento', content: <p />, disabled: true },
    ];
    const { container } = render(
      <Tabs items={itemsWithDisabled} ariaLabel="Configurações" />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no violations in compact variant', async () => {
    const { container } = render(
      <Tabs items={items} variant="compact" ariaLabel="Configurações" />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no violations with manual activation mode', async () => {
    const { container } = render(
      <Tabs
        items={items}
        activationMode="manual"
        ariaLabel="Configurações"
      />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
