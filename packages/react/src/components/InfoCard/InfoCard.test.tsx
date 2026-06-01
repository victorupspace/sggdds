import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Button } from '../Button';
import { InfoCard } from './InfoCard';

const icon = (
  <svg data-testid="info-card-icon" viewBox="0 0 24 24">
    <path d="M4 12h16" />
  </svg>
);

describe('InfoCard', () => {
  it('renders the title', () => {
    render(<InfoCard icon={icon} title="Lorem" />);

    expect(screen.getByRole('heading', { name: 'Lorem' })).toBeInTheDocument();
  });

  it('renders the subtitle', () => {
    render(<InfoCard icon={icon} subtitle="Ipsum dor simmet" title="Lorem" />);

    expect(screen.getByText('Ipsum dor simmet')).toBeInTheDocument();
  });

  it('renders the description', () => {
    render(<InfoCard description="Descrição do card" icon={icon} title="Lorem" />);

    expect(screen.getByText('Descrição do card')).toBeInTheDocument();
  });

  it('renders children inside the slot', () => {
    render(
      <InfoCard icon={icon} title="Configuração adicional">
        <p>Conteúdo customizado</p>
        <Button>Ação opcional</Button>
      </InfoCard>,
    );

    expect(screen.getByText('Conteúdo customizado')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Ação opcional' })).toBeInTheDocument();
  });

  it('renders without icon', () => {
    render(<InfoCard description="Sem ícone" title="Informação" />);

    expect(screen.getByRole('article')).toBeInTheDocument();
    expect(screen.queryByTestId('info-card-icon')).not.toBeInTheDocument();
  });

  it('renders the configured heading level', () => {
    render(<InfoCard headingLevel={2} icon={icon} title="Título de seção" />);

    expect(screen.getByRole('heading', { level: 2, name: 'Título de seção' })).toBeInTheDocument();
  });

  it('keeps the icon decorative', () => {
    render(<InfoCard icon={icon} title="Lorem" />);

    const article = screen.getByRole('article');
    const iconWrapper = within(article).getByTestId('info-card-icon').parentElement;

    expect(iconWrapper).toHaveAttribute('aria-hidden', 'true');
    expect(screen.getByRole('heading', { name: 'Lorem' })).toBeInTheDocument();
  });
});
