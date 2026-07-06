import { describe, expect, it } from 'vitest';

import { formatPrice } from '@/utils/formatPrice';

describe('formatPrice', () => {
  it('formats GBP without decimal places by default', () => {
    expect(formatPrice(123456)).toBe('£123,456');
  });

  it('formats with provided currency', () => {
    expect(formatPrice(9999, 'EUR')).toBe('€9,999');
  });

  it('formats using provided locale', () => {
    expect(formatPrice(123456, 'EUR', 'de-DE')).toBe('123.456\u00a0€');
  });
});
