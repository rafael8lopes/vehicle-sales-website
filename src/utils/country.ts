import type { TFunction } from 'i18next';

const codePointToEmoji = (codePoint: number): string => String.fromCodePoint(codePoint);

const REGIONAL_INDICATOR_OFFSET = 0x1f1e6;
const ASCII_UPPERCASE_A = 65;

export const getCountryFlag = (countryCode: string): string => {
	const upper = countryCode.toUpperCase();

	if (upper.length !== 2) {
		return '';
	}

	const first = REGIONAL_INDICATOR_OFFSET + upper.charCodeAt(0) - ASCII_UPPERCASE_A;
	const second = REGIONAL_INDICATOR_OFFSET + upper.charCodeAt(1) - ASCII_UPPERCASE_A;

	return codePointToEmoji(first) + codePointToEmoji(second);
};

export const getCountryName = (countryCode: string, t: TFunction): string => {
	const upper = countryCode.toUpperCase();

	return t(`country.${upper}`, { defaultValue: upper });
};

export const getCountryLabel = (countryCode: string, t: TFunction): string => {
	const flag = getCountryFlag(countryCode);
	const name = getCountryName(countryCode, t);

	return flag ? `${flag} ${name}` : name;
};
