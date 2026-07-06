import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import clsx from 'clsx';

import { Loading } from '@/components/Loading/Loading';
import { ErrorState } from '@/components/ErrorState/ErrorState';
import { ImageGallery } from '@/features/vehicles/components/ImageGallery/ImageGallery';
import { VehiclePricing } from '@/features/vehicles/components/VehiclePricing/VehiclePricing';
import { VehicleSpecTable } from '@/features/vehicles/components/VehicleSpecTable/VehicleSpecTable';
import { VehicleEquipment } from '@/features/vehicles/components/VehicleEquipment/VehicleEquipment';
import { VehicleSaleContext } from '@/features/vehicles/components/VehicleSaleContext/VehicleSaleContext';
import { useVehicleLot } from '@/features/vehicles/hooks/useVehicleLot';
import { useVehicleSale } from '@/features/vehicles/hooks/useVehicleSale';
import { useSeo } from '@/app/useSeo';

import '@/features/vehicles/pages/VehicleDetailPage.scss';

export function VehicleDetailPage() {
	const { vehicleId } = useParams<{ vehicleId: string }>();
	const {
		data: vehicle,
		isLoading: vehicleLoading,
		isError: vehicleError,
		refetch: refetchVehicle,
	} = useVehicleLot(vehicleId!);
	const {
		data: sale,
		isLoading: saleLoading,
	} = useVehicleSale(vehicle?.saleId);

	const isLoading = vehicleLoading || (vehicle && saleLoading);

	useSeo({
		title: vehicle ? `${vehicle.make} ${vehicle.model}` : 'Vehicle Details',
		description: vehicle
			? `View lot ${vehicle.lotNumber}, pricing, specifications, and sale context for ${vehicle.make} ${vehicle.model}.`
			: 'View detailed lot specifications, pricing, and sale context for this vehicle.',
		canonicalPath: vehicleId ? `/vehicles/${vehicleId}` : '/vehicles',
		noIndex: !vehicle && !isLoading && !vehicleError,
	});

	if (isLoading) {
		return <Loading message="Loading vehicle details…" />;
	}

	if (vehicleError) {
		return (
			<ErrorState
				title="Unable to load vehicle"
				message="We couldn't load the vehicle details. Please try again."
				onRetry={() => void refetchVehicle()}
			/>
		);
	}

	if (!vehicle) {
		return <VehicleNotFound />;
	}

	const vehicleTitle = `${vehicle.make} ${vehicle.model}`;
	const gradeLabel = vehicle.grade ? `Grade ${vehicle.grade}` : null;
	const gradeClass = vehicle.grade ? `vehicle-detail__grade--${vehicle.grade.toLowerCase()}` : '';

	return (
		<>
			<nav className="vehicle-detail__breadcrumb" aria-label="Breadcrumb">
				<ol className="vehicle-detail__breadcrumb-list">
					<li>
						<Link to="/">All Sales</Link>
					</li>
					{sale && (
						<li>
							<ChevronRight size={12} aria-hidden="true" />
							<Link to={`/sales/${sale.id}`}>{sale.title}</Link>
						</li>
					)}
					<li aria-current="page">
						<ChevronRight size={12} aria-hidden="true" />
						<span>Lot {vehicle.lotNumber}</span>
					</li>
				</ol>
			</nav>

			{sale && (
				<div className="vehicle-detail__back-link">
					<Link to={`/sales/${sale.id}`} className="vehicle-detail__back">
						<ArrowLeft size={16} aria-hidden="true" />
						Back to {sale.title}
					</Link>
				</div>
			)}

			<article className="vehicle-detail">
				<div className="vehicle-detail__layout">
					<div className="vehicle-detail__left">
						<ImageGallery
							imageUrls={vehicle.imageUrls ?? []}
							alt={vehicleTitle}
						/>

						{vehicle.equipment && vehicle.equipment.length > 0 && (
							<VehicleEquipment equipment={vehicle.equipment} />
						)}
					</div>

					<div className="vehicle-detail__right">
						<header className="vehicle-detail__header">
							<div className="vehicle-detail__badges">
								<span className="vehicle-detail__lot-badge">Lot {vehicle.lotNumber}</span>
								{gradeLabel && (
									<span className={clsx('vehicle-detail__grade', gradeClass)}>
										{gradeLabel} · {getGradeDescription(vehicle.grade!)}
									</span>
								)}
							</div>

							{vehicle.registrationYear && (
								<span className="vehicle-detail__year">{vehicle.registrationYear}</span>
							)}

							<h1 className="vehicle-detail__title">{vehicleTitle}</h1>

							{vehicle.derivative && (
								<span className="vehicle-detail__derivative">{vehicle.derivative}</span>
							)}

							{vehicle.conditionNotes && (
								<p className="vehicle-detail__description">{vehicle.conditionNotes}</p>
							)}
						</header>

						<VehiclePricing
							currentPrice={vehicle.currentPrice}
							buyNowPrice={vehicle.buyNowPrice}
							currency={vehicle.currency}
						/>

						<VehicleSpecTable vehicle={vehicle} />

						{sale && <VehicleSaleContext sale={sale} />}
					</div>
				</div>
			</article>
		</>
	);
}

function getGradeDescription(grade: string): string {
	const descriptions: Record<string, string> = {
		A: 'Excellent',
		B: 'Good',
		C: 'Fair',
		D: 'Poor',
	};

	return descriptions[grade] ?? grade;
}

function VehicleNotFound() {
	return (
		<div className="vehicle-not-found">
			<h1 className="vehicle-not-found__title">Vehicle not found</h1>
			<p className="vehicle-not-found__message">
				This vehicle does not exist or is not publicly available.
			</p>
			<Link to="/" className="vehicle-not-found__link">
				<ArrowLeft size={16} aria-hidden="true" />
				Back to all sales
			</Link>
		</div>
	);
}
