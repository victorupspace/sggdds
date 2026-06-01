import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Avatar } from './Avatar';

describe('Avatar', () => {
  it('renders initials derived from name with accessible label', () => {
    render(<Avatar name="Ana Zanon" />);

    expect(screen.getByRole('img', { name: 'Ana Zanon' })).toHaveTextContent('AZ');
  });

  it('uses custom initials when provided', () => {
    render(<Avatar initials="sp" name="Servico Publico" />);

    expect(screen.getByRole('img', { name: 'Servico Publico' })).toHaveTextContent('SP');
  });

  it('renders image when src is provided', () => {
    render(<Avatar alt="Foto de Ana Zanon" name="Ana Zanon" src="/avatar.png" />);

    expect(screen.getByRole('img', { name: 'Foto de Ana Zanon' })).toHaveAttribute(
      'src',
      '/avatar.png',
    );
  });

  it('falls back to initials when image fails', () => {
    render(<Avatar name="Ana Zanon" src="/missing.png" />);

    fireEvent.error(screen.getByRole('img', { name: 'Ana Zanon' }));

    expect(screen.getByRole('img', { name: 'Ana Zanon' })).toHaveTextContent('AZ');
  });

  it('applies size and disabled state', () => {
    const { container } = render(<Avatar disabled name="Ana Zanon" size="xlarge" />);
    const avatar = container.querySelector('.ds-avatar');

    expect(avatar).toHaveClass('ds-avatar--size-xlarge');
    expect(avatar).toHaveAttribute('aria-disabled', 'true');
  });
});
