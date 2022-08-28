import { Pagination } from '../../../models/pagination.model';
import { IProduct } from '../../../models/product.model';

export interface ProductState {
  products: IProduct[];
  reviewProduct: IProduct;
  page: Pagination;
  updateSuccess: boolean;
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
