import { useState } from 'react';

type UsePaginationOptions = {
	totalItems: number;
	defaultPageSize?: number;
};

export function usePagination({ totalItems, defaultPageSize = 12 }: UsePaginationOptions) {
	const [page, setPageState] = useState(1);
	const [pageSize, setPageSizeState] = useState(defaultPageSize);

	const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
	const safePage = Math.min(page, totalPages);
	const startIndex = (safePage - 1) * pageSize;
	const endIndex = Math.min(startIndex + pageSize, totalItems);

	const setPage = (newPage: number) => {
		setPageState(Math.max(1, Math.min(newPage, totalPages)));
	};

	const setPageSize = (size: number) => {
		setPageSizeState(size);
		setPageState(1);
	};

	return {
		page: safePage,
		pageSize,
		totalPages,
		startIndex,
		endIndex,
		setPage,
		setPageSize,
	};
}
