import { render } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { describe, expect, it } from 'vitest';

import { FileUpload } from './FileUpload';

describe('FileUpload — accessibility', () => {
  it('has no violations in button mode', async () => {
    const { container } = render(
      <FileUpload label="Enviar comprovante" mode="button" />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no violations in dropzone mode', async () => {
    const { container } = render(
      <FileUpload
        label="Anexar documentos"
        mode="dropzone"
        dropzoneText="Arraste e solte arquivos aqui"
        dropzoneActionText="ou selecione do dispositivo"
        dropzoneHint="PDF, PNG ou JPG até 5MB"
      />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no violations with helper text', async () => {
    const { container } = render(
      <FileUpload
        label="Enviar foto"
        helperText="Formato JPG ou PNG, até 2MB."
      />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no violations in error state', async () => {
    const { container } = render(
      <FileUpload
        label="Anexar comprovante"
        state="error"
        errorText="Arquivo obrigatório."
      />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no violations when disabled', async () => {
    const { container } = render(
      <FileUpload label="Upload indisponível" disabled />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
