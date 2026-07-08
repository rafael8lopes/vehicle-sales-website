import { AlertTriangle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import '@/components/ErrorState/ErrorState.scss';

type ErrorStateProps = {
	title?: string;
	message?: string;
	retryText?: string;
	onRetry?: () => void;
};

export function ErrorState({
	title,
	message,
	retryText,
	onRetry,
}: ErrorStateProps) {
	const { t } = useTranslation();

	return (
		<div className="error-state" role="alert">
			<AlertTriangle className="error-state__icon" size={48} strokeWidth={1.5} aria-hidden="true" />
			<h3 className="error-state__title">{title ?? t('error.title')}</h3>
			<p className="error-state__message">{message ?? t('error.message')}</p>
			{onRetry && (
				<button className="error-state__retry" type="button" onClick={onRetry}>
					{retryText ?? t('error.retry')}
				</button>
			)}
		</div>
	);
}
