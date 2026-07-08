import { useTranslation } from 'react-i18next';

import '@/components/Loading/Loading.scss';

type LoadingProps = {
	message?: string;
};

export function Loading({ message }: LoadingProps) {
	const { t } = useTranslation();

	return (
		<div className="loading" role="status">
			<div className="loading__spinner" />
			<p className="loading__message">{message ?? t('loading.default')}</p>
		</div>
	);
}
