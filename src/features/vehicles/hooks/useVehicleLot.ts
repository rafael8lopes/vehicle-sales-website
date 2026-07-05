import { useQuery } from '@tanstack/react-query';

import { publicVehiclesService } from '@/services/publicVehiclesService';

export function useVehicleLot(vehicleId: string) {
	return useQuery({
		queryKey: ['vehicleLot', vehicleId],
		queryFn: () => publicVehiclesService.getPublicVehicleLotById(vehicleId),
	});
}
