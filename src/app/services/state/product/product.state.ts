import { Pagination } from '../../../models/pagination.model';
import { IProduct } from '../../../models/product.model';

export interface ProductState {
  products: IProduct[];
  page: Pagination;
  updateSuccess: boolean;
  deleteSuccess: boolean;
  addSuccess: boolean;
  error: string;
  isLoading: boolean;
}
