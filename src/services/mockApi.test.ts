import { describe, expect, it } from 'vitest';

import { mockApi } from '@/services/mockApi';

describe('mockApi', () => {
	describe('getSales', () => {
		it('resolves with a non-empty array', async () => {
			const sales = await mockApi.getSales();
			expect(Array.isArray(sales)).toBe(true);
			expect(sales.length).toBeGreaterThan(0);
		});
	});

	describe('getVehicles', () => {
		it('resolves with a non-empty array', async () => {
			const vehicles = await mockApi.getVehicles();
			expect(Array.isArray(vehicles)).toBe(true);
			expect(vehicles.length).toBeGreaterThan(0);
		});
	});

	describe('getSaleById', () => {
		it('resolves with a sale when the id exists', async () => {
			const [firstSale] = await mockApi.getSales();
			const result = await mockApi.getSaleById(firstSale.id);
			expect(result).toBeDefined();
			expect(result?.id).toBe(firstSale.id);
		});

		it('resolves undefined for a missing sale id', async () => {
			await expect(mockApi.getSaleById('sale-does-not-exist')).resolves.toBeUndefined();
		});
	});

	describe('getVehicleById', () => {
		it('resolves with a vehicle when the id exists', async () => {
			const [firstVehicle] = await mockApi.getVehicles();
			const result = await mockApi.getVehicleById(firstVehicle.id);
			expect(result).toBeDefined();
			expect(result?.id).toBe(firstVehicle.id);
		});

		it('resolves undefined for a missing vehicle id', async () => {
			await expect(mockApi.getVehicleById('vehicle-does-not-exist')).resolves.toBeUndefined();
		});
	});
});