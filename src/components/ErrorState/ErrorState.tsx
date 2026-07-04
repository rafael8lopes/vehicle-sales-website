import { AlertTriangle } from 'lucide-react';

import '@/components/ErrorState/ErrorState.scss';

type ErrorStateProps = {
	title?: string;
	message?: string;
	onRetry?: () => void;
};

export function ErrorState({
	title = 'Something went wrong',
	message = 'We could not load the data. Please try again.',
	onRetry,
}: ErrorStateProps) {
	return (
		<div className="error-state" role="alert">
			<AlertTriangle className="error-state__icon" size={48} strokeWidth={1.5} aria-hidden="true" />
			<h3 className="error-state__title">{title}</h3>
			<p className="error-state__message">{message}</p>
			{onRetry && (
				<button className="error-state__retry" type="button" onClick={onRetry}>
					Try again
				</button>
			)}
		</div>
	);
}
