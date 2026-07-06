import { describe, expect, it } from 'vitest';

import type { SaleFilters } from '@/features/sales/types';
import { parseFilters } from '@/utils/parseFilters';
import { serializeFilters } from '@/utils/serializeFilters';

describe('serializeFilters', () => {
  it('serializes only non-default filters', () => {
    const filters: SaleFilters = {
      state: 'live',
      locationType: 'hybrid',
      country: 'FR',
    };

    const params = serializeFilters(filters);

    expect(params.toString()).toBe('state=live&format=hybrid&country=FR');
  });

  it('omits all params when all filters are defaults', () => {
    const filters: SaleFilters = {
      state: 'all',
      locationType: 'all',
      country: 'all',
    };

    const params = serializeFilters(filters);

    expect(params.toString()).toBe('');
  });

  it('round-trips with parseFilters for valid values', () => {
    const filters: SaleFilters = {
      state: 'upcoming',
      locationType: 'in-person',
      country: 'GB',
    };

    const parsed = parseFilters(serializeFilters(filters));

    expect(parsed).toEqual(filters);
  });
});
