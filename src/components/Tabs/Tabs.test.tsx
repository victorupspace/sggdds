import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Tabs } from './Tabs';

const items = [
  { content: 'Conteudo de servicos', id: 'servicos', label: 'Servicos' },
  { content: 'Conteudo de informacoes', id: 'informacoes', label: 'Informacoes' },
  { content: 'Conteudo de dados', disabled: true, id: 'dados', label: 'Dados' },
];

describe('Tabs', () => {
  it('renders a tablist and selects the first enabled tab by default', () => {
    render(<Tabs items={items} />);

    expect(screen.getByRole('tablist', { name: 'Tabs' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Servicos' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Conteudo de servicos');
  });

  it('switches content when a tab is clicked', () => {
    render(<Tabs items={items} />);

    fireEvent.click(screen.getByRole('tab', { name: 'Informacoes' }));

    expect(screen.getByRole('tab', { name: 'Informacoes' })).toHaveAttribute(
      'aria-selected',
      'true',
    );
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Conteudo de informacoes');
  });

  it('supports controlled value changes', () => {
    const onValueChange = vi.fn();

    render(<Tabs items={items} onValueChange={onValueChange} value="servicos" />);

    fireEvent.click(screen.getByRole('tab', { name: 'Informacoes' }));

    expect(onValueChange).toHaveBeenCalledWith('informacoes');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Conteudo de servicos');
  });

  it('skips disabled tabs during keyboard navigation', () => {
    render(<Tabs items={items} />);

    fireEvent.keyDown(screen.getByRole('tablist', { name: 'Tabs' }), { key: 'ArrowRight' });
    fireEvent.keyDown(screen.getByRole('tablist', { name: 'Tabs' }), { key: 'ArrowRight' });

    expect(screen.getByRole('tab', { name: 'Servicos' })).toHaveAttribute('aria-selected', 'true');
  });

  it('does not select on arrow keys when activation mode is manual', () => {
    render(<Tabs activationMode="manual" items={items} />);

    fireEvent.keyDown(screen.getByRole('tablist', { name: 'Tabs' }), { key: 'ArrowRight' });

    expect(screen.getByRole('tab', { name: 'Servicos' })).toHaveAttribute('aria-selected', 'true');
  });

  it('renders icons and badges as part of the tab', () => {
    render(
      <Tabs
        items={[
          {
            badge: '3',
            content: 'Painel',
            icon: <svg data-testid="tab-icon" viewBox="0 0 16 16" />,
            id: 'tab',
            label: 'Tab',
          },
        ]}
      />,
    );

    expect(screen.getByTestId('tab-icon')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });
});
