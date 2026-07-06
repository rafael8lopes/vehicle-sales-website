import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

import type { PublicSale } from '@/features/sales/types';
import { SaleCard } from '@/components/SaleCard/SaleCard';

const makeSale = (overrides: Partial<PublicSale> = {}): PublicSale => ({
  id: 'sale-1',
  title: 'Winter Public Sale',
  saleType: 'public',
  state: 'live',
  featured: true,
  startDateTime: '2026-01-05T10:00:00',
  endDateTime: '2026-01-05T15:00:00',
  countryCode: 'GB',
  location: 'London',
  locationType: 'online',
  lotCount: 120,
  ...overrides,
});

describe('SaleCard', () => {
  it('renders key sale details and catalogue link', () => {
    const sale = makeSale();

    render(
      <MemoryRouter>
        <SaleCard sale={sale} />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: sale.title })).toBeInTheDocument();
    expect(screen.getByText('LIVE')).toBeInTheDocument();
    expect(screen.getByText('FEATURED')).toBeInTheDocument();
    expect(screen.getByText('120 lots')).toBeInTheDocument();
    expect(screen.getByText(/5 Jan 2026/i)).toBeInTheDocument();

    const link = screen.getByRole('link', { name: /view catalogue for winter public sale/i });
    expect(link).toHaveAttribute('href', '/sales/sale-1');
  });

  it('renders placeholder instead of image when hero image is missing', () => {
    const sale = makeSale({ heroImageUrl: undefined, featured: false, state: 'upcoming' });

    render(
      <MemoryRouter>
        <SaleCard sale={sale} />
      </MemoryRouter>,
    );

    expect(screen.queryByRole('img', { name: sale.title })).not.toBeInTheDocument();
    expect(screen.getByText('UPCOMING')).toBeInTheDocument();
  });
});
