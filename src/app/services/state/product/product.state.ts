import { Page, Pagination } from '../../../models/pagination.model';
import { IProduct } from '../../../models/product.model';

export interface ProductState {
  products: IProduct[];
  reviewProduct: IProduct | null;
  page: Pagination;
  updateSuccess: boolean | null;
  deleteSuccess: boolean;
  addSuccess: boolean;
  error: string;
  isLoading: boolean;
}

export const reviewProductInit: IProduct = {
  _id: '',
  productName: '',
  price: 0,
  category: '',
  brand: '',
  stock: 0,
  rating: 0,
  ratings: [],
};

export interface FindProductInput {
  brand?: (string | null)[] | null;
  categories?: (string | null)[] | null;
  priceRange?: (number | null)[] | null;
  rating?: number | null;
  search?: string | null;
  page: Page;
  __typename: 'FindProductInput';
}
