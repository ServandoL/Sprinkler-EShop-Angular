import { Document, WithId } from 'mongodb';
import { Mutation_reviewProduct_product_ratings } from '../services/state/product/__generated__/Mutation';
import { Pagination } from './pagination.model';

export interface IProduct {
  _id: string;
  productName: string;
  price: number;
  category: string;
  brand: string;
  stock: number;
  rating: number;
  ratings: Rating[];
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

export interface UpdateProductRequest {
  productId: string;
  productName: string;
  modifiedDate: string;
  modifiedBy: string;
  price: number;
  stock: number;
  imageUrl: string;
}

export interface DeleteProductRequest {
  product: {
    _id: string;
  };
  email: string;
}

export interface AddProductRequest {
  productName: string;
  price: number;
  category: string;
  brand: string;
  stock: number;
  imageUrl: string;
  createdBy: string;
}

export interface FilterResponse {
  brands: string[];
  categories: string[];
  success: boolean;
}
export interface Rating {
  name: string | null | undefined;
  review: string | null | undefined;
  rate: number | null | undefined;
  createdDate: string | null | undefined;
  headLine: string | null | undefined;
}

export interface ReviewRequest {
  productId: string;
  name: string;
  review: string;
  headLine: string;
  rate: number;
  createdDate: string;
}
