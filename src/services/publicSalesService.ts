import type { PublicSale } from '@/features/sales/types';

import { mockApi } from './mockApi';

const isPublicSale = (sale: PublicSale): boolean => {
	return sale.saleType === 'public';
};

export const publicSalesService = {
	getPublicSales: async (): Promise<PublicSale[]> => {
		const sales = await mockApi.getSales();

		return sales.filter(isPublicSale);
	},
	getPublicSaleById: async (saleId: string): Promise<PublicSale | undefined> => {
		const sale = await mockApi.getSaleById(saleId);

		if (!sale || !isPublicSale(sale)) {
			return undefined;
		}

		return sale;
	},
};
