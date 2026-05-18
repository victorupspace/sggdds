import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Footer } from './Footer';

const sections = [
  {
    defaultOpen: true,
    links: [
      { href: '#servicos', label: 'Servicos' },
      { href: '#agendamentos', label: 'Agendamentos' },
    ],
    title: 'Atendimento',
  },
  {
    links: [{ href: '#privacidade', label: 'Privacidade' }],
    title: 'Institucional',
  },
];

describe('Footer', () => {
  it('renders footer navigation sections and links', () => {
    render(<Footer sections={sections} />);

    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Navegacao de rodape' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Servicos' })).toHaveAttribute('href', '#servicos');
  });

  it('toggles section disclosure state for mobile behavior', () => {
    render(<Footer sections={sections} />);

    const toggle = screen.getByRole('button', { name: 'Expandir Institucional' });

    expect(toggle).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(toggle);

    expect(toggle).toHaveAttribute('aria-expanded', 'true');
  });

  it('renders default brand and social navigation', () => {
    render(<Footer sections={sections} />);

    expect(screen.getByLabelText('SP.GOV.BR')).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Redes sociais' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Instagram' })).toHaveAttribute('href', '#instagram');
  });

  it('allows hiding the brand slot', () => {
    render(<Footer brand={null} sections={sections} />);

    expect(screen.queryByLabelText('SP.GOV.BR')).not.toBeInTheDocument();
  });

  it('renders custom legal links and social actions', () => {
    const onClick = vi.fn();

    render(
      <Footer
        legalLinks={[{ href: '#termos', label: 'Termos' }]}
        sections={sections}
        socialItems={[{ label: 'Compartilhar', onClick }]}
      />,
    );

    expect(screen.getByRole('link', { name: 'Termos' })).toHaveAttribute('href', '#termos');

    fireEvent.click(screen.getByRole('button', { name: 'Compartilhar' }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
