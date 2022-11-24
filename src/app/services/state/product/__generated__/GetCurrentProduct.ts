/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCurrentProduct
// ====================================================

export interface GetCurrentProduct_getCurrentProduct_product_ratings {
  __typename: 'Rating';
  name: string | null;
  review: string | null;
  rate: number | null;
  headLine: string | null;
  createdDate: string | null;
}

export interface GetCurrentProduct_getCurrentProduct_product {
  __typename: 'Product';
  _id: string | null;
  productName: string;
  price: number;
  category: string;
  brand: string;
  stock: number;
  imageUrl: string | null;
  rating: number | null;
  ratings: (GetCurrentProduct_getCurrentProduct_product_ratings | null)[] | null;
  isDeleted: boolean | null;
  deleted_by: string | null;
  deleted_date: string | null;
}

export interface GetCurrentProduct_getCurrentProduct {
  __typename: 'getCurrentProductResponse';
  product: GetCurrentProduct_getCurrentProduct_product | null;
}

export interface GetCurrentProduct {
  getCurrentProduct: GetCurrentProduct_getCurrentProduct | null;
}

export interface GetCurrentProductVariables {
  productId: string;
}
