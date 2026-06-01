import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Skeleton } from './Skeleton';

describe('Skeleton', () => {
  it('renders as decorative by default', () => {
    const { container } = render(<Skeleton />);

    const skeleton = container.querySelector('.ds-skeleton');

    expect(skeleton).toHaveAttribute('aria-hidden', 'true');
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('can be announced when ariaLabel is provided', () => {
    render(<Skeleton ariaLabel="Carregando conteudo" />);

    const skeleton = screen.getByRole('status', { name: 'Carregando conteudo' });

    expect(skeleton).toHaveAttribute('aria-busy', 'true');
  });

  it('applies shape, tone and animation classes', () => {
    const { container } = render(<Skeleton animation="wave" shape="circle" tone="strong" />);

    const skeleton = container.querySelector('.ds-skeleton');

    expect(skeleton).toHaveClass('ds-skeleton--shape-circle');
    expect(skeleton).toHaveClass('ds-skeleton--tone-strong');
    expect(skeleton).toHaveClass('ds-skeleton--animation-wave');
  });

  it('renders multiple text lines', () => {
    const { container } = render(<Skeleton lines={3} shape="text" />);

    expect(container.querySelectorAll('.ds-skeleton__line')).toHaveLength(3);
  });

  it('normalizes invalid line counts', () => {
    const { container } = render(<Skeleton lines={0} shape="text" />);

    expect(container.querySelectorAll('.ds-skeleton__line')).toHaveLength(0);
    expect(container.querySelector('.ds-skeleton')).toBeInTheDocument();
  });

  it('maps numeric dimensions to px custom properties', () => {
    const { container } = render(<Skeleton height={64} width={120} />);

    const skeleton = container.querySelector('.ds-skeleton');

    expect(skeleton).toHaveStyle({
      '--skeleton-height': '64px',
      '--skeleton-width': '120px',
    });
  });
});
