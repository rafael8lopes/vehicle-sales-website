import { useQuery } from '@tanstack/react-query';

import { publicVehiclesService } from '@/services/publicVehiclesService';

export function useSaleVehicleLots(saleId: string) {
	return useQuery({
		queryKey: ['saleVehicleLots', saleId],
		queryFn: () => publicVehiclesService.getPublicVehicleLotsBySaleId(saleId),
	});
}
