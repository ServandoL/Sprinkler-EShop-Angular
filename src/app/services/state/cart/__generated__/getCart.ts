/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getCart
// ====================================================

export interface getCart_getCart_cart {
  __typename: "Cart";
  _id: string | null;
  productName: string | null;
  price: number | null;
  category: string | null;
  brand: string | null;
  stock: number | null;
  imageUrl: string | null;
  quantity: number | null;
}

export interface getCart_getCart {
  __typename: "getCartResponse";
  cart: (getCart_getCart_cart | null)[] | null;
  email: string | null;
}

export interface getCart {
  getCart: getCart_getCart | null;
}

export interface getCartVariables {
  email?: string | null;
}
