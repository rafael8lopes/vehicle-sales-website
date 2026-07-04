import { useSearchParams } from 'react-router-dom';
import { useCallback, useMemo } from 'react';

import type { SaleFilters } from '@/features/sales/types';
import { parseFilters } from '@/utils/parseFilters';
import { serializeFilters } from '@/utils/serializeFilters';

export function useSaleFilters() {
	const [searchParams, setSearchParams] = useSearchParams();

	const filters = useMemo(
		() => parseFilters(searchParams),
		[searchParams],
	);

	const setFilters = useCallback(
		(nextFilters: SaleFilters) => {
			const params = serializeFilters(nextFilters);
			setSearchParams(params, { replace: true });
		},
		[setSearchParams],
	);

	return { filters, setFilters };
}
