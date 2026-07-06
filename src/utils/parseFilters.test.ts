import { describe, expect, it } from 'vitest';

import { parseFilters } from '@/utils/parseFilters';

const makeParams = (query: string): URLSearchParams => new URLSearchParams(query);

describe('parseFilters', () => {
  it('parses valid state and format values', () => {
    const params = makeParams('state=live&format=hybrid&country=FR');
    const result = parseFilters(params);

    expect(result).toEqual({
      state: 'live',
      locationType: 'hybrid',
      country: 'FR',
    });
  });

  it('falls back to defaults for invalid state and format values', () => {
    const params = makeParams('state=archived&format=offline&country=US');
    const result = parseFilters(params);

    expect(result).toEqual({
      state: 'all',
      locationType: 'all',
      country: 'US',
    });
  });

  it('defaults to all values when params are missing', () => {
    const params = makeParams('');
    const result = parseFilters(params);

    expect(result).toEqual({
      state: 'all',
      locationType: 'all',
      country: 'all',
    });
  });
});
