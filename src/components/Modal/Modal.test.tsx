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
    render(
      <Modal
        isOpen
        onClose={vi.fn()}
        subtitle="Descricao curta"
        title="Titulo do modal"
      >
        Conteudo
      </Modal>,
    );

    const dialog = screen.getByRole('dialog', { name: 'Titulo do modal' });
    const title = screen.getByText('Titulo do modal');
    const subtitle = screen.getByText('Descricao curta');

    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-labelledby', title.id);
    expect(dialog).toHaveAttribute('aria-describedby', subtitle.id);
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn();

    renderModal({ onClose });

    fireEvent.click(screen.getByRole('button', { name: 'Fechar modal' }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('supports custom close button label', () => {
    const onClose = vi.fn();

    render(
      <Modal closeLabel="Fechar janela" isOpen onClose={onClose} title="Titulo do modal">
        Conteudo
      </Modal>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Fechar janela' }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('renders typed actions and calls their handlers', () => {
    const onPrimaryClick = vi.fn();

    render(
      <Modal
        actions={[
          { label: 'Action 3', variant: 'tertiary' },
          { label: 'Action 2', variant: 'secondary' },
          { label: 'Action 1', onClick: onPrimaryClick, variant: 'primary' },
        ]}
        isOpen
        onClose={vi.fn()}
        title="Titulo do modal"
      >
        Conteudo
      </Modal>,
    );

    expect(screen.getByRole('button', { name: 'Action 3' })).toHaveClass(
      'ds-modal__action--tertiary',
    );
    expect(screen.getByRole('button', { name: 'Action 2' })).toHaveClass(
      'ds-modal__action--secondary',
    );

    fireEvent.click(screen.getByRole('button', { name: 'Action 1' }));

    expect(onPrimaryClick).toHaveBeenCalledTimes(1);
  });

  it('renders at most three typed actions', () => {
    render(
      <Modal
        actions={[
          { label: 'Action 1' },
          { label: 'Action 2' },
          { label: 'Action 3' },
          { label: 'Action 4' },
        ]}
        isOpen
        onClose={vi.fn()}
        title="Titulo do modal"
      >
        Conteudo
      </Modal>,
    );

    expect(screen.getByRole('button', { name: 'Action 1' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Action 2' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Action 3' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Action 4' })).not.toBeInTheDocument();
  });

  it('keeps footer compatibility over typed actions', () => {
    render(
      <Modal
        actions={[{ label: 'Generated action' }]}
        footer={<button type="button">Custom action</button>}
        isOpen
        onClose={vi.fn()}
        title="Titulo do modal"
      >
        Conteudo
      </Modal>,
    );

    expect(screen.getByRole('button', { name: 'Custom action' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Generated action' })).not.toBeInTheDocument();
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
