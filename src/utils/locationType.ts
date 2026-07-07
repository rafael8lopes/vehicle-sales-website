import type { SaleLocationType } from '@/features/sales/types';

const LOCATION_TYPE_LABELS: Record<SaleLocationType, string> = {
	online: 'Online',
	'in-person': 'In Person',
	hybrid: 'Hybrid',
};

export function getLocationTypeLabel(locationType: SaleLocationType): string {
	return LOCATION_TYPE_LABELS[locationType];
}
