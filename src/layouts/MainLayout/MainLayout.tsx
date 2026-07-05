import { Outlet, Link } from 'react-router-dom';
import { Car, Clock } from 'lucide-react';
import { useMemo } from 'react';

import { formatCalendarDate } from '@/utils/formatDate';
import { usePublicSales } from '@/features/sales/hooks/usePublicSales';
import { groupSalesByState } from '@/utils/filterPublicSales';

import '@/layouts/MainLayout/MainLayout.scss';

export function MainLayout() {
	const { data: sales } = usePublicSales();
	const { live, upcoming } = useMemo(
		() => (sales ? groupSalesByState(sales) : { live: [], upcoming: [] }),
		[sales],
	);

	return (
		<div className="main-layout">
			<nav className="main-layout__nav" aria-label="Main navigation">
				<div className="main-layout__nav-inner">
					<Link to="/" className="main-layout__logo" aria-label="AutoAuction home">
						<Car size={20} aria-hidden="true" />
						<span className="main-layout__logo-text">AutoAuction</span>
					</Link>

					<div className="main-layout__stats" aria-label="Sale statistics">
						<span>{live.length} live</span>
						<span aria-hidden="true">·</span>
						<span>{upcoming.length} upcoming</span>
						<Clock size={14} aria-hidden="true" />
						<time dateTime={new Date().toISOString()}>{formatCalendarDate()}</time>
					</div>
				</div>
			</nav>

			<main>
				<Outlet />
			</main>
		</div>
	);
}
