import { Monitor, Users, Shuffle } from 'lucide-react';

import type { SaleLocationType } from '@/features/sales/types';

const LOCATION_TYPE_LABELS: Record<SaleLocationType, string> = {
	online: 'Online',
	'in-person': 'In Person',
	hybrid: 'Hybrid',
};

const LOCATION_TYPE_ICONS: Record<SaleLocationType, typeof Monitor> = {
	online: Monitor,
	'in-person': Users,
	hybrid: Shuffle,
};

export function getLocationTypeLabel(locationType: SaleLocationType): string {
	return LOCATION_TYPE_LABELS[locationType];
}

export function getLocationTypeIcon(locationType: SaleLocationType): typeof Monitor {
	return LOCATION_TYPE_ICONS[locationType];
}
