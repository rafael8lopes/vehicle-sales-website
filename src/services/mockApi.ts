import type { PublicSale } from '@/features/sales/types';
import type { VehicleLot } from '@/features/vehicles/types';
import salesData from '@/mocks/sales.json';
import vehiclesData from '@/mocks/vehicles.json';

const DEFAULT_LATENCY_MS = 200;

type RuntimeMockData = {
	sales?: PublicSale[];
	vehicles?: VehicleLot[];
	latencyMs?: number;
};

const sales = salesData as PublicSale[];
const vehicles = vehiclesData as VehicleLot[];

const getRuntimeMockData = (): RuntimeMockData | null => {
	if (typeof window === 'undefined') {
		return null;
	}

	return (window as Window & { __E2E_MOCK_DATA__?: RuntimeMockData }).__E2E_MOCK_DATA__ ?? null;
};

const getSalesData = (): PublicSale[] => {
	return getRuntimeMockData()?.sales ?? sales;
};

const getVehiclesData = (): VehicleLot[] => {
	return getRuntimeMockData()?.vehicles ?? vehicles;
};

const getLatencyMs = (): number => {
	return getRuntimeMockData()?.latencyMs ?? DEFAULT_LATENCY_MS;
};

const cloneData = <T>(value: T): T => {
	if (value === undefined || value === null) {
		return value;
	}

	return JSON.parse(JSON.stringify(value)) as T;
};

const withLatency = <T>(value: T, latencyMs = getLatencyMs()): Promise<T> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(cloneData(value));
		}, latencyMs);
	});
};

export const mockApi = {
	getSales: async (): Promise<PublicSale[]> => {
		return withLatency(getSalesData());
	},
	getSaleById: async (saleId: string): Promise<PublicSale | undefined> => {
		return withLatency(getSalesData().find((sale) => sale.id === saleId));
	},
	getVehicles: async (): Promise<VehicleLot[]> => {
		return withLatency(getVehiclesData());
	},
	getVehicleById: async (vehicleId: string): Promise<VehicleLot | undefined> => {
		return withLatency(getVehiclesData().find((vehicle) => vehicle.id === vehicleId));
	},
};
