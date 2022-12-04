export interface OptionsModel {
  value: string;
  selected: boolean;
  __typename: string;
}

export const BRANDS = 'Brands';
export const CATEGORIES = 'Categories';

export interface SearchFilter {
  selectedBrands?: string[];
  selectedCategories?: string[];
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
}
