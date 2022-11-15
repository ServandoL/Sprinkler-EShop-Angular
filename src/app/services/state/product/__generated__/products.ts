/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductInput } from "./../../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: products
// ====================================================

export interface products_products_data_ratings {
  __typename: "Rating";
  name: string | null;
  review: string | null;
  rate: number | null;
  headLine: string | null;
  createdDate: string | null;
}

export interface products_products_data {
  __typename: "Product";
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
  rating: number | null;
  ratings: (products_products_data_ratings | null)[] | null;
}

export interface products_products_pagination {
  __typename: "Pagination";
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

export interface products_products {
  __typename: "getProductResponse";
  data: (products_products_data | null)[] | null;
  pagination: products_products_pagination | null;
}

export interface products {
  products: products_products | null;
}

export interface productsVariables {
  productRequest?: ProductInput | null;
}
