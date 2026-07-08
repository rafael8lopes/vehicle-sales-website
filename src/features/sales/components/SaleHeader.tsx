import { Link } from 'react-router-dom';
import { ArrowLeft, Monitor, Users, Shuffle, Calendar } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import type { PublicSale, SaleLocationType } from '@/features/sales/types';
import { formatFullSaleDate, formatSaleTime } from '@/utils/formatDate';
import { getCountryFlag, getCountryName } from '@/utils/country';
import { getLocationTypeLabel } from '@/utils/locationType';

import '@/features/sales/components/SaleHeader.scss';

type SaleHeaderProps = {
	sale: PublicSale;
};

const LOCATION_TYPE_ICONS: Record<SaleLocationType, typeof Monitor> = {
	online: Monitor,
	'in-person': Users,
	hybrid: Shuffle,
};

export function SaleHeader({ sale }: SaleHeaderProps) {
	const { t, i18n } = useTranslation();
	const isLive = sale.state === 'live';
	const LocationIcon = LOCATION_TYPE_ICONS[sale.locationType];
	const flag = getCountryFlag(sale.countryCode);
	const countryName = getCountryName(sale.countryCode, t);
	const cityName = sale.location?.split(',')[0];

	return (
		<header className="sale-header">
			<div className="sale-header__inner">
				<Link to="/" className="sale-header__back">
					<ArrowLeft size={16} aria-hidden="true" />
					{t('common.allSales')}
				</Link>

				<div className="sale-header__content">
					<div className="sale-header__main">
						<span className={`sale-header__badge sale-header__badge--${sale.state}`}>
							{isLive && <span className="sale-header__badge-dot" aria-hidden="true" />}
							{isLive ? t('saleCard.live') : t('saleCard.upcoming')}
						</span>

						<h1 className="sale-header__title">{sale.title}</h1>

						{sale.description && (
							<p className="sale-header__description">{sale.description}</p>
						)}
					</div>

					<div className="sale-header__info-card">
						<div className="sale-header__info-item">
							<span className="sale-header__info-label">{t('saleHeader.location')}</span>
							<span className="sale-header__info-value">
								{flag && <span aria-hidden="true">{flag}</span>}
								{cityName ?? sale.countryCode}
							</span>
							{countryName && (
								<span className="sale-header__info-sublabel">{countryName}</span>
							)}
						</div>

						<div className="sale-header__info-item">
							<span className="sale-header__info-label">{t('saleHeader.format')}</span>
							<span className="sale-header__info-value">
								<LocationIcon size={14} aria-hidden="true" />
								{getLocationTypeLabel(sale.locationType, t)}
							</span>
						</div>

						<div className="sale-header__info-item">
							<span className="sale-header__info-label">{t('saleHeader.opens')}</span>
							<span className="sale-header__info-value">
								<Calendar size={14} aria-hidden="true" />
								{formatFullSaleDate(sale.startDateTime, i18n.language)}
							</span>
							<span className="sale-header__info-sublabel">
								{formatSaleTime(sale.startDateTime)}
							</span>
						</div>

						<div className="sale-header__info-item">
							<span className="sale-header__info-label">{t('saleHeader.totalLots')}</span>
							<span className="sale-header__info-value sale-header__info-value--large">
								{sale.lotCount}
							</span>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
}
