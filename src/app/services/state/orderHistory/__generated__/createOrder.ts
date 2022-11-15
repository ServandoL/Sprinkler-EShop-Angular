/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrderInput } from "./../../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: createOrder
// ====================================================

export interface createOrder_createOrder {
  __typename: "genericResponse";
  message: string | null;
  success: boolean | null;
}

export interface createOrder {
  createOrder: createOrder_createOrder | null;
}

export interface createOrderVariables {
  request?: OrderInput | null;
}
