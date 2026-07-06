import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Pagination } from '@/components/Pagination/Pagination';

describe('Pagination', () => {
  it('shows summary and supports page navigation and size change', () => {
    const onPageChange = vi.fn();
    const onPageSizeChange = vi.fn();

    render(
      <Pagination
        page={1}
        pageSize={12}
        totalItems={30}
        totalPages={3}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />,
    );

    expect(screen.getByText(/showing/i)).toBeInTheDocument();

    const previous = screen.getByRole('button', { name: /previous page/i });
    const next = screen.getByRole('button', { name: /next page/i });

    expect(previous).toBeDisabled();
    expect(next).toBeEnabled();

    fireEvent.click(next);
    expect(onPageChange).toHaveBeenCalledWith(2);

    fireEvent.change(screen.getByLabelText(/show/i), {
      target: { value: '24' },
    });
    expect(onPageSizeChange).toHaveBeenCalledWith(24);
  });

  it('renders ellipsis for long page ranges', () => {
    const onPageChange = vi.fn();
    const onPageSizeChange = vi.fn();

    render(
      <Pagination
        page={5}
        pageSize={12}
        totalItems={240}
        totalPages={20}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />,
    );

    expect(screen.getAllByText('…')).toHaveLength(2);
    expect(screen.getByRole('button', { name: 'Page 5' })).toHaveAttribute('aria-current', 'page');
  });
});
