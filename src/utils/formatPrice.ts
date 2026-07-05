export const formatPrice = (price: number, currency: string = 'GBP'): string => {
	return new Intl.NumberFormat('en-GB', {
		style: 'currency',
		currency,
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	}).format(price);
};
