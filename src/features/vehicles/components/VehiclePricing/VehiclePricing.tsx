import { Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { formatPrice } from '@/utils/formatPrice';
import { getIntlLocale } from '@/i18n/locale';

import '@/features/vehicles/components/VehiclePricing/VehiclePricing.scss';

type VehiclePricingProps = {
	currentPrice?: number;
	buyNowPrice?: number;
	currency?: string;
};

export function VehiclePricing({ currentPrice, buyNowPrice, currency = 'GBP' }: VehiclePricingProps) {
	const { t, i18n } = useTranslation();
	const hasPrice = currentPrice != null || buyNowPrice != null;
	const intlLocale = getIntlLocale(i18n.language);

	if (!hasPrice) return null;

	return (
		<div className="vehicle-pricing">
			{currentPrice != null && (
				<div className="vehicle-pricing__block">
					<span className="vehicle-pricing__label">{t('vehiclePricing.startingEstimate')}</span>
					<span className="vehicle-pricing__amount">
						{formatPrice(currentPrice, currency, intlLocale)}
						<span className="vehicle-pricing__currency">{currency}</span>
					</span>
				</div>
			)}

			{buyNowPrice != null && (
				<div className="vehicle-pricing__block vehicle-pricing__block--buy-now">
					<span className="vehicle-pricing__label">{t('vehiclePricing.buyNow')}</span>
					<span className="vehicle-pricing__amount vehicle-pricing__amount--buy-now">
						<Zap size={16} aria-hidden="true" />
						{formatPrice(buyNowPrice, currency, intlLocale)}
					</span>
				</div>
			)}

			<p className="vehicle-pricing__disclaimer">
				{t('vehiclePricing.disclaimer')}
			</p>
		</div>
	);
}
