import { format, parseISO } from 'date-fns';

import { getDateFnsLocale } from '@/i18n/locale';

export const formatSaleDate = (dateString: string, language = 'en'): string => {
	return format(parseISO(dateString), 'd MMM yyyy', { locale: getDateFnsLocale(language) });
};

export const formatSaleTime = (dateString: string): string => {
	return format(parseISO(dateString), 'HH:mm');
};

export const formatSaleDateRange = (
	startDateTime: string,
	endDateTime?: string,
	language = 'en',
): string => {
	const locale = getDateFnsLocale(language);
	const startDate = parseISO(startDateTime);
	const formattedStart = format(startDate, 'd MMM yyyy', { locale });

	if (!endDateTime) {
		return formattedStart;
	}

	const endDate = parseISO(endDateTime);
	const endDay = format(endDate, 'd MMM yyyy', { locale });

	if (formattedStart === endDay) {
		return `${formattedStart} · ${format(startDate, 'HH:mm')} — ${format(endDate, 'HH:mm')}`;
	}

	return `${format(startDate, 'd MMM', { locale })} — ${endDay}`;
};

export const formatFullSaleDate = (dateString: string, language = 'en'): string => {
	return format(parseISO(dateString), 'd MMMM yyyy', { locale: getDateFnsLocale(language) });
};

export const formatCalendarDate = (date: Date = new Date(), language = 'en'): string => {
	return format(date, 'd MMM yyyy', { locale: getDateFnsLocale(language) });
};
