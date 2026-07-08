import { enGB, pt, type Locale } from 'date-fns/locale';

/**
 * Maps an i18next language code to a date-fns locale for date formatting.
 */
export function getDateFnsLocale(language: string): Locale {
	return language.startsWith('pt') ? pt : enGB;
}

/**
 * Maps an i18next language code to a BCP 47 locale for Intl formatters
 * (currency, numbers).
 */
export function getIntlLocale(language: string): string {
	return language.startsWith('pt') ? 'pt-PT' : 'en-GB';
}
