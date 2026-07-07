import { Monitor, Shuffle, Users, type LucideProps } from 'lucide-react';

import type { SaleLocationType } from '@/features/sales/types';

type LocationTypeIconProps = LucideProps & {
	locationType: SaleLocationType;
};

export function LocationTypeIcon({ locationType, ...props }: LocationTypeIconProps) {
	switch (locationType) {
		case 'online':
			return <Monitor {...props} />;
		case 'in-person':
			return <Users {...props} />;
		case 'hybrid':
			return <Shuffle {...props} />;
	}
}