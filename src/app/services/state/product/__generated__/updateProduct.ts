/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateProductRequest } from '../../__generated__/globalTypes';

// ====================================================
// GraphQL mutation operation: updateProduct
// ====================================================

export interface updateProduct_updateProduct {
  __typename: 'genericResponse';
  message: string | null;
  success: boolean | null;
}

export interface updateProduct {
  updateProduct: updateProduct_updateProduct | null;
}

export interface updateProductVariables {
  updateRequest?: UpdateProductRequest | null;
}
