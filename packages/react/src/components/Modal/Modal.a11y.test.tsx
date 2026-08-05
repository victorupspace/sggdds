import { render } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { describe, expect, it } from 'vitest';

import { Modal } from './Modal';

const noop = () => undefined;

describe('Modal — accessibility', () => {
  it('has no violations when open with title and body', async () => {
    const { container } = render(
      <Modal isOpen onClose={noop} title="Confirmar exclusão">
        <p>Esta ação não pode ser desfeita.</p>
      </Modal>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no violations with subheader and footer actions', async () => {
    const { container } = render(
      <Modal
        isOpen
        onClose={noop}
        title="Salvar alterações"
        subheader="Suas mudanças serão aplicadas imediatamente."
        footer={
          <>
            <button type="button">Cancelar</button>
            <button type="button">Salvar</button>
          </>
        }
      >
        <p>Confirme antes de prosseguir.</p>
      </Modal>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no violations with custom close label', async () => {
    const { container } = render(
      <Modal isOpen onClose={noop} title="Detalhes do pedido" closeLabel="Fechar diálogo">
        <p>Conteúdo do pedido.</p>
      </Modal>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no violations in extended size', async () => {
    const { container } = render(
      <Modal isOpen onClose={noop} title="Termos de uso" size="extended">
        <p>Texto longo do termo de uso.</p>
      </Modal>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
