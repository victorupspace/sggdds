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

    const current = screen.getByText('Agendamento').closest('.ds-breadcrumb__crumb');
    expect(current).toHaveAttribute('aria-current', 'page');
    expect(current?.tagName).toBe('SPAN');
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

  it('renders separators as decorative text', () => {
    const { container } = render(<Breadcrumb items={items} />);

    const separators = container.querySelectorAll('.ds-breadcrumb__separator');
    expect(separators).toHaveLength(3);
    separators.forEach((separator) => {
      expect(separator).toHaveAttribute('aria-hidden', 'true');
      expect(separator).toHaveTextContent('/');
    });
  });

  it('keeps the home icon decorative', () => {
    render(<Breadcrumb items={items} />);

    const home = screen.getByRole('link', { name: 'Inicio' });
    expect(home.querySelector('.ds-breadcrumb__home-icon')).toHaveAttribute('aria-hidden', 'true');
  });

  it('can hide the home item', () => {
    const { container } = render(<Breadcrumb showHome={false} items={items} />);

    expect(screen.queryByRole('link', { name: 'Inicio' })).not.toBeInTheDocument();
    expect(container.querySelectorAll('.ds-breadcrumb__separator')).toHaveLength(2);
  });

  it('applies an additional className', () => {
    render(<Breadcrumb className="custom-breadcrumb" items={items} />);

    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toHaveClass('custom-breadcrumb');
  });
});
