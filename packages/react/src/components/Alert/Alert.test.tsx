import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Alert } from './Alert';

describe('Alert', () => {
  it('renders title and supporting content', () => {
    render(<Alert title="Title goes here">Brief description</Alert>);

    expect(screen.getByRole('status')).toHaveTextContent('Title goes here');
    expect(screen.getByText('Brief description')).toBeInTheDocument();
  });

  it('uses alert role for error variants by default', () => {
    render(
      <Alert title="Erro" variant="error">
        Corrija os campos destacados.
      </Alert>,
    );

    expect(screen.getByRole('alert')).toHaveTextContent('Erro');
  });

  it('allows overriding the role', () => {
    render(
      <Alert role="note" title="Nota">
        Conteudo
      </Alert>,
    );

    expect(screen.getByRole('note')).toBeInTheDocument();
  });

  it('calls action handlers', () => {
    const onClick = vi.fn();

    render(<Alert actions={[{ label: 'Action 1', onClick }]} title="Title" />);

    fireEvent.click(screen.getByRole('button', { name: 'Action 1' }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renders at most two actions', () => {
    render(
      <Alert
        actions={[{ label: 'Action 1' }, { label: 'Action 2' }, { label: 'Action 3' }]}
        title="Title"
      />,
    );

    expect(screen.getByRole('button', { name: 'Action 1' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Action 2' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Action 3' })).not.toBeInTheDocument();
  });

  it('dismisses itself in uncontrolled mode', () => {
    const onDismiss = vi.fn();
    const onVisibleChange = vi.fn();

    render(<Alert onDismiss={onDismiss} onVisibleChange={onVisibleChange} title="Title" />);

    fireEvent.click(screen.getByRole('button', { name: 'Dispensar alerta' }));

    expect(onDismiss).toHaveBeenCalledTimes(1);
    expect(onVisibleChange).toHaveBeenCalledWith(false);
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('does not hide itself when visibility is controlled', () => {
    const onVisibleChange = vi.fn();

    render(<Alert isVisible onVisibleChange={onVisibleChange} title="Title" />);

    fireEvent.click(screen.getByRole('button', { name: 'Dispensar alerta' }));

    expect(onVisibleChange).toHaveBeenCalledWith(false);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('does not render dismiss button when dismissible is false', () => {
    render(
      <Alert dismissible={false} title="Title">
        Conteudo
      </Alert>,
    );

    expect(screen.queryByRole('button', { name: 'Dispensar alerta' })).not.toBeInTheDocument();
  });

  it('does not render when defaultVisible is false', () => {
    render(<Alert defaultVisible={false} title="Title" />);

    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('supports disabled actions accessibly', () => {
    render(<Alert actions={[{ disabled: true, label: 'Action 1' }]} title="Title" />);

    expect(screen.getByRole('button', { name: 'Action 1' })).toBeDisabled();
  });
});
