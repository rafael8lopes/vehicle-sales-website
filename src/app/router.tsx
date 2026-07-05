import { createBrowserRouter } from 'react-router-dom';

import { MainLayout } from '@/layouts/MainLayout/MainLayout';
import { SalesCalendarPage } from '@/features/sales/pages/SalesCalendarPage';
import { SaleCataloguePage } from '@/features/sales/pages/SaleCataloguePage';
import { VehicleDetailPage } from '@/features/vehicles/pages/VehicleDetailPage';
import { NotFoundPage } from '@/features/sales/pages/NotFoundPage';

export const router = createBrowserRouter([
	{
		element: <MainLayout />,
		children: [
			{
				path: '/',
				element: <SalesCalendarPage />,
			},
			{
				path: '/sales/:saleId',
				element: <SaleCataloguePage />,
			},
			{
				path: '/vehicles/:vehicleId',
				element: <VehicleDetailPage />,
			},
			{
				path: '*',
				element: <NotFoundPage />,
			},
		],
	},
]);
