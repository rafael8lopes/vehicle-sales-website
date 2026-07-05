import { Link } from 'react-router-dom';
import { Car, Gauge, Fuel, Cog, ExternalLink } from 'lucide-react';
import clsx from 'clsx';

import type { VehicleLot } from '@/features/vehicles/types';
import { formatMileage } from '@/utils/formatMileage';

import '@/components/VehicleCard/VehicleCard.scss';

type VehicleCardProps = {
	vehicle: VehicleLot;
};

export function VehicleCard({ vehicle }: VehicleCardProps) {
	const hasImage = vehicle.imageUrls && vehicle.imageUrls.length > 0;
	const gradeClass = vehicle.grade ? `vehicle-card__grade-badge--${vehicle.grade.toLowerCase()}` : '';

	return (
		<article className="vehicle-card">
			<div className="vehicle-card__image-wrapper">
				{hasImage ? (
					<img
						className="vehicle-card__image"
						src={vehicle.imageUrls![0]}
						alt={`${vehicle.make} ${vehicle.model}`}
						loading="lazy"
					/>
				) : (
					<div className="vehicle-card__image-placeholder" aria-hidden="true">
						<Car size={32} strokeWidth={1} />
						<span>No image</span>
					</div>
				)}

				<div className="vehicle-card__badges">
					<span className="vehicle-card__lot-badge">Lot {vehicle.lotNumber}</span>
					{vehicle.grade && (
						<span className={clsx('vehicle-card__grade-badge', gradeClass)}>
							Grade {vehicle.grade}
						</span>
					)}
				</div>
			</div>

			<div className="vehicle-card__body">
				{vehicle.registrationYear && (
					<span className="vehicle-card__year">{vehicle.registrationYear}</span>
				)}

				<h3 className="vehicle-card__make-model">
					{vehicle.make} {vehicle.model}
				</h3>

				{vehicle.derivative && (
					<span className="vehicle-card__derivative">{vehicle.derivative}</span>
				)}

				<div className="vehicle-card__specs">
					{vehicle.mileage != null && (
						<span className="vehicle-card__spec">
							<Gauge size={12} aria-hidden="true" />
							{formatMileage(vehicle.mileage, vehicle.mileageUnit)}
						</span>
					)}
					{vehicle.fuelType && (
						<span className="vehicle-card__spec">
							<Fuel size={12} aria-hidden="true" />
							{vehicle.fuelType}
						</span>
					)}
					{vehicle.transmission && (
						<span className="vehicle-card__spec">
							<Cog size={12} aria-hidden="true" />
							{vehicle.transmission}
						</span>
					)}
				</div>

				{vehicle.colour && (
					<span className="vehicle-card__colour">{vehicle.colour}</span>
				)}

				{vehicle.conditionNotes && (
					<p className="vehicle-card__notes">{vehicle.conditionNotes}</p>
				)}

				<div className="vehicle-card__footer">
					<Link
						to={`/vehicles/${vehicle.id}`}
						className="vehicle-card__cta"
						aria-label={`View details for ${vehicle.make} ${vehicle.model}`}
					>
						View Details <ExternalLink size={14} aria-hidden="true" />
					</Link>
				</div>
			</div>
		</article>
	);
}
