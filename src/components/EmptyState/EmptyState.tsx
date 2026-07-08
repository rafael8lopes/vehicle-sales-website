import { SearchX } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import '@/components/EmptyState/EmptyState.scss';

type EmptyStateProps = {
	title?: string;
	message?: string;
};

export function EmptyState({
	title,
	message,
}: EmptyStateProps) {
	const { t } = useTranslation();

	return (
		<div className="empty-state">
			<SearchX className="empty-state__icon" size={48} strokeWidth={1.5} aria-hidden="true" />
			<h3 className="empty-state__title">{title ?? t('empty.title')}</h3>
			<p className="empty-state__message">{message ?? t('empty.message')}</p>
		</div>
	);
}
