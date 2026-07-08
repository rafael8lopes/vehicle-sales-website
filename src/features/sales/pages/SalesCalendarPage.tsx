import { PageHeader } from '@/components/PageHeader/PageHeader';
import { Loading } from '@/components/Loading/Loading';
import { ErrorState } from '@/components/ErrorState/ErrorState';
import { EmptyState } from '@/components/EmptyState/EmptyState';
import { Pagination } from '@/components/Pagination/Pagination';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { SalesFilters } from '@/features/sales/components/SalesFilters';
import { SalesGroup } from '@/features/sales/components/SalesGroup';
import { usePublicSales } from '@/features/sales/hooks/usePublicSales';
import { useSaleFilters } from '@/features/sales/hooks/useSaleFilters';
import { usePagination } from '@/hooks/usePagination';
import { filterAndGroupSales } from '@/utils/filterPublicSales';
import { useSeo } from '@/app/useSeo';

import '@/features/sales/pages/SalesCalendarPage.scss';

export function SalesCalendarPage() {
	const { t } = useTranslation();

	useSeo({
		title: t('seo.salesTitle'),
		description: t('seo.salesDescription'),
		canonicalPath: '/',
	});

	const { data: sales, isLoading, isError, refetch } = usePublicSales();
	const { filters, setFilters } = useSaleFilters();

	const { live, upcoming, total } = useMemo(
		() => filterAndGroupSales(sales ?? [], filters),
		[sales, filters],
	);

	const {
		page,
		pageSize,
		totalPages,
		startIndex,
		endIndex,
		setPage,
		setPageSize,
	} = usePagination({ totalItems: total });

	const paginatedSales = useMemo(
		() => [...live, ...upcoming].slice(startIndex, endIndex),
		[live, upcoming, startIndex, endIndex],
	);
	const paginatedLive = useMemo(
		() => paginatedSales.filter((sale) => sale.state === 'live'),
		[paginatedSales],
	);
	const paginatedUpcoming = useMemo(
		() => paginatedSales.filter((sale) => sale.state === 'upcoming'),
		[paginatedSales],
	);
	const isEmpty = total === 0;

	const handleFilterChange: typeof setFilters = (nextFilters) => {
		setFilters(nextFilters);
		setPage(1);
	};

	if (isLoading) {
		return (
			<>
				<SalesCalendarHeader />
				<Loading message={t('loading.sales')} />
			</>
		);
	}

	if (isError || !sales) {
		return (
			<>
				<SalesCalendarHeader />
				<ErrorState
					title={t('error.salesTitle')}
					message={t('error.salesMessage')}
					onRetry={() => void refetch()}
				/>
			</>
		);
	}

	return (
		<>
			<SalesCalendarHeader />
			<SalesFilters
				filters={filters}
				sales={sales}
				onFilterChange={handleFilterChange}
			/>

			<div className="sales-calendar">
				<div className="sales-calendar__content">
					{isEmpty ? (
						<EmptyState
							title={t('empty.salesTitle')}
							message={t('empty.salesMessage')}
						/>
					) : (
						<>
							<SalesGroup
								title={t('salesCalendar.groupLive')}
								count={paginatedLive.length}
								sales={paginatedLive}
								variant="live"
							/>
							<SalesGroup
								title={t('salesCalendar.groupUpcoming')}
								count={paginatedUpcoming.length}
								sales={paginatedUpcoming}
								variant="upcoming"
							/>
							<Pagination
								page={page}
								pageSize={pageSize}
								totalItems={total}
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

function SalesCalendarHeader() {
	const { t } = useTranslation();

	return (
		<PageHeader
			subtitle={t('salesCalendar.headerSubtitle')}
			title={
				<>
					{t('salesCalendar.headerTitleLead')}<br />
					<span className="sales-calendar__title-accent">
						{t('salesCalendar.headerTitleAccent')}
					</span>
				</>
			}
			description={t('salesCalendar.headerDescription')}
		/>
	);
}
