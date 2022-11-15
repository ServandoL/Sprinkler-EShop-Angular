/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AddToCartInput } from "./../../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: addToCart
// ====================================================

export interface addToCart_addToCart {
  __typename: "genericResponse";
  message: string | null;
  success: boolean | null;
}

export interface addToCart {
  addToCart: addToCart_addToCart | null;
}

export interface addToCartVariables {
  request?: AddToCartInput | null;
}
