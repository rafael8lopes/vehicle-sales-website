import { useTranslation } from 'react-i18next';

import { useSeo } from '@/app/useSeo';
import '@/features/sales/pages/NotFoundPage.scss';

export function NotFoundPage() {
	const { t } = useTranslation();

	useSeo({
		title: t('seo.notFoundTitle'),
		description: t('seo.notFoundDescription'),
		canonicalPath: '/not-found',
		noIndex: true,
	});

	return (
		<section className="not-found-page">
			<h1>{t('notFoundPage.title')}</h1>
			<p>{t('notFoundPage.message')}</p>
		</section>
	);
}
