/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CartInput } from '../../__generated__/globalTypes';

// ====================================================
// GraphQL mutation operation: updateQuantity
// ====================================================

export interface updateQuantity_updateCart {
  __typename: 'genericResponse';
  message: string | null;
  success: boolean | null;
}

export interface updateQuantity {
  updateCart: updateQuantity_updateCart | null;
}

export interface updateQuantityVariables {
  request?: CartInput | null;
}
