import { SearchX } from 'lucide-react';

import '@/components/EmptyState/EmptyState.scss';

type EmptyStateProps = {
	title?: string;
	message?: string;
};

export function EmptyState({
	title = 'No results found',
	message = 'Try adjusting your filters to find what you are looking for.',
}: EmptyStateProps) {
	return (
		<div className="empty-state">
			<SearchX className="empty-state__icon" size={48} strokeWidth={1.5} aria-hidden="true" />
			<h3 className="empty-state__title">{title}</h3>
			<p className="empty-state__message">{message}</p>
		</div>
	);
}
