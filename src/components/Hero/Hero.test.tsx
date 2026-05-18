import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Hero } from './Hero';

describe('Hero', () => {
  it('renders title, description and primary action', () => {
    render(
      <Hero
        action={{ label: 'Comecar', onClick: vi.fn() }}
        description="Descricao do destaque."
        title="Titulo principal"
      />,
    );

    expect(screen.getByRole('heading', { level: 1, name: 'Titulo principal' })).toBeInTheDocument();
    expect(screen.getByText('Descricao do destaque.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Comecar' })).toBeInTheDocument();
  });

  it('supports heading level 2', () => {
    render(<Hero headingLevel={2} title="Secao em destaque" />);

    expect(screen.getByRole('heading', { level: 2, name: 'Secao em destaque' })).toBeInTheDocument();
  });

  it('renders image media with alt text', () => {
    render(<Hero image={{ alt: 'Ilustracao do servico', src: '/hero.png' }} title="Servicos" />);

    expect(screen.getByRole('img', { name: 'Ilustracao do servico' })).toHaveAttribute(
      'src',
      '/hero.png',
    );
  });

  it('renders custom media before image when both are provided', () => {
    render(
      <Hero
        image={{ alt: 'Imagem substituida', src: '/hero.png' }}
        media={<div data-testid="custom-media">Media customizada</div>}
        title="Servicos"
      />,
    );

    expect(screen.getByTestId('custom-media')).toBeInTheDocument();
    expect(screen.queryByRole('img', { name: 'Imagem substituida' })).not.toBeInTheDocument();
  });

  it('applies variant and media position classes', () => {
    const { container } = render(
      <Hero media={<div />} mediaPosition="start" title="Servicos" variant="image" />,
    );
    const hero = container.querySelector('.ds-hero');

    expect(hero).toHaveClass('ds-hero--variant-image');
    expect(hero).toHaveClass('ds-hero--media-start');
  });
});
