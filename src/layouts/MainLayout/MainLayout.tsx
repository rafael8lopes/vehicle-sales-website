import { Outlet, Link } from 'react-router-dom';
import { Clock } from 'lucide-react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { formatCalendarDate } from '@/utils/formatDate';
import { usePublicSales } from '@/features/sales/hooks/usePublicSales';
import { groupSalesByState } from '@/utils/filterPublicSales';
import { LanguageSwitcher } from '@/layouts/MainLayout/LanguageSwitcher';

import '@/layouts/MainLayout/MainLayout.scss';

export function MainLayout() {
	const { t, i18n } = useTranslation();
	const { data: sales } = usePublicSales();
	const { live, upcoming } = useMemo(
		() => (sales ? groupSalesByState(sales) : { live: [], upcoming: [] }),
		[sales],
	);

	return (
		<div className="main-layout">
			<nav className="main-layout__nav" aria-label={t('layout.mainNavigation')}>
				<div className="main-layout__nav-inner">
					<Link to="/" className="main-layout__logo" aria-label={t('layout.home')}>
						<span className="main-layout__logo-text">{t('layout.brand')}</span>
					</Link>

					<div className="main-layout__stats" aria-label={t('layout.saleStatistics')}>
						<span>{t('layout.live', { count: live.length })}</span>
						<span aria-hidden="true">·</span>
						<span>{t('layout.upcoming', { count: upcoming.length })}</span>
						<Clock size={14} aria-hidden="true" />
						<time dateTime={new Date().toISOString()}>
							{formatCalendarDate(new Date(), i18n.language)}
						</time>					<span className="main-layout__divider" aria-hidden="true" />						<LanguageSwitcher />
					</div>
				</div>
			</nav>

			<main>
				<Outlet />
			</main>
		</div>
	);
}
