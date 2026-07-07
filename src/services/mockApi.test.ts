import { describe, expect, it } from 'vitest';

import { mockApi } from '@/services/mockApi';

describe('mockApi', () => {
	it('resolves undefined for a missing vehicle id', async () => {
		await expect(mockApi.getVehicleById('vehicle-does-not-exist')).resolves.toBeUndefined();
	});

	it('resolves undefined for a missing sale id', async () => {
		await expect(mockApi.getSaleById('sale-does-not-exist')).resolves.toBeUndefined();
	});
});