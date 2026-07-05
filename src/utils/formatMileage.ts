import type { VehicleMileageUnit } from '@/features/vehicles/types';

export const formatMileage = (mileage: number, unit: VehicleMileageUnit = 'km'): string => {
	const formatted = new Intl.NumberFormat('en-GB').format(mileage);

	return `${formatted} ${unit}`;
};
