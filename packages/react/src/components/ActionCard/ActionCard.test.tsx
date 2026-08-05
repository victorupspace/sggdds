import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { ActionCard } from './ActionCard';

describe('ActionCard', () => {
  it('renderiza título, descrição e badge', () => {
    render(
      <ActionCard
        badge={<span>Novo</span>}
        description="Descrição do serviço"
        title="Título do card"
      />,
    );

    expect(screen.getByRole('heading', { level: 3, name: 'Título do card' })).toBeInTheDocument();
    expect(screen.getByText('Descrição do serviço')).toBeInTheDocument();
    expect(screen.getByText('Novo')).toBeInTheDocument();
  });

  it('respeita o headingLevel no modo estático', () => {
    render(<ActionCard headingLevel={2} title="Nível dois" />);

    expect(screen.getByRole('heading', { level: 2, name: 'Nível dois' })).toBeInTheDocument();
  });

  it('renderiza botão com aria-pressed quando recebe onClick', () => {
    const onClick = vi.fn();
    render(<ActionCard onClick={onClick} selected title="Ação" />);

    const button = screen.getByRole('button', { name: /Ação/ });
    expect(button).toHaveAttribute('aria-pressed', 'true');

    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renderiza link com aria-current quando recebe href', () => {
    render(<ActionCard href="#destino" selected title="Ir para o serviço" />);

    const link = screen.getByRole('link', { name: /Ir para o serviço/ });
    expect(link).toHaveAttribute('href', '#destino');
    expect(link).toHaveAttribute('aria-current', 'true');
  });

  it('não expõe aria-pressed no modo estático', () => {
    render(<ActionCard title="Somente leitura" />);

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('oculta o ícone de tecnologia assistiva', () => {
    const { container } = render(
      <ActionCard icon={<svg data-testid="icone" />} title="Com ícone" />,
    );

    const circle = container.querySelector('.ds-action-card__icon-circle');
    expect(circle).toHaveAttribute('aria-hidden', 'true');
  });
});
