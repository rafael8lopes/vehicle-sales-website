import { Link } from 'react-router-dom';
import { MapPin, Diamond, Calendar, ChevronRight } from 'lucide-react';

import type { PublicSale } from '@/features/sales/types';
import { getCountryFlag, getCountryName } from '@/utils/country';
import { formatSaleDateRange } from '@/utils/formatDate';

import '@/features/vehicles/components/VehicleSaleContext/VehicleSaleContext.scss';

type VehicleSaleContextProps = {
	sale: PublicSale;
};

export function VehicleSaleContext({ sale }: VehicleSaleContextProps) {
	const flag = getCountryFlag(sale.countryCode);
	const locationLabel = sale.location
		? `${flag} ${sale.location}`
		: `${flag} ${getCountryName(sale.countryCode)}`;

	return (
		<aside className="vehicle-sale-context" aria-label="Sale information">
			<div className="vehicle-sale-context__header">
				<span className="vehicle-sale-context__label">Part of</span>
				<h3 className="vehicle-sale-context__title">{sale.title}</h3>
			</div>

			<div className="vehicle-sale-context__details">
				<div className="vehicle-sale-context__detail">
					<MapPin size={14} aria-hidden="true" />
					<span>{locationLabel}</span>
				</div>
				<div className="vehicle-sale-context__detail">
					<Diamond size={14} aria-hidden="true" />
					<span>{sale.locationType === 'in-person' ? 'In Person' : sale.locationType === 'hybrid' ? 'Hybrid' : 'Online'}</span>
				</div>
				<div className="vehicle-sale-context__detail">
					<Calendar size={14} aria-hidden="true" />
					<span>{formatSaleDateRange(sale.startDateTime, sale.endDateTime)}</span>
				</div>
			</div>

			<Link
				to={`/sales/${sale.id}`}
				className="vehicle-sale-context__link"
			>
				View Full Catalogue <ChevronRight size={16} aria-hidden="true" />
			</Link>
		</aside>
	);
}
