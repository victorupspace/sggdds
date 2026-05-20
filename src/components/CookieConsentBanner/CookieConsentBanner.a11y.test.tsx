import { render } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { describe, expect, it } from 'vitest';

import { CookieConsentBanner } from './CookieConsentBanner';

describe('CookieConsentBanner — accessibility', () => {
  it('has no violations with default content', async () => {
    const { container } = render(<CookieConsentBanner />);

    expect(await axe(container)).toHaveNoViolations();
  });
});
