const COUNTRY_NAMES: Record<string, string> = {
	CH: 'Switzerland',
	DE: 'Germany',
	ES: 'Spain',
	FR: 'France',
	GB: 'United Kingdom',
	IT: 'Italy',
	JP: 'Japan',
	NL: 'Netherlands',
	PT: 'Portugal',
	US: 'United States',
};

const codePointToEmoji = (codePoint: number): string => String.fromCodePoint(codePoint);

const REGIONAL_INDICATOR_OFFSET = 0x1f1e5;
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

export const getCountryName = (countryCode: string): string => {
	return COUNTRY_NAMES[countryCode.toUpperCase()] ?? countryCode;
};

export const getCountryLabel = (countryCode: string): string => {
	const flag = getCountryFlag(countryCode);
	const name = getCountryName(countryCode);

	return flag ? `${flag} ${name}` : name;
};
