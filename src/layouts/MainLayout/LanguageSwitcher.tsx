import { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { supportedLanguages, type SupportedLanguage } from '@/app/i18n';
import { getCountryFlag } from '@/utils/country';

import '@/layouts/MainLayout/LanguageSwitcher.scss';

type LanguageConfig = {
	code: SupportedLanguage;
	label: string;
	countryCode: string;
};

const LANGUAGE_CONFIG: Record<SupportedLanguage, Omit<LanguageConfig, 'code'>> = {
	en: { label: 'English', countryCode: 'GB' },
	pt: { label: 'Português', countryCode: 'PT' },
};

const LANGUAGES: LanguageConfig[] = supportedLanguages.map((code) => ({
	code,
	...LANGUAGE_CONFIG[code],
}));

export function LanguageSwitcher() {
	const { t, i18n } = useTranslation();
	const [isOpen, setIsOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	const currentCode = (i18n.resolvedLanguage ?? i18n.language) as SupportedLanguage;
	const currentLanguage =
		LANGUAGES.find((language) => language.code === currentCode) ?? LANGUAGES[0];

	const handleSelect = (code: SupportedLanguage) => {
		void i18n.changeLanguage(code);
		setIsOpen(false);
	};

	useEffect(() => {
		if (!isOpen) {
			return;
		}

		const handlePointerDown = (event: MouseEvent) => {
			if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handlePointerDown);
		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('mousedown', handlePointerDown);
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [isOpen]);

	return (
		<div className="language-switcher" ref={containerRef}>
			<button
				type="button"
				className="language-switcher__trigger"
				aria-haspopup="listbox"
				aria-expanded={isOpen}
				aria-label={t('layout.language')}
				onClick={() => setIsOpen((open) => !open)}
			>
				<span className="language-switcher__flag" aria-hidden="true">
					{getCountryFlag(currentLanguage.countryCode)}
				</span>
				<span className="language-switcher__code">{currentLanguage.code.toUpperCase()}</span>
				<ChevronDown
					className="language-switcher__chevron"
					size={14}
					aria-hidden="true"
				/>
			</button>

			{isOpen && (
				<ul className="language-switcher__menu" role="listbox" aria-label={t('layout.language')}>
					{LANGUAGES.map((language) => {
						const isActive = language.code === currentLanguage.code;

						return (
							<li key={language.code} role="none">
								<button
									type="button"
									role="option"
									aria-selected={isActive}
									className="language-switcher__option"
									onClick={() => handleSelect(language.code)}
								>
									<span className="language-switcher__flag" aria-hidden="true">
										{getCountryFlag(language.countryCode)}
									</span>
									<span className="language-switcher__option-label">{language.label}</span>
									{isActive && (
										<Check className="language-switcher__check" size={14} aria-hidden="true" />
									)}
								</button>
							</li>
						);
					})}
				</ul>
			)}
		</div>
	);
}
