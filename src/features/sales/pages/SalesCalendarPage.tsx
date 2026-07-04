import { PageHeader } from '@/components/PageHeader/PageHeader';
import { Loading } from '@/components/Loading/Loading';
import { ErrorState } from '@/components/ErrorState/ErrorState';
import { EmptyState } from '@/components/EmptyState/EmptyState';
import { SalesFilters } from '@/features/sales/components/SalesFilters';
import { SalesGroup } from '@/features/sales/components/SalesGroup';
import { usePublicSales } from '@/features/sales/hooks/usePublicSales';
import { useSaleFilters } from '@/features/sales/hooks/useSaleFilters';
import { filterPublicSales, groupSalesByState } from '@/utils/filterPublicSales';

import '@/features/sales/pages/SalesCalendarPage.scss';

export function SalesCalendarPage() {
	const { data: sales, isLoading, isError, refetch } = usePublicSales();
	const { filters, setFilters } = useSaleFilters();

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

	const filteredSales = filterPublicSales(sales, filters);
	const { live, upcoming } = groupSalesByState(filteredSales);
	const isEmpty = filteredSales.length === 0;

	return (
		<>
			<SalesCalendarHeader />
			<SalesFilters
				filters={filters}
				sales={sales}
				onFilterChange={setFilters}
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
								count={live.length}
								sales={live}
								variant="live"
							/>
							<SalesGroup
								title="Upcoming Sales"
								count={upcoming.length}
								sales={upcoming}
								variant="upcoming"
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
