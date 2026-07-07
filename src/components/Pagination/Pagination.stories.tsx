import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { Pagination } from '@/components/Pagination/Pagination';

const meta = {
	title: 'Components/Pagination',
	component: Pagination,
	tags: ['autodocs'],
	args: {
		onPageChange: fn(),
		onPageSizeChange: fn(),
	},
} satisfies Meta<typeof Pagination>;

export default meta;

type Story = StoryObj<typeof meta>;


export const Default: Story = {
	args: {
		page: 1,
		pageSize: 12,
		totalItems: 240,
		totalPages: 20,
	},
	render: (args) => {
		const [page, setPage] = useState(args.page);
		const [pageSize, setPageSize] = useState(args.pageSize);
		const totalPages = Math.max(1, Math.ceil(args.totalItems / pageSize));

		return (
			<Pagination
				{...args}
				page={page}
				pageSize={pageSize}
				totalPages={totalPages}
				onPageChange={setPage}
				onPageSizeChange={(size) => {
					setPageSize(size);
					setPage(1);
				}}
			/>
		);
	},
};

export const SinglePage: Story = {
	args: {
		page: 1,
		pageSize: 12,
		totalItems: 8,
		totalPages: 1,
	},
};
