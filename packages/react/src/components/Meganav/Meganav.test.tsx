import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Meganav } from './Meganav';

const items = [
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
];

describe('Meganav', () => {
  it('renders a closed trigger with accessible expanded state', () => {
    render(<Meganav items={items} triggerLabel="Menu" />);

    const trigger = screen.getByRole('button', { name: 'Menu' });

    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(
      screen.queryByRole('navigation', { name: 'Navegacao principal' }),
    ).not.toBeInTheDocument();
  });

  it('opens the drawer and renders links', () => {
    render(<Meganav items={items} triggerLabel="Menu" />);

    fireEvent.click(screen.getByRole('button', { name: 'Menu' }));

    expect(screen.getByRole('button', { name: 'Fechar navegacao' })).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Navegacao principal' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Blog/ })).toHaveAttribute('href', '#blog');
    expect(screen.getByRole('link', { name: 'Agendamento' })).toHaveAttribute(
      'href',
      '#agendamento',
    );
  });

  it('supports controlled open state callbacks', () => {
    const onOpenChange = vi.fn();

    render(<Meganav items={items} onOpenChange={onOpenChange} open={false} triggerLabel="Menu" />);

    fireEvent.click(screen.getByRole('button', { name: 'Menu' }));

    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  it('closes on Escape when open', () => {
    const onOpenChange = vi.fn();

    render(<Meganav defaultOpen items={items} onOpenChange={onOpenChange} triggerLabel="Menu" />);

    fireEvent.keyDown(document, { key: 'Escape' });

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('renders featured content and actions', () => {
    render(
      <Meganav
        defaultOpen
        featured={{
          actions: [{ href: '#novidades', label: 'Novidades' }],
          description: 'Confira o novo painel.',
          title: 'Atualizacao publicada',
        }}
        items={items}
        triggerLabel="Menu"
      />,
    );

    expect(screen.getByLabelText('Atualizacao publicada')).toHaveTextContent(
      'Confira o novo painel.',
    );
    expect(screen.getByRole('link', { name: /Novidades/ })).toHaveAttribute('href', '#novidades');
  });
});
