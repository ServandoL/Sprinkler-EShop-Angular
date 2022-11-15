/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AddProductRequest } from "./../../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: addProduct
// ====================================================

export interface addProduct_addProduct {
  __typename: "addProductResponse";
  message: string | null;
  success: boolean | null;
}

export interface addProduct {
  addProduct: addProduct_addProduct | null;
}

export interface addProductVariables {
  addProductRequest?: AddProductRequest | null;
}
