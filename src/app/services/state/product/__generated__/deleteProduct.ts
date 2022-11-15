/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DeleteRequest } from "./../../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: deleteProduct
// ====================================================

export interface deleteProduct_deleteProduct {
  __typename: "deleteProductResponse";
  message: string | null;
  success: boolean | null;
}

export interface deleteProduct {
  deleteProduct: deleteProduct_deleteProduct | null;
}

export interface deleteProductVariables {
  deleteRequest?: DeleteRequest | null;
}
