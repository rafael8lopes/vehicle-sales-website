import { useQuery } from '@tanstack/react-query';

import { publicSalesService } from '@/services/publicSalesService';

export function usePublicSale(saleId: string) {
	return useQuery({
		queryKey: ['publicSale', saleId],
		queryFn: () => publicSalesService.getPublicSaleById(saleId),
	});
}
