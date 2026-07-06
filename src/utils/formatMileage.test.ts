import { describe, expect, it } from 'vitest';

import { formatMileage } from '@/utils/formatMileage';

describe('formatMileage', () => {
  it('formats mileage with default locale and unit', () => {
    expect(formatMileage(123456)).toBe('123,456 km');
  });

  it('formats mileage with provided unit', () => {
    expect(formatMileage(98765, 'mi')).toBe('98,765 mi');
  });

  it('formats mileage using provided locale', () => {
    expect(formatMileage(123456, 'km', 'de-DE')).toBe('123.456 km');
  });
});
