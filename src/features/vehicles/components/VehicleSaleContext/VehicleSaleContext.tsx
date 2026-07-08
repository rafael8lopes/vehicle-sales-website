import { Link } from 'react-router-dom';
import { MapPin, Calendar, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { LocationTypeIcon } from '@/components/LocationTypeIcon/LocationTypeIcon';
import type { PublicSale } from '@/features/sales/types';
import { getCountryFlag, getCountryName } from '@/utils/country';
import { formatSaleDateRange } from '@/utils/formatDate';
import { getLocationTypeLabel } from '@/utils/locationType';

import '@/features/vehicles/components/VehicleSaleContext/VehicleSaleContext.scss';

type VehicleSaleContextProps = {
	sale: PublicSale;
};

export function VehicleSaleContext({ sale }: VehicleSaleContextProps) {
	const { t, i18n } = useTranslation();
	const flag = getCountryFlag(sale.countryCode);
	const locationLabel = sale.location
		? `${flag} ${sale.location}`
		: `${flag} ${getCountryName(sale.countryCode, t)}`;

	return (
		<aside className="vehicle-sale-context" aria-label={t('vehicleSaleContext.ariaLabel')}>
			<div className="vehicle-sale-context__header">
				<span className="vehicle-sale-context__label">{t('vehicleSaleContext.partOf')}</span>
				<h3 className="vehicle-sale-context__title">{sale.title}</h3>
			</div>

			<div className="vehicle-sale-context__details">
				<div className="vehicle-sale-context__detail">
					<MapPin size={14} aria-hidden="true" />
					<span>{locationLabel}</span>
				</div>
				<div className="vehicle-sale-context__detail">
					<LocationTypeIcon locationType={sale.locationType} size={14} aria-hidden="true" />
					<span>{getLocationTypeLabel(sale.locationType, t)}</span>
				</div>
				<div className="vehicle-sale-context__detail">
					<Calendar size={14} aria-hidden="true" />
					<span>{formatSaleDateRange(sale.startDateTime, sale.endDateTime, i18n.language)}</span>
				</div>
			</div>

			<Link
				to={`/sales/${sale.id}`}
				className="vehicle-sale-context__link"
				aria-label={t('vehicleSaleContext.viewFullCatalogueFor', { title: sale.title })}
			>
				{t('common.viewFullCatalogue')} <ChevronRight size={16} aria-hidden="true" />
			</Link>
		</aside>
	);
}
