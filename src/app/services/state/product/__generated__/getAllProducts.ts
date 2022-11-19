/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductInput } from '../../__generated__/globalTypes';

// ====================================================
// GraphQL query operation: getAllProducts
// ====================================================

export interface getAllProducts_allProducts_data {
  __typename: 'Product';
  _id: string | null;
  productName: string;
  price: number;
  category: string;
  brand: string;
  stock: number;
  imageUrl: string | null;
  isDeleted: boolean | null;
  deleted_by: string | null;
  deleted_date: string | null;
}

export interface getAllProducts_allProducts_pagination {
  __typename: 'Pagination';
  totalDocs: number | null;
  limit: number | null;
  hasPrevPage: boolean | null;
  hasNextPage: boolean | null;
  page: number | null;
  totalPages: number | null;
  offset: number | null;
  prevPage: number | null;
  nextPage: number | null;
  pagingCounter: number | null;
}

export interface getAllProducts_allProducts {
  __typename: 'getProductResponse';
  data: (getAllProducts_allProducts_data | null)[] | null;
  pagination: getAllProducts_allProducts_pagination | null;
}

export interface getAllProducts {
  allProducts: getAllProducts_allProducts | null;
}

export interface getAllProductsVariables {
  productRequest?: ProductInput | null;
}
