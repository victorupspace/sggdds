import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Hero } from './Hero';

describe('Hero', () => {
  it('renders title, description and primary action', () => {
    render(
      <Hero
        action={{ label: 'Acessar servicos', onClick: vi.fn() }}
        description="Descricao do destaque."
        title="Titulo principal"
      />,
    );

    expect(screen.getByRole('heading', { level: 1, name: 'Titulo principal' })).toBeInTheDocument();
    expect(screen.getByText('Descricao do destaque.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Acessar servicos' })).toBeInTheDocument();
  });

  it('renders eyebrow above title', () => {
    render(<Hero eyebrow="Servicos digitais" title="Titulo" />);

    expect(screen.getByText('Servicos digitais')).toBeInTheDocument();
  });

  it('renders secondary action as tertiary button', () => {
    render(
      <Hero
        action={{ label: 'Primaria' }}
        secondaryAction={{ label: 'Secundaria' }}
        title="Titulo"
      />,
    );

    expect(screen.getByRole('button', { name: 'Secundaria' })).toHaveClass(
      'ds-button--variant-tertiary',
    );
  });

  it('renders children slot between description and actions', () => {
    render(
      <Hero
        action={{ label: 'CTA' }}
        description="Descricao"
        title="Titulo"
      >
        <div data-testid="custom-slot">Slot livre</div>
      </Hero>,
    );

    expect(screen.getByTestId('custom-slot')).toBeInTheDocument();
  });

  it('supports heading levels 1, 2 and 3', () => {
    const { rerender } = render(<Hero headingLevel={2} title="Nivel 2" />);
    expect(screen.getByRole('heading', { level: 2, name: 'Nivel 2' })).toBeInTheDocument();

    rerender(<Hero headingLevel={3} title="Nivel 3" />);
    expect(screen.getByRole('heading', { level: 3, name: 'Nivel 3' })).toBeInTheDocument();
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
      <Hero media={<div />} mediaPosition="start" title="Servicos" variant="dark" />,
    );
    const hero = container.querySelector('.ds-hero');

    expect(hero).toHaveClass('ds-hero--variant-dark');
    expect(hero).toHaveClass('ds-hero--media-start');
  });

  it('applies the without-media class when no media is provided', () => {
    const { container } = render(<Hero title="Sem media" />);
    expect(container.querySelector('.ds-hero')).toHaveClass('ds-hero--without-media');
  });

  it('treats deprecated variant "image" as dark with 1/1 aspect ratio', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    const { container } = render(
      <Hero media={<div />} title="Image legado" variant="image" />,
    );
    const hero = container.querySelector<HTMLElement>('.ds-hero');

    expect(hero).toHaveClass('ds-hero--variant-dark');
    expect(hero?.style.getPropertyValue('--hero-media-aspect-ratio')).toBe('1 / 1');
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('variant="image"'));

    warn.mockRestore();
  });

  it('applies the mediaAspectRatio prop via CSS custom property', () => {
    const { container } = render(
      <Hero media={<div />} mediaAspectRatio="16/9" title="Wide" />,
    );
    const hero = container.querySelector<HTMLElement>('.ds-hero');

    expect(hero?.style.getPropertyValue('--hero-media-aspect-ratio')).toBe('16 / 9');
  });
});
