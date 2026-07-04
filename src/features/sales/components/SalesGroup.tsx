import type { PublicSale } from '@/features/sales/types';
import { SaleCard } from '@/components/SaleCard/SaleCard';

import '@/features/sales/components/SalesGroup.scss';

type SalesGroupProps = {
	title: string;
	count: number;
	sales: PublicSale[];
	variant?: 'live' | 'upcoming';
};

export function SalesGroup({ title, count, sales, variant = 'upcoming' }: SalesGroupProps) {
	if (sales.length === 0) {
		return null;
	}

	return (
		<section className="sales-group" aria-label={title}>
			<div className="sales-group__header">
				{variant === 'live' && (
					<span className="sales-group__indicator" aria-hidden="true" />
				)}
				<h2 className="sales-group__title">
					{title} — <span className="sales-group__count">{count} {count === 1 ? 'sale' : 'sales'}</span>
				</h2>
			</div>

			<div className="sales-group__grid">
				{sales.map((sale) => (
					<SaleCard key={sale.id} sale={sale} />
				))}
			</div>
		</section>
	);
}
