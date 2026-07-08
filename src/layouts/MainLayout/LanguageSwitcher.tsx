import { useTranslation } from 'react-i18next';

import { Dropdown, type DropdownOption } from '@/components/Dropdown/Dropdown';
import { supportedLanguages, type SupportedLanguage } from '@/app/i18n';
import { getCountryFlag } from '@/utils/country';

const LANGUAGE_CONFIG: Record<SupportedLanguage, { label: string; countryCode: string }> = {
	en: { label: 'English', countryCode: 'GB' },
	pt: { label: 'Português', countryCode: 'PT' },
};

const LANGUAGE_OPTIONS: DropdownOption<SupportedLanguage>[] = supportedLanguages.map((code) => {
	const { label, countryCode } = LANGUAGE_CONFIG[code];

	return {
		value: code,
		label,
		icon: getCountryFlag(countryCode),
		triggerLabel: code.toUpperCase(),
	};
});

export function LanguageSwitcher() {
	const { t, i18n } = useTranslation();

	const currentCode = (i18n.resolvedLanguage ?? i18n.language) as SupportedLanguage;

	const handleChange = (code: SupportedLanguage) => {
		void i18n.changeLanguage(code);
	};

	return (
		<Dropdown
			value={currentCode}
			options={LANGUAGE_OPTIONS}
			onChange={handleChange}
			ariaLabel={t('layout.language')}
		/>
	);
}
