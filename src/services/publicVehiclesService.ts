import type { VehicleLot } from '@/features/vehicles/types';

import { mockApi } from './mockApi';

const getPublicSaleIds = async (): Promise<Set<string>> => {
	const sales = await mockApi.getSales();
	const publicSaleIds = sales
		.filter((sale) => sale.saleType === 'public')
		.map((sale) => sale.id);

	return new Set(publicSaleIds);
};

export const publicVehiclesService = {
	getPublicVehicleLots: async (): Promise<VehicleLot[]> => {
		const [vehicles, publicSaleIds] = await Promise.all([mockApi.getVehicles(), getPublicSaleIds()]);

		return vehicles.filter((vehicle) => publicSaleIds.has(vehicle.saleId));
	},
	getPublicVehicleLotsBySaleId: async (saleId: string): Promise<VehicleLot[]> => {
		const [vehicles, publicSaleIds] = await Promise.all([mockApi.getVehicles(), getPublicSaleIds()]);

		if (!publicSaleIds.has(saleId)) {
			return [];
		}

		return vehicles.filter((vehicle) => vehicle.saleId === saleId);
	},
	getPublicVehicleLotById: async (vehicleId: string): Promise<VehicleLot | undefined> => {
		const [vehicle, publicSaleIds] = await Promise.all([
			mockApi.getVehicleById(vehicleId),
			getPublicSaleIds(),
		]);

		if (!vehicle || !publicSaleIds.has(vehicle.saleId)) {
			return undefined;
		}

		return vehicle;
	},
};
