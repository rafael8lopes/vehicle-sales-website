import clsx from 'clsx';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import type { PublicSale, SaleFilters, SaleLocationType, SaleState } from '@/features/sales/types';
import { getUniqueCountries } from '@/utils/filterPublicSales';
import { getCountryLabel } from '@/utils/country';

import '@/features/sales/components/SalesFilters.scss';

type SalesFiltersProps = {
	filters: SaleFilters;
	sales: PublicSale[];
	onFilterChange: (filters: SaleFilters) => void;
};

const STATE_OPTIONS: (SaleState | 'all')[] = ['all', 'live', 'upcoming'];

const LOCATION_TYPE_OPTIONS: (SaleLocationType | 'all')[] = [
	'all',
	'online',
	'in-person',
	'hybrid',
];

const getStateCounts = (sales: PublicSale[]): Record<string, number> => {
	const counts: Record<string, number> = { all: sales.length };

	for (const sale of sales) {
		counts[sale.state] = (counts[sale.state] ?? 0) + 1;
	}

	return counts;
};

export function SalesFilters({ filters, sales, onFilterChange }: SalesFiltersProps) {
	const { t } = useTranslation();
	const stateCounts = useMemo(() => getStateCounts(sales), [sales]);
	const countries = useMemo(() => getUniqueCountries(sales), [sales]);

	const getStateLabel = (value: SaleState | 'all'): string =>
		value === 'all' ? t('salesFilters.all') : t(`salesFilters.${value}`);

	const getLocationTypeOptionLabel = (value: SaleLocationType | 'all'): string =>
		value === 'all' ? t('salesFilters.anyFormat') : t(`locationType.${value}`);

	const handleStateChange = (state: SaleState | 'all') => {
		onFilterChange({ ...filters, state });
	};

	const handleLocationTypeChange = (locationType: SaleLocationType | 'all') => {
		onFilterChange({ ...filters, locationType });
	};

	const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		onFilterChange({ ...filters, country: event.target.value });
	};

	return (
		<div className="sales-filters" role="search" aria-label={t('salesFilters.searchLabel')}>
			<div className="sales-filters__inner">
				<div className="sales-filters__group" role="group" aria-label={t('salesFilters.filterByStatus')}>
					{STATE_OPTIONS.map((value) => {
						const count = stateCounts[value];

						return (
							<button
								key={value}
								type="button"
								className={clsx(
									'sales-filters__chip',
									filters.state === value && 'sales-filters__chip--active',
								)}
								onClick={() => handleStateChange(value)}
								aria-pressed={filters.state === value}
							>
								{getStateLabel(value)}
								{count !== undefined && (
									<span className="sales-filters__chip-count">{count}</span>
								)}
							</button>
						);
					})}
				</div>

				<span className="sales-filters__divider" aria-hidden="true" />

				<div className="sales-filters__group" role="group" aria-label={t('salesFilters.filterByFormat')}>
					{LOCATION_TYPE_OPTIONS.map((value) => (
						<button
							key={value}
							type="button"
							className={clsx(
								'sales-filters__chip',
								filters.locationType === value && 'sales-filters__chip--active',
							)}
							onClick={() => handleLocationTypeChange(value)}
							aria-pressed={filters.locationType === value}
						>
							{getLocationTypeOptionLabel(value)}
						</button>
					))}
				</div>

				<span className="sales-filters__divider" aria-hidden="true" />

				<div className="sales-filters__select-wrapper">
					<label htmlFor="country-filter" className="sales-filters__select-label">
						{t('salesFilters.country')}
					</label>
					<select
						id="country-filter"
						className="sales-filters__select"
						value={filters.country}
						onChange={handleCountryChange}
					>
						<option value="all">{t('salesFilters.allCountries')}</option>
						{countries.map((code) => (
							<option key={code} value={code}>
								{getCountryLabel(code, t)}
							</option>
						))}
					</select>
				</div>
			</div>
		</div>
	);
}
