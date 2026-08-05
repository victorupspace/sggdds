import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Hero } from './Hero';

describe('Hero', () => {
  it('renders title, descriptions and slots', () => {
    render(
      <Hero
        actions={<button type="button">Acessar</button>}
        badge={<span>Novo</span>}
        description="Descricao principal."
        secondDescription="Segunda descricao."
        title="Titulo principal"
      >
        <span>Conteudo do slot</span>
      </Hero>,
    );

    expect(screen.getByRole('heading', { level: 1, name: 'Titulo principal' })).toBeInTheDocument();
    expect(screen.getByText('Descricao principal.')).toBeInTheDocument();
    expect(screen.getByText('Segunda descricao.')).toBeInTheDocument();
    expect(screen.getByText('Novo')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Acessar' })).toBeInTheDocument();
    expect(screen.getByText('Conteudo do slot')).toBeInTheDocument();
  });

  it('uses the configured heading level', () => {
    render(<Hero headingLevel={2} title="Titulo" />);

    expect(screen.getByRole('heading', { level: 2, name: 'Titulo' })).toBeInTheDocument();
  });

  it('applies the variant class', () => {
    const { container } = render(<Hero title="Titulo" variant="center" />);

    expect(container.querySelector('.ds-hero')).toHaveClass('ds-hero--variant-center');
  });

  it('omits optional slots when not provided', () => {
    const { container } = render(<Hero title="Titulo" />);

    expect(container.querySelector('.ds-hero__badge')).not.toBeInTheDocument();
    expect(container.querySelector('.ds-hero__actions')).not.toBeInTheDocument();
    expect(container.querySelector('.ds-hero__slot')).not.toBeInTheDocument();
  });

  it('sets an accessible name on the section when provided', () => {
    render(<Hero ariaLabel="Destaque principal" title="Titulo" />);

    expect(screen.getByRole('region', { name: 'Destaque principal' })).toBeInTheDocument();
  });
});
