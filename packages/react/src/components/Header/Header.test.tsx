import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Header } from './Header';

const navigationItems = [
  { href: '#servicos', label: 'Servicos' },
  {
    children: [{ href: '#agendamento', label: 'Agendamento' }],
    label: 'Informacoes',
  },
];

describe('Header', () => {
  it('renders default identity slots and navigation', () => {
    render(<Header navigationItems={navigationItems} />);

    expect(screen.getByLabelText('SP.GOV.BR')).toBeInTheDocument();
    expect(screen.getByLabelText('Portal de Serviços ao Cidadão')).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Navegação principal' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Servicos' })).toHaveAttribute('href', '#servicos');
  });

  it('allows hiding either logo slot', () => {
    render(<Header navigationItems={navigationItems} primaryLogo={null} secondaryLogo={null} />);

    expect(screen.queryByLabelText('SP.GOV.BR')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Portal de Serviços ao Cidadão')).not.toBeInTheDocument();
  });

  it('renders custom logo slots', () => {
    render(
      <Header
        navigationItems={navigationItems}
        primaryLogo={<span>Custom Gov</span>}
        primaryLogoAriaLabel="Custom Gov"
        secondaryLogo={<span>Custom Portal</span>}
        secondaryLogoAriaLabel="Custom Portal"
      />,
    );

    expect(screen.getByLabelText('Custom Gov')).toHaveTextContent('Custom Gov');
    expect(screen.getByLabelText('Custom Portal')).toHaveTextContent('Custom Portal');
  });

  it('toggles the mobile menu state accessibly', () => {
    const onMenuOpenChange = vi.fn();

    render(<Header navigationItems={navigationItems} onMenuOpenChange={onMenuOpenChange} />);

    const menuButton = screen.getByRole('button', { name: 'Abrir menu principal' });

    expect(menuButton).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(menuButton);

    expect(onMenuOpenChange).toHaveBeenCalledWith(true);
    expect(menuButton).toHaveAttribute('aria-expanded', 'true');
  });

  it('renders utility actions and account action', () => {
    const onSearch = vi.fn();
    const onAccount = vi.fn();

    render(
      <Header
        accountAction={{ label: 'Entrar', onClick: onAccount }}
        navigationItems={navigationItems}
        utilityItems={[{ label: 'Buscar', onClick: onSearch }]}
      />,
    );

    fireEvent.click(screen.getAllByRole('button', { name: 'Buscar' })[0]);
    fireEvent.click(screen.getByRole('button', { name: 'Entrar' }));

    expect(onSearch).toHaveBeenCalledTimes(1);
    expect(onAccount).toHaveBeenCalledTimes(1);
  });

  it('renders the user menu when logged in and opens the panel', () => {
    const onLogout = vi.fn();

    render(
      <Header
        navigationItems={navigationItems}
        user={{
          menuItems: [
            { href: '#conta', label: 'Minha conta' },
            { label: 'Sair', onClick: onLogout },
          ],
          name: 'Nome',
        }}
      />,
    );

    const trigger = screen.getByRole('button', { name: 'Nome' });
    expect(trigger).toHaveAttribute('aria-haspopup', 'menu');

    fireEvent.click(trigger);

    expect(screen.getByRole('menu')).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: 'Minha conta' })).toHaveAttribute('href', '#conta');

    fireEvent.click(screen.getByRole('menuitem', { name: 'Sair' }));
    expect(onLogout).toHaveBeenCalledTimes(1);
  });

  it('does not render the gov.br action when a user is logged in', () => {
    render(<Header navigationItems={navigationItems} user={{ name: 'Nome' }} />);

    expect(screen.queryByRole('link', { name: 'Entrar com o gov.br' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Entrar com o gov.br' })).not.toBeInTheDocument();
  });

  it('renders nested navigation groups with Meganav', () => {
    render(<Header navigationItems={navigationItems} />);

    fireEvent.click(screen.getByText('Informacoes'));

    expect(screen.getByRole('link', { name: 'Agendamento' })).toHaveAttribute(
      'href',
      '#agendamento',
    );
  });
});
