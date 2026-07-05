import { useQuery } from '@tanstack/react-query';

import { publicSalesService } from '@/services/publicSalesService';

export function useVehicleSale(saleId: string | undefined) {
	return useQuery({
		queryKey: ['publicSale', saleId],
		queryFn: () => publicSalesService.getPublicSaleById(saleId!),
		enabled: !!saleId,
	});
}
