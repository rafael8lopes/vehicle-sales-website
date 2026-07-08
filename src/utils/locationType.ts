import type { TFunction } from 'i18next';

import type { SaleLocationType } from '@/features/sales/types';

export function getLocationTypeLabel(
	locationType: SaleLocationType,
	t: TFunction,
): string {
	return t(`locationType.${locationType}`);
}
