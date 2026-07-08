import type { TFunction } from 'i18next';
import { useTranslation } from 'react-i18next';

import type { VehicleLot } from '@/features/vehicles/types';
import { formatMileage } from '@/utils/formatMileage';
import { getIntlLocale } from '@/i18n/locale';

import '@/features/vehicles/components/VehicleSpecTable/VehicleSpecTable.scss';

type VehicleSpecTableProps = {
	vehicle: VehicleLot;
};

type SpecRow = {
	label: string;
	value: string | number;
};

function buildSpecRows(vehicle: VehicleLot, t: TFunction, intlLocale: string): SpecRow[] {
	const rows: SpecRow[] = [];

	if (vehicle.registrationYear) {
		rows.push({ label: t('vehicleSpec.year'), value: vehicle.registrationYear });
	}
	rows.push({ label: t('vehicleSpec.make'), value: vehicle.make });
	rows.push({ label: t('vehicleSpec.model'), value: vehicle.model });
	if (vehicle.derivative) {
		rows.push({ label: t('vehicleSpec.derivative'), value: vehicle.derivative });
	}
	if (vehicle.bodyType) {
		rows.push({ label: t('vehicleSpec.bodyType'), value: vehicle.bodyType });
	}
	if (vehicle.colour) {
		rows.push({ label: t('vehicleSpec.colour'), value: vehicle.colour });
	}
	if (vehicle.fuelType) {
		rows.push({ label: t('vehicleSpec.fuelType'), value: vehicle.fuelType });
	}
	if (vehicle.transmission) {
		rows.push({ label: t('vehicleSpec.transmission'), value: vehicle.transmission });
	}
	if (vehicle.mileage != null) {
		rows.push({
			label: t('vehicleSpec.odometer'),
			value: formatMileage(vehicle.mileage, vehicle.mileageUnit, intlLocale),
		});
	}

	if (vehicle.specification) {
		for (const [key, val] of Object.entries(vehicle.specification)) {
			if (val == null || val === '' || val === false) continue;
			const label = formatSpecKey(key);
			const value = val === true ? t('vehicleSpec.yes') : String(val);
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
	const { t, i18n } = useTranslation();
	const rows = buildSpecRows(vehicle, t, getIntlLocale(i18n.language));

	if (rows.length === 0) return null;

	return (
		<section className="vehicle-spec-table">
			<h2 className="vehicle-spec-table__title">{t('vehicleSpec.title')}</h2>
			<table className="vehicle-spec-table__table" aria-label={t('vehicleSpec.tableLabel')}>
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
