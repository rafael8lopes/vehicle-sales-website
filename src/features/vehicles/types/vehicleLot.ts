export type VehicleMileageUnit = 'km' | 'mi';

export type VehicleSpecificationValue = string | number | boolean | null;

export type VehicleGrade = 'A' | 'B' | 'C' | 'D';

export type VehicleLot = {
  id: string;
  saleId: string;
  lotNumber: string;
  make: string;
  model: string;
  derivative?: string;
  registrationYear?: number;
  registrationDate?: string;
  mileage?: number;
  mileageUnit?: VehicleMileageUnit;
  fuelType?: string;
  transmission?: string;
  bodyType?: string;
  colour?: string;
  countryCode?: string;
  imageUrls?: string[];
  grade?: VehicleGrade;
  conditionNotes?: string;
  currentPrice?: number;
  buyNowPrice?: number;
  currency?: string;
  saleStartDateTime?: string;
  saleEndDateTime?: string;
  specification?: Record<string, VehicleSpecificationValue>;
  equipment?: string[];
};
