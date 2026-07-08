import { useParams, Link } from 'react-router-dom';
import { Gavel, Calendar, ArrowLeft } from 'lucide-react';
import { Trans, useTranslation } from 'react-i18next';

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
	const { t, i18n } = useTranslation();
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

	useSeo({
		title: sale ? t('seo.catalogueTitle', { title: sale.title }) : t('seo.catalogueTitleFallback'),
		description: sale
			? t('seo.catalogueDescription', { title: sale.title })
			: t('seo.catalogueDescriptionFallback'),
		canonicalPath: saleId ? `/sales/${saleId}` : '/sales',
		noIndex: !sale && !isLoading && !isError,
	});

	if (isLoading) {
		return <Loading message={t('loading.catalogue')} />;
	}

	if (isError) {
		return (
			<ErrorState
				title={t('error.catalogueTitle')}
				message={t('error.catalogueMessage')}
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
							<Trans
								i18nKey="saleCatalogue.lotsInSale"
								values={{ count: vehicles.length }}
								components={{ strong: <strong /> }}
							/>
						</div>
						<div className="sale-catalogue__date-range">
							<Calendar size={16} aria-hidden="true" />
							{formatSaleDateRange(sale.startDateTime, sale.endDateTime, i18n.language)}
						</div>
					</div>

					{vehicles.length === 0 ? (
						<EmptyState
							title={t('empty.vehiclesTitle')}
							message={t('empty.vehiclesMessage')}
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
	const { t } = useTranslation();

	return (
		<div className="sale-not-found">
			<h1 className="sale-not-found__title">{t('saleCatalogue.notFoundTitle')}</h1>
			<p className="sale-not-found__message">
				{t('saleCatalogue.notFoundMessage')}
			</p>
			<Link to="/" className="sale-not-found__link">
				<ArrowLeft size={16} aria-hidden="true" />
				{t('common.backToAllSales')}
			</Link>
		</div>
	);
}
