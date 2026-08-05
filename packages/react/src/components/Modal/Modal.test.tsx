import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Modal } from './Modal';

function getOverlay(container: HTMLElement) {
  const overlay = container.querySelector('.ds-modal');

  if (!(overlay instanceof HTMLElement)) {
    throw new Error('Overlay não encontrado');
  }

  return overlay;
}

describe('Modal', () => {
  it('renders title, subheader, body and footer slots when open', () => {
    render(
      <Modal
        footer={<button type="button">Action 1</button>}
        isOpen
        onClose={vi.fn()}
        subheader="Texto de apoio"
        title="Title"
      >
        <p>Body content</p>
      </Modal>,
    );

    const dialog = screen.getByRole('dialog', { name: 'Title' });
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAccessibleDescription('Texto de apoio');
    expect(screen.getByText('Body content')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Action 1' })).toBeInTheDocument();
  });

  it('renders nothing when closed', () => {
    render(
      <Modal isOpen={false} onClose={vi.fn()} title="Title">
        <p>Body content</p>
      </Modal>,
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('applies the size class', () => {
    const { container } = render(<Modal isOpen onClose={vi.fn()} size="extended" title="Title" />);

    expect(container.querySelector('.ds-modal')).toHaveClass('ds-modal--size-extended');
  });

  it('calls onClose from the close button', () => {
    const onClose = vi.fn();

    render(<Modal isOpen onClose={onClose} title="Title" />);

    fireEvent.click(screen.getByRole('button', { name: 'Fechar modal' }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('closes with Escape by default', () => {
    const onClose = vi.fn();

    render(<Modal isOpen onClose={onClose} title="Title" />);

    fireEvent.keyDown(document, { key: 'Escape' });

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not close with Escape when closeOnEsc is false', () => {
    const onClose = vi.fn();

    render(<Modal closeOnEsc={false} isOpen onClose={onClose} title="Title" />);

    fireEvent.keyDown(document, { key: 'Escape' });

    expect(onClose).not.toHaveBeenCalled();
  });

  it('closes when clicking the backdrop', () => {
    const onClose = vi.fn();

    const { container } = render(<Modal isOpen onClose={onClose} title="Title" />);
    const overlay = getOverlay(container);

    fireEvent.mouseDown(overlay);
    fireEvent.click(overlay);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not close on backdrop click when disabled', () => {
    const onClose = vi.fn();

    const { container } = render(
      <Modal closeOnOverlayClick={false} isOpen onClose={onClose} title="Title" />,
    );
    const overlay = getOverlay(container);

    fireEvent.mouseDown(overlay);
    fireEvent.click(overlay);

    expect(onClose).not.toHaveBeenCalled();
  });

  it('locks body scroll while open', () => {
    const { unmount } = render(<Modal isOpen onClose={vi.fn()} title="Title" />);

    expect(document.body.style.overflow).toBe('hidden');

    unmount();

    expect(document.body.style.overflow).toBe('');
  });
});
