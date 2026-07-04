import type { SaleFilters, SaleLocationType, SaleState } from '@/features/sales/types';

import { DEFAULT_FILTERS } from '@/utils/filterPublicSales';

const VALID_STATES = new Set<string>(['all', 'live', 'upcoming']);
const VALID_LOCATION_TYPES = new Set<string>(['all', 'online', 'in-person', 'hybrid']);

export const parseFilters = (searchParams: URLSearchParams): SaleFilters => {
	const state = searchParams.get('state') ?? 'all';
	const locationType = searchParams.get('format') ?? 'all';
	const country = searchParams.get('country') ?? 'all';

	return {
		state: VALID_STATES.has(state) ? (state as SaleState | 'all') : DEFAULT_FILTERS.state,
		locationType: VALID_LOCATION_TYPES.has(locationType)
			? (locationType as SaleLocationType | 'all')
			: DEFAULT_FILTERS.locationType,
		country,
	};
};
