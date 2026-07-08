import 'i18next';

import type { resources, defaultNS } from '@/app/i18n';

declare module 'i18next' {
	interface CustomTypeOptions {
		defaultNS: typeof defaultNS;
		resources: (typeof resources)['en'];
	}
}
