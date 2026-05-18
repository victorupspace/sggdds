import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { Toast } from './Toast';

afterEach(() => {
  vi.useRealTimers();
});

describe('Toast', () => {
  it('renders title and supporting content', () => {
    render(
      <Toast autoDismiss={false} title="Title goes here">
        Supporting text
      </Toast>,
    );

    expect(screen.getByRole('status')).toHaveTextContent('Title goes here');
    expect(screen.getByText('Supporting text')).toBeInTheDocument();
  });

  it('uses alert role for negative variant by default', () => {
    render(
      <Toast autoDismiss={false} title="Erro" variant="negative">
        Tente novamente.
      </Toast>,
    );

    expect(screen.getByRole('alert')).toHaveTextContent('Erro');
  });

  it('allows overriding the role', () => {
    render(
      <Toast autoDismiss={false} role="alert" title="Aviso">
        Conteudo
      </Toast>,
    );

    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('calls action handlers', () => {
    const onClick = vi.fn();

    render(<Toast actions={[{ label: 'Button', onClick }]} autoDismiss={false} title="Title" />);

    fireEvent.click(screen.getByRole('button', { name: 'Button' }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renders at most two actions', () => {
    render(
      <Toast
        actions={[{ label: 'Action 1' }, { label: 'Action 2' }, { label: 'Action 3' }]}
        autoDismiss={false}
        title="Title"
      />,
    );

    expect(screen.getByRole('button', { name: 'Action 1' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Action 2' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Action 3' })).not.toBeInTheDocument();
  });

  it('dismisses itself in uncontrolled mode', () => {
    const onDismiss = vi.fn();
    const onOpenChange = vi.fn();

    render(
      <Toast
        autoDismiss={false}
        onDismiss={onDismiss}
        onOpenChange={onOpenChange}
        title="Title"
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Dispensar notificacao' }));

    expect(onDismiss).toHaveBeenCalledTimes(1);
    expect(onOpenChange).toHaveBeenCalledWith(false);
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('does not hide itself when open state is controlled', () => {
    const onOpenChange = vi.fn();

    render(<Toast autoDismiss={false} isOpen onOpenChange={onOpenChange} title="Title" />);

    fireEvent.click(screen.getByRole('button', { name: 'Dispensar notificacao' }));

    expect(onOpenChange).toHaveBeenCalledWith(false);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('does not render dismiss button when dismissible is false', () => {
    render(
      <Toast autoDismiss={false} dismissible={false} title="Title">
        Conteudo
      </Toast>,
    );

    expect(screen.queryByRole('button', { name: 'Dispensar notificacao' })).not.toBeInTheDocument();
  });

  it('auto dismisses after duration', () => {
    const onOpenChange = vi.fn();

    vi.useFakeTimers();

    render(<Toast duration={1000} onOpenChange={onOpenChange} title="Title" />);

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(onOpenChange).toHaveBeenCalledWith(false);
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('pauses auto dismiss while hovered', () => {
    const onOpenChange = vi.fn();

    vi.useFakeTimers();

    render(<Toast duration={1000} onOpenChange={onOpenChange} title="Title" />);

    fireEvent.mouseEnter(screen.getByRole('status'));

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(onOpenChange).not.toHaveBeenCalled();

    fireEvent.mouseLeave(screen.getByRole('status'));

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('supports disabled actions accessibly', () => {
    render(<Toast actions={[{ disabled: true, label: 'Button' }]} autoDismiss={false} title="Title" />);

    expect(screen.getByRole('button', { name: 'Button' })).toBeDisabled();
  });
});
