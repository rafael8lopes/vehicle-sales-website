import { format, parseISO } from 'date-fns';

export const formatSaleDate = (dateString: string): string => {
	return format(parseISO(dateString), 'd MMM yyyy');
};

export const formatSaleTime = (dateString: string): string => {
	return format(parseISO(dateString), 'HH:mm');
};

export const formatSaleDateRange = (
	startDateTime: string,
	endDateTime?: string,
): string => {
	const startDate = parseISO(startDateTime);
	const formattedStart = format(startDate, 'd MMM yyyy');

	if (!endDateTime) {
		return formattedStart;
	}

	const endDate = parseISO(endDateTime);
	const startDay = format(startDate, 'd MMM yyyy');
	const endDay = format(endDate, 'd MMM yyyy');

	if (startDay === endDay) {
		return `${formattedStart} · ${format(startDate, 'HH:mm')} — ${format(endDate, 'HH:mm')}`;
	}

	return `${format(startDate, 'd MMM')} — ${format(endDate, 'd MMM yyyy')}`;
};

export const formatCalendarDate = (date: Date = new Date()): string => {
	return format(date, 'd MMM yyyy');
};
