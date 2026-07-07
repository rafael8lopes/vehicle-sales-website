import type { Meta, StoryObj } from '@storybook/react-vite';

import { VehiclePricing } from '@/features/vehicles/components/VehiclePricing/VehiclePricing';

const meta = {
	title: 'Components/VehiclePricing',
	component: VehiclePricing,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
	},
} satisfies Meta<typeof VehiclePricing>;

export default meta;

type Story = StoryObj<typeof meta>;

export const EstimateAndBuyNow: Story = {
	args: {
		currentPrice: 18500,
		buyNowPrice: 21000,
		currency: 'GBP',
	},
};

export const EstimateOnly: Story = {
	args: {
		currentPrice: 18500,
		currency: 'GBP',
	},
};

export const BuyNowOnly: Story = {
	args: {
		buyNowPrice: 21000,
		currency: 'GBP',
	},
};

export const EuroCurrency: Story = {
	args: {
		currentPrice: 22000,
		buyNowPrice: 25000,
		currency: 'EUR',
	},
};
