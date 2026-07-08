import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from '@/i18n/locales/en.json';
import pt from '@/i18n/locales/pt.json';

export const defaultNS = 'translation';

export const resources = {
	en: { translation: en },
	pt: { translation: pt },
} as const;

export const supportedLanguages = ['en', 'pt'] as const;

export type SupportedLanguage = (typeof supportedLanguages)[number];

void i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		resources,
		defaultNS,
		fallbackLng: 'en',
		supportedLngs: [...supportedLanguages],
		load: 'languageOnly',
		interpolation: {
			escapeValue: false,
		},
		detection: {
			order: ['localStorage', 'navigator', 'htmlTag'],
			caches: ['localStorage'],
			lookupLocalStorage: 'i18nextLng',
		},
	});

export default i18n;
