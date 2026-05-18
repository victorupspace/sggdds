import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { BackToTop } from './BackToTop';

describe('BackToTop', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      value: vi.fn().mockReturnValue({
        matches: false,
      }),
    });

    Object.defineProperty(window, 'scrollTo', {
      configurable: true,
      value: vi.fn(),
    });
  });

  it('renders hidden from keyboard flow by default', () => {
    render(<BackToTop />);

    const button = screen.getByRole('button', { hidden: true });

    expect(button).toHaveAttribute('aria-hidden', 'true');
    expect(button).toHaveAttribute('tabIndex', '-1');
  });

  it('renders visible state when controlled', () => {
    render(<BackToTop visible />);

    const button = screen.getByRole('button', { name: 'Voltar ao topo' });

    expect(button).toHaveClass('ds-back-to-top--visible');
    expect(button).not.toHaveAttribute('tabIndex');
  });

  it('calls onClick and scrolls window to top', () => {
    const onClick = vi.fn();

    render(<BackToTop onClick={onClick} visible />);

    fireEvent.click(screen.getByRole('button', { name: 'Voltar ao topo' }));

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(window.scrollTo).toHaveBeenCalledWith({ behavior: 'smooth', top: 0 });
  });

  it('does not scroll when click is prevented', () => {
    render(
      <BackToTop
        onClick={(event) => {
          event.preventDefault();
        }}
        visible
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Voltar ao topo' }));

    expect(window.scrollTo).not.toHaveBeenCalled();
  });

  it('uses automatic scroll when reduced motion is requested', () => {
    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      value: vi.fn().mockReturnValue({
        matches: true,
      }),
    });

    render(<BackToTop visible />);

    fireEvent.click(screen.getByRole('button', { name: 'Voltar ao topo' }));

    expect(window.scrollTo).toHaveBeenCalledWith({ behavior: 'auto', top: 0 });
  });

  it('scrolls a custom target when provided', () => {
    const scrollTo = vi.fn();
    const target = document.createElement('div');

    target.scrollTo = scrollTo;

    render(<BackToTop target={target} visible />);

    fireEvent.click(screen.getByRole('button', { name: 'Voltar ao topo' }));

    expect(scrollTo).toHaveBeenCalledWith({ behavior: 'smooth', top: 0 });
    expect(window.scrollTo).not.toHaveBeenCalled();
  });

  it('supports disabled state', () => {
    render(<BackToTop disabled visible />);

    expect(screen.getByRole('button', { name: 'Voltar ao topo' })).toBeDisabled();
  });
});
