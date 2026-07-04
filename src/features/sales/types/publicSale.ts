export type SaleType = 'public' | 'private' | 'exclusive';

export type SaleState = 'live' | 'upcoming';

export type SaleLocationType = 'online' | 'in-person' | 'hybrid';

export type PublicSale = {
  id: string;
  title: string;
  description?: string;
  saleType: SaleType;
  state: SaleState;
  startDateTime: string;
  endDateTime?: string;
  countryCode: string;
  location?: string;
  locationType: SaleLocationType;
  lotCount: number;
  heroImageUrl?: string;
};
