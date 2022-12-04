/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FindProductInput } from '../../__generated__/globalTypes';

// ====================================================
// GraphQL query operation: GetFilteredProductQuery
// ====================================================

export interface GetFilteredProductQuery_findProducts_data_ratings {
  __typename: 'Rating';
  name: string | null;
  review: string | null;
  rate: number | null;
  headLine: string | null;
  createdDate: string | null;
}

export interface GetFilteredProductQuery_findProducts_data {
  __typename: 'Product';
  _id: string | null;
  productName: string;
  price: number;
  category: string;
  brand: string;
  stock: number;
  imageUrl: string | null;
  rating: number | null;
  ratings: (GetFilteredProductQuery_findProducts_data_ratings | null)[] | null;
  isDeleted: boolean | null;
  deleted_by: string | null;
  deleted_date: string | null;
}

export interface GetFilteredProductQuery_findProducts_pagination {
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

export interface GetFilteredProductQuery_findProducts {
  __typename: 'getProductResponse';
  data: (GetFilteredProductQuery_findProducts_data | null)[] | null;
  pagination: GetFilteredProductQuery_findProducts_pagination | null;
}

export interface GetFilteredProductQuery {
  findProducts: GetFilteredProductQuery_findProducts | null;
}

export interface GetFilteredProductQueryVariables {
  filterRequest?: FindProductInput | null;
}
