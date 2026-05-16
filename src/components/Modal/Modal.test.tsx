import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Modal } from './Modal';

function renderModal({
  closeOnEsc = true,
  closeOnOverlayClick = true,
  isOpen = true,
  onClose = vi.fn(),
}: {
  closeOnEsc?: boolean;
  closeOnOverlayClick?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
} = {}) {
  render(
    <Modal
      closeOnEsc={closeOnEsc}
      closeOnOverlayClick={closeOnOverlayClick}
      footer={<button type="button">Confirmar</button>}
      isOpen={isOpen}
      onClose={onClose}
      title="Titulo do modal"
    >
      <button type="button">Primeira acao</button>
      <p>Conteudo do modal</p>
      <button type="button">Ultima acao</button>
    </Modal>,
  );

  return { onClose };
}

describe('Modal', () => {
  it('does not render when closed', () => {
    renderModal({ isOpen: false });

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders title, content and footer when open', () => {
    renderModal();

    expect(screen.getByRole('dialog', { name: 'Titulo do modal' })).toBeInTheDocument();
    expect(screen.getByText('Conteudo do modal')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Confirmar' })).toBeInTheDocument();
  });

  it('uses dialog accessibility attributes', () => {
    renderModal();

    const dialog = screen.getByRole('dialog', { name: 'Titulo do modal' });
    const title = screen.getByText('Titulo do modal');

    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-labelledby', title.id);
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn();

    renderModal({ onClose });

    fireEvent.click(screen.getByRole('button', { name: 'Fechar modal' }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when Escape is pressed', () => {
    const onClose = vi.fn();

    renderModal({ onClose });

    fireEvent.keyDown(document, { key: 'Escape' });

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not close on Escape when closeOnEsc is false', () => {
    const onClose = vi.fn();

    renderModal({ closeOnEsc: false, onClose });

    fireEvent.keyDown(document, { key: 'Escape' });

    expect(onClose).not.toHaveBeenCalled();
  });

  it('calls onClose when overlay is clicked', () => {
    const onClose = vi.fn();

    renderModal({ onClose });

    const overlay = screen.getByRole('dialog').parentElement;

    if (!overlay) {
      throw new Error('Modal overlay was not rendered.');
    }

    fireEvent.mouseDown(overlay);
    fireEvent.click(overlay);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not close on overlay click when closeOnOverlayClick is false', () => {
    const onClose = vi.fn();

    renderModal({ closeOnOverlayClick: false, onClose });

    const overlay = screen.getByRole('dialog').parentElement;

    if (!overlay) {
      throw new Error('Modal overlay was not rendered.');
    }

    fireEvent.mouseDown(overlay);
    fireEvent.click(overlay);

    expect(onClose).not.toHaveBeenCalled();
  });

  it('does not close when clicking inside the dialog', () => {
    const onClose = vi.fn();

    renderModal({ onClose });

    const dialog = screen.getByRole('dialog');

    fireEvent.mouseDown(dialog);
    fireEvent.click(dialog);

    expect(onClose).not.toHaveBeenCalled();
  });

  it('locks body scroll while open and restores it after unmount', () => {
    const previousOverflow = document.body.style.overflow;
    const { unmount } = render(
      <Modal isOpen onClose={vi.fn()} title="Titulo do modal">
        Conteudo
      </Modal>,
    );

    expect(document.body.style.overflow).toBe('hidden');

    unmount();

    expect(document.body.style.overflow).toBe(previousOverflow);
  });

  it('traps focus from the last focusable element to the first', () => {
    renderModal();

    const closeButton = screen.getByRole('button', { name: 'Fechar modal' });
    const confirmButton = screen.getByRole('button', { name: 'Confirmar' });

    confirmButton.focus();
    fireEvent.keyDown(document, { key: 'Tab' });

    expect(closeButton).toHaveFocus();
  });

  it('traps focus from the first focusable element to the last when shift tabbing', () => {
    renderModal();

    const closeButton = screen.getByRole('button', { name: 'Fechar modal' });
    const confirmButton = screen.getByRole('button', { name: 'Confirmar' });

    closeButton.focus();
    fireEvent.keyDown(document, { key: 'Tab', shiftKey: true });

    expect(confirmButton).toHaveFocus();
  });
});
