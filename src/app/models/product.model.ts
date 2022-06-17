import { Document, WithId } from 'mongodb';
import { Pagination } from './pagination.model';

export interface IProduct {
  _id: string;
  productName: string;
  price: number;
  category: string;
  brand: string;
  stock: number;
  imageUrl?: string;
  isDeleted?: boolean;
  deleted_by?: string;
  deleted_date?: string;
}

export interface ICategory {
  category: string;
}

export interface IBrand {
  brand: string;
}

export interface IFilter {
  categories: ICategory[];
  brands: IBrand[];
}

export interface ProductRequest {
  category: string | undefined;
  page: {
    pageSize: number;
    pageNumber: number;
  };
}

export interface ProductResponse {
  data: IProduct[];
  pagination: Pagination;
}
