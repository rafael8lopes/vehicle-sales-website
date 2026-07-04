import { Link } from 'react-router-dom';
import { MapPin, Calendar, Gavel, Monitor, Users, Shuffle, Car, ChevronRight } from 'lucide-react';
import clsx from 'clsx';

import type { PublicSale, SaleLocationType } from '@/features/sales/types';
import { formatSaleDateRange } from '@/utils/formatDate';
import { getCountryFlag } from '@/utils/country';

import '@/components/SaleCard/SaleCard.scss';

type SaleCardProps = {
	sale: PublicSale;
};

const LOCATION_TYPE_LABELS: Record<SaleLocationType, string> = {
	online: 'Online',
	'in-person': 'In Person',
	hybrid: 'Hybrid',
};

const LOCATION_TYPE_ICONS: Record<SaleLocationType, typeof Monitor> = {
	online: Monitor,
	'in-person': Users,
	hybrid: Shuffle,
};

export function SaleCard({ sale }: SaleCardProps) {
	const LocationIcon = LOCATION_TYPE_ICONS[sale.locationType];
	const isLive = sale.state === 'live';
	const dateRange = formatSaleDateRange(sale.startDateTime, sale.endDateTime);
	const flag = getCountryFlag(sale.countryCode);

	return (
		<article className={clsx('sale-card', isLive && 'sale-card--live')}>
			<div className="sale-card__image-wrapper">
				{sale.heroImageUrl ? (
					<img
						className="sale-card__image"
						src={sale.heroImageUrl}
						alt={sale.title}
						loading="lazy"
					/>
				) : (
					<div className="sale-card__image-placeholder" aria-hidden="true">
						<Car size={48} strokeWidth={1} />
					</div>
				)}

				<div className="sale-card__badges">
					<span
						className={clsx(
							'sale-card__badge',
							isLive ? 'sale-card__badge--live' : 'sale-card__badge--upcoming',
						)}
					>
						{isLive && <span className="sale-card__badge-dot" aria-hidden="true" />}
						{isLive ? 'LIVE' : 'UPCOMING'}
					</span>

					{sale.featured && (
						<span className="sale-card__badge sale-card__badge--featured">FEATURED</span>
					)}
				</div>
			</div>

			<div className="sale-card__body">
				<h3 className="sale-card__title">{sale.title}</h3>

				{sale.description && (
					<p className="sale-card__description">{sale.description}</p>
				)}

				<div className="sale-card__meta">
					<div className="sale-card__meta-item">
						<MapPin size={14} aria-hidden="true" />
						<span>
							{flag && <span aria-hidden="true">{flag} </span>}
							{sale.location ?? sale.countryCode}
						</span>
					</div>

					<div className="sale-card__meta-item">
						<Gavel size={14} aria-hidden="true" />
						<span>{sale.lotCount} lots</span>
					</div>
				</div>

				<div className="sale-card__meta-item">
					<Calendar size={14} aria-hidden="true" />
					<span>{dateRange}</span>
				</div>

				<div className="sale-card__footer">
					<div className="sale-card__meta-item">
						<LocationIcon size={14} aria-hidden="true" />
						<span>{LOCATION_TYPE_LABELS[sale.locationType]}</span>
					</div>

					<Link
						to={`/sales/${sale.id}`}
						className="sale-card__cta"
						aria-label={`View catalogue for ${sale.title}`}
					>
						View Catalogue <ChevronRight size={16} aria-hidden="true" />
					</Link>
				</div>
			</div>
		</article>
	);
}
