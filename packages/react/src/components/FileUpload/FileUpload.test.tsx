import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { FileUpload } from './FileUpload';

function createFile(name = 'documento.pdf', size = 12) {
  return new File(['a'.repeat(size)], name, { type: 'application/pdf' });
}

describe('FileUpload', () => {
  it('connects the visible label to the native file input', () => {
    render(<FileUpload label="Documento" />);

    expect(screen.getByLabelText('Documento')).toHaveAttribute('type', 'file');
  });

  it('renders the attach button with the Figma label', () => {
    render(<FileUpload label="Documento" />);

    expect(screen.getByRole('button', { name: 'Anexar arquivos' })).toBeInTheDocument();
  });

  it('marks the input as required', () => {
    render(<FileUpload required label="Anexo" />);

    expect(screen.getByLabelText(/Anexo/)).toBeRequired();
  });

  it('connects helper text with aria-describedby', () => {
    render(<FileUpload helperText="Envie apenas PDF" label="Comprovante" />);

    expect(screen.getByLabelText('Comprovante')).toHaveAccessibleDescription('Envie apenas PDF');
  });

  it('sets aria-invalid and describes the error message', () => {
    render(<FileUpload errorText="Arquivo obrigatorio" helperText="Helper text" label="Arquivo" />);

    const input = screen.getByLabelText('Arquivo');

    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAccessibleDescription('Arquivo obrigatorio Helper text');
  });

  it('calls onChange and onFilesChange when files are selected', () => {
    const onChange = vi.fn();
    const onFilesChange = vi.fn();
    const file = createFile();

    render(<FileUpload label="Documento" onChange={onChange} onFilesChange={onFilesChange} />);

    fireEvent.change(screen.getByLabelText('Documento'), { target: { files: [file] } });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onFilesChange).toHaveBeenCalledWith([file], expect.any(Object));
    expect(screen.getByText('documento')).toBeInTheDocument();
    expect(screen.getByText('.pdf')).toBeInTheDocument();
  });

  it('limits dropped files to one when multiple is false', () => {
    const onFilesChange = vi.fn();
    const firstFile = createFile('primeiro.pdf');
    const secondFile = createFile('segundo.pdf');

    render(<FileUpload label="Documento" mode="dropzone" onFilesChange={onFilesChange} />);

    fireEvent.drop(screen.getByText(/Arraste arquivos aqui/).closest('label') as HTMLElement, {
      dataTransfer: {
        files: [firstFile, secondFile],
      },
    });

    expect(onFilesChange).toHaveBeenCalledWith([firstFile], expect.any(Object));
  });

  it('removes a file from the list', () => {
    const onFileRemove = vi.fn();
    const onFilesChange = vi.fn();
    const file = createFile();

    render(
      <FileUpload
        defaultFiles={[file]}
        label="Documento"
        onFileRemove={onFileRemove}
        onFilesChange={onFilesChange}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Remover documento.pdf' }));

    expect(onFileRemove).toHaveBeenCalledWith(file, 0, expect.any(Object));
    expect(onFilesChange).toHaveBeenLastCalledWith([], expect.any(Object));
    expect(screen.queryByText('documento')).not.toBeInTheDocument();
  });

  it('shows the item status label', () => {
    render(<FileUpload defaultFiles={[createFile()]} label="Documento" />);

    expect(screen.getByText('Carregado')).toBeInTheDocument();
  });

  it('renders the error upload item in button mode', () => {
    render(<FileUpload errorText="O upload falhou." label="Documento" state="error" />);

    expect(screen.getByText('O upload falhou.')).toBeInTheDocument();
  });

  it('renders the dropzone feedback in error state', () => {
    render(
      <FileUpload
        errorText="Arquivo não suportado"
        label="Documento"
        mode="dropzone"
        state="error"
      />,
    );

    expect(screen.getByText('Arquivo não suportado')).toBeInTheDocument();
    expect(screen.queryByText(/PDF, CSV ou XLSX/)).not.toBeInTheDocument();
  });

  it('disables the native input and the attach button', () => {
    render(<FileUpload disabled label="Documento" />);

    expect(screen.getByLabelText('Documento')).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Anexar arquivos' })).toBeDisabled();
  });
});
