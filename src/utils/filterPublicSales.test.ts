import { describe, expect, it } from 'vitest';

import type { PublicSale, SaleFilters } from '@/features/sales/types';
import {
  DEFAULT_FILTERS,
  filterAndGroupSales,
  filterPublicSales,
  getUniqueCountries,
  groupSalesByState,
  matchesSaleFilters,
} from '@/utils/filterPublicSales';

const makeSale = (overrides: Partial<PublicSale>): PublicSale => ({
  id: 'sale-1',
  title: 'Sale',
  saleType: 'public',
  state: 'live',
  startDateTime: '2026-01-05T10:00:00',
  countryCode: 'GB',
  locationType: 'online',
  lotCount: 10,
  ...overrides,
});

describe('matchesSaleFilters', () => {
  const sale = makeSale({ state: 'live', countryCode: 'GB', locationType: 'online' });

  it('returns true for default all filters', () => {
    expect(matchesSaleFilters(sale, DEFAULT_FILTERS)).toBe(true);
  });

  it('returns false when state filter does not match', () => {
    const filters: SaleFilters = { ...DEFAULT_FILTERS, state: 'upcoming' };
    expect(matchesSaleFilters(sale, filters)).toBe(false);
  });

  it('returns false when location type filter does not match', () => {
    const filters: SaleFilters = { ...DEFAULT_FILTERS, locationType: 'in-person' };
    expect(matchesSaleFilters(sale, filters)).toBe(false);
  });

  it('returns false when country filter does not match', () => {
    const filters: SaleFilters = { ...DEFAULT_FILTERS, country: 'FR' };
    expect(matchesSaleFilters(sale, filters)).toBe(false);
  });
});

describe('filterPublicSales and grouping', () => {
  const sales: PublicSale[] = [
    makeSale({ id: 'live-gb', state: 'live', countryCode: 'GB', locationType: 'online' }),
    makeSale({ id: 'upcoming-gb', state: 'upcoming', countryCode: 'GB', locationType: 'hybrid' }),
    makeSale({ id: 'live-fr', state: 'live', countryCode: 'FR', locationType: 'in-person' }),
  ];

  it('filters by selected state and country', () => {
    const filters: SaleFilters = { state: 'live', locationType: 'all', country: 'GB' };
    const result = filterPublicSales(sales, filters);

    expect(result).toHaveLength(1);
    expect(result[0]?.id).toBe('live-gb');
  });

  it('groups sales by state', () => {
    const grouped = groupSalesByState(sales);

    expect(grouped.live).toHaveLength(2);
    expect(grouped.upcoming).toHaveLength(1);
  });

  it('filters and groups in one pass with total count', () => {
    const filters: SaleFilters = { state: 'all', locationType: 'hybrid', country: 'GB' };
    const grouped = filterAndGroupSales(sales, filters);

    expect(grouped.live).toHaveLength(0);
    expect(grouped.upcoming).toHaveLength(1);
    expect(grouped.upcoming[0]?.id).toBe('upcoming-gb');
    expect(grouped.total).toBe(1);
  });

  it('returns unique sorted country codes', () => {
    const countries = getUniqueCountries(sales);
    expect(countries).toEqual(['FR', 'GB']);
  });
});
