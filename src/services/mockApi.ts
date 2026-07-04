import type { PublicSale } from '@/features/sales/types';
import type { VehicleLot } from '@/features/vehicles/types';
import salesData from '@/mocks/sales.json';
import vehiclesData from '@/mocks/vehicles.json';

const DEFAULT_LATENCY_MS = 200;

const sales = salesData as PublicSale[];
const vehicles = vehiclesData as VehicleLot[];

const cloneData = <T>(value: T): T => {
	return JSON.parse(JSON.stringify(value)) as T;
};

const withLatency = <T>(value: T, latencyMs = DEFAULT_LATENCY_MS): Promise<T> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(cloneData(value));
		}, latencyMs);
	});
};

export const mockApi = {
	getSales: async (): Promise<PublicSale[]> => {
		return withLatency(sales);
	},
	getSaleById: async (saleId: string): Promise<PublicSale | undefined> => {
		return withLatency(sales.find((sale) => sale.id === saleId));
	},
	getVehicles: async (): Promise<VehicleLot[]> => {
		return withLatency(vehicles);
	},
	getVehicleById: async (vehicleId: string): Promise<VehicleLot | undefined> => {
		return withLatency(vehicles.find((vehicle) => vehicle.id === vehicleId));
	},
};
