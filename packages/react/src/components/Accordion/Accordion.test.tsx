import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Accordion, AccordionItem } from './Accordion';

function renderAccordion({
  allowMultiple = false,
  defaultExpanded = [],
}: {
  allowMultiple?: boolean;
  defaultExpanded?: string[];
} = {}) {
  render(
    <Accordion allowMultiple={allowMultiple} defaultExpanded={defaultExpanded}>
      <AccordionItem id="first" title="First item">
        First content
      </AccordionItem>
      <AccordionItem id="second" title="Second item">
        Second content
      </AccordionItem>
      <AccordionItem disabled id="disabled" title="Disabled item">
        Disabled content
      </AccordionItem>
    </Accordion>,
  );
}

describe('Accordion', () => {
  it('renders items and content', () => {
    renderAccordion();

    expect(screen.getByRole('button', { name: 'First item' })).toBeInTheDocument();
    expect(screen.getByText('First content')).toBeInTheDocument();
  });

  it('expands default items', () => {
    renderAccordion({ defaultExpanded: ['first'] });

    expect(screen.getByRole('button', { name: 'First item' })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
    expect(screen.getByText('First content').closest('.ds-accordion__panel')).toHaveAttribute(
      'aria-hidden',
      'false',
    );
  });

  it('toggles an item when clicked', () => {
    renderAccordion();

    const first = screen.getByRole('button', { name: 'First item' });

    fireEvent.click(first);

    expect(first).toHaveAttribute('aria-expanded', 'true');
  });

  it('keeps only one item expanded by default', () => {
    renderAccordion({ defaultExpanded: ['first'] });

    fireEvent.click(screen.getByRole('button', { name: 'Second item' }));

    expect(screen.getByRole('button', { name: 'First item' })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
    expect(screen.getByRole('button', { name: 'Second item' })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
  });

  it('allows multiple expanded items when allowMultiple is true', () => {
    renderAccordion({ allowMultiple: true, defaultExpanded: ['first'] });

    fireEvent.click(screen.getByRole('button', { name: 'Second item' }));

    expect(screen.getByRole('button', { name: 'First item' })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
    expect(screen.getByRole('button', { name: 'Second item' })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
  });

  it('normalizes defaultExpanded when multiple items are not allowed', () => {
    renderAccordion({ defaultExpanded: ['first', 'second'] });

    expect(screen.getByRole('button', { name: 'First item' })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
    expect(screen.getByRole('button', { name: 'Second item' })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
  });

  it('uses aria-controls and aria-labelledby between trigger and panel', () => {
    renderAccordion({ defaultExpanded: ['first'] });

    const first = screen.getByRole('button', { name: 'First item' });
    const panel = screen.getByText('First content').closest('.ds-accordion__panel');

    expect(first).toHaveAttribute('aria-controls', panel?.id);
    expect(panel).toHaveAttribute('aria-labelledby', first.id);
    expect(panel).toHaveAttribute('role', 'region');
  });

  it('does not toggle disabled items', () => {
    renderAccordion();

    const disabled = screen.getByRole('button', { name: 'Disabled item' });

    expect(disabled).toBeDisabled();

    fireEvent.click(disabled);

    expect(disabled).toHaveAttribute('aria-expanded', 'false');
  });
});
