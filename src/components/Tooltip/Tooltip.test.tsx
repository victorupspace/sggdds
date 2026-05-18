import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { Tooltip } from './Tooltip';

afterEach(() => {
  vi.useRealTimers();
});

describe('Tooltip', () => {
  it('renders the trigger and tooltip content', () => {
    render(
      <Tooltip content="Label" defaultOpen delayDuration={0}>
        <button type="button">Trigger</button>
      </Tooltip>,
    );

    expect(screen.getByRole('button', { name: 'Trigger' })).toBeInTheDocument();
    expect(screen.getByRole('tooltip')).toHaveTextContent('Label');
  });

  it('connects tooltip content with aria-describedby while open', () => {
    render(
      <Tooltip content="Label" defaultOpen delayDuration={0} id="tooltip-id">
        <button type="button">Trigger</button>
      </Tooltip>,
    );

    expect(screen.getByRole('button', { name: 'Trigger' })).toHaveAttribute(
      'aria-describedby',
      'tooltip-id',
    );
  });

  it('opens on focus after delay', () => {
    vi.useFakeTimers();

    render(
      <Tooltip content="Label" delayDuration={100} id="tooltip-id">
        <button type="button">Trigger</button>
      </Tooltip>,
    );

    fireEvent.focus(screen.getByRole('button', { name: 'Trigger' }));

    act(() => {
      vi.advanceTimersByTime(100);
    });

    expect(screen.getByRole('button', { name: 'Trigger' })).toHaveAttribute(
      'aria-describedby',
      'tooltip-id',
    );
  });

  it('opens on hover and closes on mouse leave', () => {
    vi.useFakeTimers();

    render(
      <Tooltip closeDelay={50} content="Label" delayDuration={50} id="tooltip-id">
        <button type="button">Trigger</button>
      </Tooltip>,
    );

    const trigger = screen.getByRole('button', { name: 'Trigger' });

    fireEvent.mouseEnter(trigger);

    act(() => {
      vi.advanceTimersByTime(50);
    });

    expect(trigger).toHaveAttribute('aria-describedby', 'tooltip-id');

    fireEvent.mouseLeave(trigger);

    act(() => {
      vi.advanceTimersByTime(50);
    });

    expect(trigger).not.toHaveAttribute('aria-describedby');
  });

  it('closes on Escape', () => {
    vi.useFakeTimers();

    render(
      <Tooltip content="Label" defaultOpen delayDuration={0} id="tooltip-id">
        <button type="button">Trigger</button>
      </Tooltip>,
    );

    const trigger = screen.getByRole('button', { name: 'Trigger' });

    fireEvent.keyDown(trigger, { key: 'Escape' });

    act(() => {
      vi.advanceTimersByTime(80);
    });

    expect(trigger).not.toHaveAttribute('aria-describedby');
  });

  it('does not open when disabled', () => {
    vi.useFakeTimers();

    render(
      <Tooltip content="Label" disabled id="tooltip-id">
        <button type="button">Trigger</button>
      </Tooltip>,
    );

    const trigger = screen.getByRole('button', { name: 'Trigger' });

    fireEvent.focus(trigger);

    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(trigger).not.toHaveAttribute('aria-describedby');
  });

  it('calls child event handlers and onOpenChange', () => {
    const onFocus = vi.fn();
    const onOpenChange = vi.fn();

    vi.useFakeTimers();

    render(
      <Tooltip content="Label" delayDuration={0} onOpenChange={onOpenChange}>
        <button onFocus={onFocus} type="button">
          Trigger
        </button>
      </Tooltip>,
    );

    fireEvent.focus(screen.getByRole('button', { name: 'Trigger' }));

    act(() => {
      vi.advanceTimersByTime(0);
    });

    expect(onFocus).toHaveBeenCalledTimes(1);
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });
});
