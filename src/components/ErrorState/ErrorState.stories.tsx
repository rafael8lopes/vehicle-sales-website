import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { ErrorState } from '@/components/ErrorState/ErrorState';

const meta = {
	title: 'Components/ErrorState',
	component: ErrorState,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
	},
} satisfies Meta<typeof ErrorState>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		title: 'Unable to load vehicle',
		message: "We couldn't load the vehicle details. Please try again.",
        retryText: 'Try Again',
		onRetry: fn(),
	},
};

