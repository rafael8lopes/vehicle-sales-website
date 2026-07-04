import type { SaleFilters } from '@/features/sales/types';

export const serializeFilters = (filters: SaleFilters): URLSearchParams => {
	const params = new URLSearchParams();

	if (filters.state !== 'all') {
		params.set('state', filters.state);
	}

	if (filters.locationType !== 'all') {
		params.set('format', filters.locationType);
	}

	if (filters.country !== 'all') {
		params.set('country', filters.country);
	}

	return params;
};
