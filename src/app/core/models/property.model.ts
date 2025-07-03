export interface Property {
  id: number;
  name: string;
  location: string;
  price: number;
  type: PropertyType;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  description?: string;
  imageUrl?: string;
}

export enum PropertyType {
  Apartment = 'Apartment',
  House = 'House',
  Villa = 'Villa',
  Office = 'Office',
  Land = 'Land',
}
