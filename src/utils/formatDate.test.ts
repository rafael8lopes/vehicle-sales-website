import { describe, expect, it } from 'vitest';

import {
  formatCalendarDate,
  formatFullSaleDate,
  formatSaleDate,
  formatSaleDateRange,
  formatSaleTime,
} from '@/utils/formatDate';

describe('formatDate utilities', () => {
  it('formats sale date and full date consistently', () => {
    expect(formatSaleDate('2026-01-05T14:30:00')).toBe('5 Jan 2026');
    expect(formatFullSaleDate('2026-01-05T14:30:00')).toBe('5 January 2026');
  });

  it('formats sale time in 24h format', () => {
    expect(formatSaleTime('2026-01-05T14:30:00')).toBe('14:30');
  });

  it('formats same-day date ranges with time span', () => {
    const result = formatSaleDateRange('2026-01-05T10:00:00', '2026-01-05T15:30:00');
    expect(result).toBe('5 Jan 2026 · 10:00 — 15:30');
  });

  it('formats multi-day date ranges compactly', () => {
    const result = formatSaleDateRange('2026-01-05T10:00:00', '2026-01-08T15:30:00');
    expect(result).toBe('5 Jan — 8 Jan 2026');
  });

  it('returns only start date when end date is missing', () => {
    const result = formatSaleDateRange('2026-01-05T10:00:00');
    expect(result).toBe('5 Jan 2026');
  });

  it('formats a provided calendar date', () => {
    const result = formatCalendarDate(new Date('2026-02-02T00:00:00'));
    expect(result).toBe('2 Feb 2026');
  });
});
