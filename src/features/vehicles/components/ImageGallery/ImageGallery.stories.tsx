import type { Meta, StoryObj } from '@storybook/react-vite';

import { ImageGallery } from '@/features/vehicles/components/ImageGallery/ImageGallery';

const meta = {
	title: 'Components/ImageGallery',
	component: ImageGallery,
	tags: ['autodocs'],
	parameters: {
		layout: 'padded',
	},
	decorators: [
		(Story) => (
			<div style={{ maxWidth: '50vw', maxHeight: '50vh', margin: '0 auto' }}>
				<Story />
			</div>
		),
	],
} satisfies Meta<typeof ImageGallery>;

export default meta;

type Story = StoryObj<typeof meta>;

export const MultipleImages: Story = {
	args: {
		alt: 'Audi A4',
		imageUrls: [
			'https://picsum.photos/seed/gallery-1/800/600',
			'https://picsum.photos/seed/gallery-2/800/600',
			'https://picsum.photos/seed/gallery-3/800/600',
			'https://picsum.photos/seed/gallery-4/800/600',
		],
	},
};

export const SingleImage: Story = {
	args: {
		alt: 'Volkswagen Golf',
		imageUrls: ['https://picsum.photos/seed/gallery-single/800/600'],
	},
};

export const NoImages: Story = {
	args: {
		alt: 'Vehicle without images',
		imageUrls: [],
	},
};
