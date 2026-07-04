import type { ReactNode } from 'react';

import '@/components/PageHeader/PageHeader.scss';

type PageHeaderProps = {
	subtitle?: string;
	title: ReactNode;
	description?: string;
};

export function PageHeader({ subtitle, title, description }: PageHeaderProps) {
	return (
		<header className="page-header">
			<div className="page-header__inner">
				{subtitle && <p className="page-header__subtitle">{subtitle}</p>}
				<h1 className="page-header__title">{title}</h1>
				{description && <p className="page-header__description">{description}</p>}
			</div>
		</header>
	);
}
