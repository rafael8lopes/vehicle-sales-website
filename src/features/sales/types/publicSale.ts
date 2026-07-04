export type SaleType = 'public' | 'private' | 'exclusive';

export type SaleState = 'live' | 'upcoming';

export type SaleLocationType = 'online' | 'in-person' | 'hybrid';

export type PublicSale = {
  id: string;
  title: string;
  description?: string;
  saleType: SaleType;
  state: SaleState;
  featured?: boolean;
  startDateTime: string;
  endDateTime?: string;
  countryCode: string;
  location?: string;
  locationType: SaleLocationType;
  lotCount: number;
  heroImageUrl?: string;
};

export type SaleFilters = {
  state: SaleState | 'all';
  locationType: SaleLocationType | 'all';
  country: string;
};
