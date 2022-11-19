/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SaveCartRequest } from '../../__generated__/globalTypes';

// ====================================================
// GraphQL mutation operation: saveCart
// ====================================================

export interface saveCart_saveCart {
  __typename: 'genericResponse';
  message: string | null;
  success: boolean | null;
}

export interface saveCart {
  saveCart: saveCart_saveCart | null;
}

export interface saveCartVariables {
  request?: SaveCartRequest | null;
}
