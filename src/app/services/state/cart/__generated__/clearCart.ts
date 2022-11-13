/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: clearCart
// ====================================================

export interface clearCart_clearCart {
  __typename: "genericResponse";
  message: string | null;
  success: boolean | null;
}

export interface clearCart {
  clearCart: clearCart_clearCart | null;
}

export interface clearCartVariables {
  userId?: string | null;
}
