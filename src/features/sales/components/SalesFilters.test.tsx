import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import type { PublicSale, SaleFilters } from '@/features/sales/types';
import { SalesFilters } from '@/features/sales/components/SalesFilters';

const sales: PublicSale[] = [
  {
    id: 'sale-live-gb',
    title: 'Live UK Sale',
    saleType: 'public',
    state: 'live',
    startDateTime: '2026-01-05T10:00:00',
    countryCode: 'GB',
    locationType: 'online',
    lotCount: 10,
  },
  {
    id: 'sale-upcoming-fr',
    title: 'Upcoming FR Sale',
    saleType: 'public',
    state: 'upcoming',
    startDateTime: '2026-01-10T10:00:00',
    countryCode: 'FR',
    locationType: 'hybrid',
    lotCount: 7,
  },
];

const baseFilters: SaleFilters = {
  state: 'all',
  locationType: 'all',
  country: 'all',
};

describe('SalesFilters', () => {
  it('calls onFilterChange when state and format filters are clicked', () => {
    const onFilterChange = vi.fn();

    render(<SalesFilters filters={baseFilters} sales={sales} onFilterChange={onFilterChange} />);

    fireEvent.click(screen.getByRole('button', { name: /live/i }));
    expect(onFilterChange).toHaveBeenCalledWith({
      ...baseFilters,
      state: 'live',
    });

    fireEvent.click(screen.getByRole('button', { name: /hybrid/i }));
    expect(onFilterChange).toHaveBeenCalledWith({
      ...baseFilters,
      locationType: 'hybrid',
    });
  });

  it('calls onFilterChange when country changes', () => {
    const onFilterChange = vi.fn();

    render(<SalesFilters filters={baseFilters} sales={sales} onFilterChange={onFilterChange} />);

    fireEvent.change(screen.getByLabelText('Country'), {
      target: { value: 'FR' },
    });

    expect(onFilterChange).toHaveBeenCalledWith({
      ...baseFilters,
      country: 'FR',
    });
  });

  it('shows state counts and available countries', () => {
    const onFilterChange = vi.fn();

    render(<SalesFilters filters={baseFilters} sales={sales} onFilterChange={onFilterChange} />);

    expect(screen.getByRole('button', { name: /all/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /live/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /upcoming/i })).toBeInTheDocument();

    const countrySelect = screen.getByLabelText('Country');
    expect(countrySelect).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /france/i })).toHaveValue('FR');
    expect(screen.getByRole('option', { name: /united kingdom/i })).toHaveValue('GB');
  });
});
