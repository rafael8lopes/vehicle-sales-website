import { ChevronLeft, ChevronRight } from 'lucide-react';
import clsx from 'clsx';

import '@/components/Pagination/Pagination.scss';

type PaginationProps = {
	page: number;
	pageSize: number;
	totalItems: number;
	totalPages: number;
	onPageChange: (page: number) => void;
	onPageSizeChange: (size: number) => void;
};

const PAGE_SIZE_OPTIONS = [12, 24, 48];

function getVisiblePages(currentPage: number, totalPages: number): (number | 'ellipsis')[] {
	if (totalPages <= 7) {
		return Array.from({ length: totalPages }, (_, i) => i + 1);
	}

	if (currentPage <= 3) {
		return [1, 2, 3, 4, 'ellipsis', totalPages];
	}

	if (currentPage >= totalPages - 2) {
		return [1, 'ellipsis', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
	}

	return [1, 'ellipsis', currentPage - 1, currentPage, currentPage + 1, 'ellipsis', totalPages];
}

export function Pagination({
	page,
	pageSize,
	totalItems,
	totalPages,
	onPageChange,
	onPageSizeChange,
}: PaginationProps) {
	const startItem = (page - 1) * pageSize + 1;
	const endItem = Math.min(page * pageSize, totalItems);
	const visiblePages = getVisiblePages(page, totalPages);

	return (
		<nav className="pagination" aria-label="Pagination">
			<p className="pagination__summary">
				Showing <strong>{startItem}–{endItem}</strong> of <strong>{totalItems}</strong> lots
			</p>

			<div className="pagination__controls">
				<div className="pagination__page-size">
					<label htmlFor="page-size-select">Show</label>
					<select
						id="page-size-select"
						value={pageSize}
						onChange={(e) => onPageSizeChange(Number(e.target.value))}
					>
						{PAGE_SIZE_OPTIONS.map((size) => (
							<option key={size} value={size}>
								{size} per page
							</option>
						))}
					</select>
				</div>

				<div className="pagination__pages" role="group" aria-label="Page navigation">
					<button
						className="pagination__nav"
						type="button"
						onClick={() => onPageChange(page - 1)}
						disabled={page <= 1}
						aria-label="Previous page"
					>
						<ChevronLeft size={16} />
					</button>

					{visiblePages.map((pageNum, index) =>
						pageNum === 'ellipsis' ? (
							<span key={`ellipsis-${index}`} className="pagination__ellipsis" aria-hidden="true">
								…
							</span>
						) : (
							<button
								key={pageNum}
								className={clsx('pagination__page', page === pageNum && 'pagination__page--active')}
								type="button"
								onClick={() => onPageChange(pageNum)}
								aria-current={page === pageNum ? 'page' : undefined}
								aria-label={`Page ${pageNum}`}
							>
								{pageNum}
							</button>
						),
					)}

					<button
						className="pagination__nav"
						type="button"
						onClick={() => onPageChange(page + 1)}
						disabled={page >= totalPages}
						aria-label="Next page"
					>
						<ChevronRight size={16} />
					</button>
				</div>
			</div>
		</nav>
	);
}
