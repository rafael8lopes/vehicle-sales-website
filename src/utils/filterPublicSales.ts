import type { PublicSale, SaleFilters } from '@/features/sales/types';

export const matchesSaleFilters = (
	sale: PublicSale,
	filters: SaleFilters,
): boolean => {
	if (filters.state !== 'all' && sale.state !== filters.state) {
		return false;
	}

	if (filters.locationType !== 'all' && sale.locationType !== filters.locationType) {
		return false;
	}

	if (filters.country !== 'all' && sale.countryCode !== filters.country) {
		return false;
	}

	return true;
};

export const filterPublicSales = (
	sales: PublicSale[],
	filters: SaleFilters,
): PublicSale[] => {
	return sales.filter((sale) => matchesSaleFilters(sale, filters));
};

export const groupSalesByState = (
	sales: PublicSale[],
): { live: PublicSale[]; upcoming: PublicSale[] } => {
	const live: PublicSale[] = [];
	const upcoming: PublicSale[] = [];

	for (const sale of sales) {
		if (sale.state === 'live') {
			live.push(sale);
		} else {
			upcoming.push(sale);
		}
	}

	return { live, upcoming };
};

export const filterAndGroupSales = (
	sales: PublicSale[],
	filters: SaleFilters,
): { live: PublicSale[]; upcoming: PublicSale[]; total: number } => {
	const live: PublicSale[] = [];
	const upcoming: PublicSale[] = [];

	for (const sale of sales) {
		if (!matchesSaleFilters(sale, filters)) {
			continue;
		}

		if (sale.state === 'live') {
			live.push(sale);
		} else {
			upcoming.push(sale);
		}
	}

	return {
		live,
		upcoming,
		total: live.length + upcoming.length,
	};
};

export const getUniqueCountries = (sales: PublicSale[]): string[] => {
	const countries = new Set(sales.map((sale) => sale.countryCode));
	return Array.from(countries).sort();
};

export const DEFAULT_FILTERS: SaleFilters = {
	state: 'all',
	locationType: 'all',
	country: 'all',
};
