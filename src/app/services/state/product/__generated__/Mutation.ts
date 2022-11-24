/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ReviewRequest } from '../../__generated__/globalTypes';

// ====================================================
// GraphQL mutation operation: Mutation
// ====================================================

export interface Mutation_reviewProduct_product_ratings {
  __typename: 'Rating';
  name: string | null;
  review: string | null;
  rate: number | null;
  headLine: string | null;
  createdDate: string | null;
}

export interface Mutation_reviewProduct_product {
  __typename: 'Product';
  _id: string | null;
  productName: string;
  price: number;
  category: string;
  brand: string;
  stock: number;
  imageUrl: string | null;
  rating: number | null;
  ratings: (Mutation_reviewProduct_product_ratings | null)[] | null;
  isDeleted: boolean | null;
  deleted_by: string | null;
  deleted_date: string | null;
}

export interface Mutation_reviewProduct {
  __typename: 'ReviewProductResponse';
  message: string | null;
  success: boolean | null;
  product: Mutation_reviewProduct_product | null;
}

export interface Mutation {
  reviewProduct: Mutation_reviewProduct | null;
}

export interface MutationVariables {
  reviewRequest?: ReviewRequest | null;
}
