import { ObjectId } from 'mongodb';
import { Pagination } from '../../models/pagination.model';
import { IProduct, ProductResponse } from '../../models/product.model';

export interface ProductState {
  products: IProduct[];
  page: Pagination;
  error: string;
  isLoading: boolean;
}
