import { useParams, Link } from 'react-router-dom';
import { Gavel, Calendar, ArrowLeft } from 'lucide-react';

import { Loading } from '@/components/Loading/Loading';
import { ErrorState } from '@/components/ErrorState/ErrorState';
import { EmptyState } from '@/components/EmptyState/EmptyState';
import { Pagination } from '@/components/Pagination/Pagination';
import { SaleHeader } from '@/features/sales/components/SaleHeader';
import { VehicleLotGrid } from '@/features/sales/components/VehicleLotGrid';
import { usePublicSale } from '@/features/sales/hooks/usePublicSale';
import { useSaleVehicleLots } from '@/features/sales/hooks/useSaleVehicleLots';
import { usePagination } from '@/hooks/usePagination';
import { formatSaleDateRange } from '@/utils/formatDate';
import { useSeo } from '@/app/useSeo';

import '@/features/sales/pages/SaleCataloguePage.scss';

export function SaleCataloguePage() {
	const { saleId } = useParams<{ saleId: string }>();
	const {
		data: sale,
		isLoading: saleLoading,
		isError: saleError,
		refetch: refetchSale,
	} = usePublicSale(saleId!);
	const {
		data: vehicles = [],
		isLoading: vehiclesLoading,
		isError: vehiclesError,
		refetch: refetchVehicles,
	} = useSaleVehicleLots(saleId!);

	const { page, pageSize, totalPages, startIndex, endIndex, setPage, setPageSize } =
		usePagination({ totalItems: vehicles.length });

	const paginatedVehicles = vehicles.slice(startIndex, endIndex);
	const isLoading = saleLoading || vehiclesLoading;
	const isError = saleError || vehiclesError;

	// useSeo({
	// 	title: sale ? `${sale.title} Catalogue` : 'Sale Catalogue',
	// 	description: sale
	// 		? `Explore ${sale.title} lots, dates, and listing details in the public sale catalogue.`
	// 		: 'Explore vehicle lots and details in this public sale catalogue.',
	// 	canonicalPath: saleId ? `/sales/${saleId}` : '/sales',
	// 	noIndex: !sale && !isLoading && !isError,
	// });

	if (isLoading) {
		return <Loading message="Loading catalogue…" />;
	}

	if (isError) {
		return (
			<ErrorState
				title="Unable to load catalogue"
				message="We couldn't load the sale catalogue. Please try again."
				onRetry={() => {
					void refetchSale();
					void refetchVehicles();
				}}
			/>
		);
	}

	if (!sale) {
		return <SaleNotFound />;
	}

	return (
		<>
			<SaleHeader sale={sale} />

			<div className="sale-catalogue">
				<div className="sale-catalogue__content">
					<div className="sale-catalogue__summary">
						<div className="sale-catalogue__lot-count">
							<Gavel size={16} aria-hidden="true" />
							<strong>{vehicles.length}</strong> lots in this sale
						</div>
						<div className="sale-catalogue__date-range">
							<Calendar size={16} aria-hidden="true" />
							{formatSaleDateRange(sale.startDateTime, sale.endDateTime)}
						</div>
					</div>

					{vehicles.length === 0 ? (
						<EmptyState
							title="No vehicles available"
							message="This sale has no vehicle lots listed yet. Check back closer to the sale date."
						/>
					) : (
						<>
							<VehicleLotGrid vehicles={paginatedVehicles} />
							<Pagination
								page={page}
								pageSize={pageSize}
								totalItems={vehicles.length}
								totalPages={totalPages}
								onPageChange={setPage}
								onPageSizeChange={setPageSize}
							/>
						</>
					)}
				</div>
			</div>
		</>
	);
}

function SaleNotFound() {
	return (
		<div className="sale-not-found">
			<h1 className="sale-not-found__title">Sale not found</h1>
			<p className="sale-not-found__message">
				This sale does not exist or is not publicly available.
			</p>
			<Link to="/" className="sale-not-found__link">
				<ArrowLeft size={16} aria-hidden="true" />
				Back to all sales
			</Link>
		</div>
	);
}
