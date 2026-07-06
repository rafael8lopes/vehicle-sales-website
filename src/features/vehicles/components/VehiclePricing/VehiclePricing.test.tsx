import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { VehiclePricing } from '@/features/vehicles/components/VehiclePricing/VehiclePricing';

describe('VehiclePricing', () => {
  it('returns null when no pricing is available', () => {
    const { container } = render(<VehiclePricing />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders current and buy now pricing with disclaimer', () => {
    render(<VehiclePricing currentPrice={12000} buyNowPrice={15000} currency="GBP" />);

    expect(screen.getByText('Starting Estimate')).toBeInTheDocument();
    expect(screen.getByText('Buy Now')).toBeInTheDocument();
    expect(screen.getByText(/£12,000/)).toBeInTheDocument();
    expect(screen.getByText(/£15,000/)).toBeInTheDocument();
    expect(screen.getByText(/prices exclude buyer's premium/i)).toBeInTheDocument();
  });
});
