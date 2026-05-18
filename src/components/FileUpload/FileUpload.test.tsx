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

  it('marks the input as required', () => {
    render(<FileUpload required label="Anexo" />);

    expect(screen.getByLabelText(/Anexo/)).toBeRequired();
  });

  it('connects helper text with aria-describedby', () => {
    render(<FileUpload helperText="Envie apenas PDF" label="Comprovante" />);

    const input = screen.getByLabelText('Comprovante');

    expect(input).toHaveAccessibleDescription('Envie apenas PDF');
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
    expect(screen.getByText('documento.pdf')).toBeInTheDocument();
  });

  it('limits dropped files to one when multiple is false', () => {
    const onFilesChange = vi.fn();
    const firstFile = createFile('primeiro.pdf');
    const secondFile = createFile('segundo.pdf');

    render(<FileUpload label="Documento" mode="dropzone" onFilesChange={onFilesChange} />);

    fireEvent.drop(screen.getByText(/Drag and drop files here/).closest('label') as HTMLElement, {
      dataTransfer: {
        files: [firstFile, secondFile],
      },
    });

    expect(onFilesChange).toHaveBeenCalledWith([firstFile], expect.any(Object));
  });

  it('clears selected files', () => {
    const onClear = vi.fn();
    const onFilesChange = vi.fn();
    const file = createFile();

    render(
      <FileUpload
        defaultFiles={[file]}
        label="Documento"
        onClear={onClear}
        onFilesChange={onFilesChange}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: /Clear Files/ }));

    expect(onClear).toHaveBeenCalledTimes(1);
    expect(onFilesChange).toHaveBeenLastCalledWith([], expect.any(Object));
    expect(screen.queryByText('documento.pdf')).not.toBeInTheDocument();
  });

  it('calls onValidate with selected files', () => {
    const onValidate = vi.fn();
    const file = createFile();

    render(
      <FileUpload defaultFiles={[file]} label="Documento" onValidate={onValidate} showValidate />,
    );

    fireEvent.click(screen.getByRole('button', { name: /Validate/ }));

    expect(onValidate).toHaveBeenCalledWith([file], expect.any(Object));
  });

  it('disables the native input and visible actions', () => {
    render(<FileUpload disabled label="Documento" showValidate />);

    expect(screen.getByLabelText('Documento')).toBeDisabled();
    expect(screen.getByRole('button', { name: /Upload Files/ })).toBeDisabled();
    expect(screen.getByRole('button', { name: /Validate/ })).toBeDisabled();
  });
});
