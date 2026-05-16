import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Breadcrumb } from './Breadcrumb';

const items = [
  { href: '#servicos', label: 'Servicos' },
  { href: '#cidadao', label: 'Cidadao' },
  { label: 'Agendamento' },
];

describe('Breadcrumb', () => {
  it('renders a breadcrumb navigation landmark', () => {
    render(<Breadcrumb items={items} />);

    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument();
  });

  it('renders the home link and item links', () => {
    render(<Breadcrumb items={items} />);

    expect(screen.getByRole('link', { name: 'Inicio' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'Servicos' })).toHaveAttribute('href', '#servicos');
  });

  it('marks the last item as the current page by default', () => {
    render(<Breadcrumb items={items} />);

    expect(screen.getByText('Agendamento').closest('.ds-breadcrumb__crumb')).toHaveAttribute(
      'aria-current',
      'page',
    );
  });

  it('honors an explicit current item', () => {
    render(
      <Breadcrumb
        items={[
          { href: '#one', label: 'Level 1' },
          { current: true, href: '#two', label: 'Level 2' },
          { href: '#three', label: 'Level 3' },
        ]}
      />,
    );

    expect(screen.getByText('Level 2').closest('.ds-breadcrumb__crumb')).toHaveAttribute(
      'aria-current',
      'page',
    );
  });

  it('collapses middle levels when the maximum visible amount is exceeded', () => {
    render(
      <Breadcrumb
        maxVisibleItems={5}
        items={[
          { href: '#one', label: 'Level 1' },
          { href: '#two', label: 'Level 2' },
          { href: '#three', label: 'Level 3' },
          { href: '#four', label: 'Level 4' },
          { href: '#five', label: 'Level 5' },
          { href: '#six', label: 'Level 6' },
          { label: 'Current' },
        ]}
      />,
    );

    expect(screen.getByLabelText('Mostrar niveis intermediarios')).toBeInTheDocument();
    expect(screen.getByText('Level 2')).toBeInTheDocument();
  });

  it('can hide the home item', () => {
    render(<Breadcrumb showHome={false} items={items} />);

    expect(screen.queryByRole('link', { name: 'Inicio' })).not.toBeInTheDocument();
  });
});
