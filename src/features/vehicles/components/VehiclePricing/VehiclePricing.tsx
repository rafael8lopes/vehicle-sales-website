import { Zap } from 'lucide-react';

import { formatPrice } from '@/utils/formatPrice';

import '@/features/vehicles/components/VehiclePricing/VehiclePricing.scss';

type VehiclePricingProps = {
	currentPrice?: number;
	buyNowPrice?: number;
	currency?: string;
};

export function VehiclePricing({ currentPrice, buyNowPrice, currency = 'GBP' }: VehiclePricingProps) {
	const hasPrice = currentPrice != null || buyNowPrice != null;

	if (!hasPrice) return null;

	return (
		<div className="vehicle-pricing">
			{currentPrice != null && (
				<div className="vehicle-pricing__block">
					<span className="vehicle-pricing__label">Starting Estimate</span>
					<span className="vehicle-pricing__amount">
						{formatPrice(currentPrice, currency)}
						<span className="vehicle-pricing__currency">{currency}</span>
					</span>
				</div>
			)}

			{buyNowPrice != null && (
				<div className="vehicle-pricing__block vehicle-pricing__block--buy-now">
					<span className="vehicle-pricing__label">Buy Now</span>
					<span className="vehicle-pricing__amount vehicle-pricing__amount--buy-now">
						<Zap size={16} aria-hidden="true" />
						{formatPrice(buyNowPrice, currency)}
					</span>
				</div>
			)}

			<p className="vehicle-pricing__disclaimer">
				Prices exclude buyer&apos;s premium and applicable taxes.
			</p>
		</div>
	);
}
