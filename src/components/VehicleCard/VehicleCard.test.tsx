import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

import type { VehicleLot } from '@/features/vehicles/types';
import { VehicleCard } from '@/components/VehicleCard/VehicleCard';

const makeVehicle = (overrides: Partial<VehicleLot> = {}): VehicleLot => ({
  id: 'vehicle-1',
  saleId: 'sale-1',
  lotNumber: '101',
  make: 'Audi',
  model: 'A4',
  registrationYear: 2022,
  mileage: 12345,
  mileageUnit: 'km',
  fuelType: 'Petrol',
  transmission: 'Automatic',
  imageUrls: ['https://images.example.com/audi.jpg'],
  grade: 'A',
  conditionNotes: 'Well maintained',
  ...overrides,
});

describe('VehicleCard', () => {
  it('renders vehicle details and details link', () => {
    const vehicle = makeVehicle();

    render(
      <MemoryRouter>
        <VehicleCard vehicle={vehicle} />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: /audi a4/i })).toBeInTheDocument();
    expect(screen.getByText('Lot 101')).toBeInTheDocument();
    expect(screen.getByText('Grade A')).toBeInTheDocument();
    expect(screen.getByText('12,345 km')).toBeInTheDocument();

    const image = screen.getByRole('img', { name: /audi a4/i });
    expect(image).toHaveAttribute('src', vehicle.imageUrls?.[0]);

    const link = screen.getByRole('link', { name: /view details for audi a4/i });
    expect(link).toHaveAttribute('href', '/vehicles/vehicle-1');
  });

  it('switches to placeholder when image load fails', () => {
    const vehicle = makeVehicle();

    render(
      <MemoryRouter>
        <VehicleCard vehicle={vehicle} />
      </MemoryRouter>,
    );

    const image = screen.getByRole('img', { name: /audi a4/i });
    fireEvent.error(image);

    expect(screen.queryByRole('img', { name: /audi a4/i })).not.toBeInTheDocument();
    expect(screen.getByText('Lot 101')).toBeInTheDocument();
  });
});
