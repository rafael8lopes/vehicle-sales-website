import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { Dropdown, type DropdownOption } from '@/components/Dropdown/Dropdown';

const languageOptions: DropdownOption<string>[] = [
	{ value: 'en', label: 'English', icon: '🇬🇧', triggerLabel: 'EN' },
	{ value: 'pt', label: 'Português', icon: '🇵🇹', triggerLabel: 'PT' },
	{ value: 'es', label: 'Español', icon: '🇪🇸', triggerLabel: 'ES' },
	{ value: 'fr', label: 'Français', icon: '🇫🇷', triggerLabel: 'FR' },
];

const sortOptions: DropdownOption<string>[] = [
	{ value: 'recent', label: 'Most recent' },
	{ value: 'price-asc', label: 'Price: low to high' },
	{ value: 'price-desc', label: 'Price: high to low' },
	{ value: 'mileage', label: 'Lowest mileage' },
];

const meta = {
	title: 'Components/Dropdown',
	component: Dropdown,
	tags: ['autodocs'],
	args: {
		ariaLabel: 'Select an option',
		onChange: fn(),
	},
	render: (args) => {
		const [value, setValue] = useState(args.value);

		return (
			<Dropdown
				{...args}
				value={value}
				onChange={(next) => {
					setValue(next);
					args.onChange(next);
				}}
			/>
		);
	},
} satisfies Meta<typeof Dropdown<string>>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithIcons: Story = {
	args: {
		ariaLabel: 'Select language',
		value: 'en',
		options: languageOptions,
	},
};

export const TextOnly: Story = {
	args: {
		ariaLabel: 'Sort vehicles',
		value: 'recent',
		options: sortOptions,
	},
};
