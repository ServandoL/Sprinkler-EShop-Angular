/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Query
// ====================================================

export interface Query_getCart_cart {
  __typename: 'Cart';
  _id: string | null;
  email: string | null;
  productName: string | null;
  price: number | null;
  category: string | null;
  brand: string | null;
  stock: number | null;
  imageUrl: string | null;
  quantity: number | null;
}

export interface Query_getCart {
  __typename: 'getCartResponse';
  cart: (Query_getCart_cart | null)[] | null;
  email: string | null;
}

export interface Query {
  getCart: Query_getCart | null;
}

export interface QueryVariables {
  userId?: string | null;
}
