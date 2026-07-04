import { useQuery } from '@tanstack/react-query';

import { publicSalesService } from '@/services/publicSalesService';

export function usePublicSales() {
	return useQuery({
		queryKey: ['publicSales'],
		queryFn: publicSalesService.getPublicSales,
	});
}
