import type { VehicleMileageUnit } from '@/features/vehicles/types';

export const formatMileage = (
	mileage: number,
	unit: VehicleMileageUnit = 'km',
	locale: string = 'en-GB',
): string => {
	const formatted = new Intl.NumberFormat(locale).format(mileage);

	return `${formatted} ${unit}`;
};
