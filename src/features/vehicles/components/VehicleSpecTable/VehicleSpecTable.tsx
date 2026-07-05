import type { VehicleLot } from '@/features/vehicles/types';
import { formatMileage } from '@/utils/formatMileage';

import '@/features/vehicles/components/VehicleSpecTable/VehicleSpecTable.scss';

type VehicleSpecTableProps = {
	vehicle: VehicleLot;
};

type SpecRow = {
	label: string;
	value: string | number;
};

function buildSpecRows(vehicle: VehicleLot): SpecRow[] {
	const rows: SpecRow[] = [];

	if (vehicle.registrationYear) {
		rows.push({ label: 'Year', value: vehicle.registrationYear });
	}
	rows.push({ label: 'Make', value: vehicle.make });
	rows.push({ label: 'Model', value: vehicle.model });
	if (vehicle.derivative) {
		rows.push({ label: 'Derivative', value: vehicle.derivative });
	}
	if (vehicle.bodyType) {
		rows.push({ label: 'Body Type', value: vehicle.bodyType });
	}
	if (vehicle.colour) {
		rows.push({ label: 'Colour', value: vehicle.colour });
	}
	if (vehicle.fuelType) {
		rows.push({ label: 'Fuel Type', value: vehicle.fuelType });
	}
	if (vehicle.transmission) {
		rows.push({ label: 'Transmission', value: vehicle.transmission });
	}
	if (vehicle.mileage != null) {
		rows.push({ label: 'Odometer', value: formatMileage(vehicle.mileage, vehicle.mileageUnit) });
	}

	if (vehicle.specification) {
		for (const [key, val] of Object.entries(vehicle.specification)) {
			if (val == null || val === '' || val === false) continue;
			const label = formatSpecKey(key);
			const value = val === true ? 'Yes' : String(val);
			rows.push({ label, value });
		}
	}

	return rows;
}

function formatSpecKey(key: string): string {
	return key
		.replace(/([a-z])([A-Z])/g, '$1 $2')
		.replace(/^./, (c) => c.toUpperCase());
}

export function VehicleSpecTable({ vehicle }: VehicleSpecTableProps) {
	const rows = buildSpecRows(vehicle);

	if (rows.length === 0) return null;

	return (
		<section className="vehicle-spec-table">
			<h2 className="vehicle-spec-table__title">Specification</h2>
			<table className="vehicle-spec-table__table" aria-label="Vehicle specification">
				<tbody>
					{rows.map((row) => (
						<tr key={row.label} className="vehicle-spec-table__row">
							<th className="vehicle-spec-table__label" scope="row">{row.label}</th>
							<td className="vehicle-spec-table__value">{row.value}</td>
						</tr>
					))}
				</tbody>
			</table>
		</section>
	);
}
