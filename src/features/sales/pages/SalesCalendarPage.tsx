import { PageHeader } from '@/components/PageHeader/PageHeader';
import { Loading } from '@/components/Loading/Loading';
import { ErrorState } from '@/components/ErrorState/ErrorState';
import { EmptyState } from '@/components/EmptyState/EmptyState';
import { Pagination } from '@/components/Pagination/Pagination';
import { useMemo } from 'react';
import { SalesFilters } from '@/features/sales/components/SalesFilters';
import { SalesGroup } from '@/features/sales/components/SalesGroup';
import { usePublicSales } from '@/features/sales/hooks/usePublicSales';
import { useSaleFilters } from '@/features/sales/hooks/useSaleFilters';
import { usePagination } from '@/hooks/usePagination';
import { filterAndGroupSales } from '@/utils/filterPublicSales';
import { useSeo } from '@/app/useSeo';

import '@/features/sales/pages/SalesCalendarPage.scss';

export function SalesCalendarPage() {
	useSeo({
		title: 'Public Sales Calendar',
		description:
			'Browse live and upcoming public vehicle auctions and filter by status, format, and country.',
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
				<Loading message="Loading sales…" />
			</>
		);
	}

	if (isError || !sales) {
		return (
			<>
				<SalesCalendarHeader />
				<ErrorState
					title="Unable to load sales"
					message="We couldn't load the sales calendar. Please try again."
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
							title="No sales found"
							message="No sales match your current filters. Try adjusting your selection."
						/>
					) : (
						<>
							<SalesGroup
								title="Happening Now"
								count={paginatedLive.length}
								sales={paginatedLive}
								variant="live"
							/>
							<SalesGroup
								title="Upcoming Sales"
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
	return (
		<PageHeader
			subtitle="Public Sale Calendar"
			title={
				<>
					Upcoming &amp; Live<br />
					<span className="sales-calendar__title-accent">Vehicle Sales</span>
				</>
			}
			description="Browse publicly listed auctions worldwide. Filter by status, sale format, or country to find the right event."
		/>
	);
}
