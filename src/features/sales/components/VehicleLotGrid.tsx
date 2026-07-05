import type { VehicleLot } from '@/features/vehicles/types';
import { VehicleCard } from '@/components/VehicleCard/VehicleCard';

import '@/features/sales/components/VehicleLotGrid.scss';

type VehicleLotGridProps = {
	vehicles: VehicleLot[];
};

export function VehicleLotGrid({ vehicles }: VehicleLotGridProps) {
	return (
		<div className="vehicle-lot-grid">
			{vehicles.map((vehicle) => (
				<VehicleCard key={vehicle.id} vehicle={vehicle} />
			))}
		</div>
	);
}
