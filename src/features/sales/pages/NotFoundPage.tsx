import { useTranslation } from 'react-i18next';

import { useSeo } from '@/app/useSeo';

export function NotFoundPage() {
	const { t } = useTranslation();

	useSeo({
		title: t('seo.notFoundTitle'),
		description: t('seo.notFoundDescription'),
		canonicalPath: '/not-found',
		noIndex: true,
	});

	return (
		<section style={{ textAlign: 'center', padding: '4rem 1rem' }}>
			<h1>{t('notFoundPage.title')}</h1>
			<p>{t('notFoundPage.message')}</p>
		</section>
	);
}
