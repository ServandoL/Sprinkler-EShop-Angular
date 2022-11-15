/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateUserInput } from "./../../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: updateUser
// ====================================================

export interface updateUser_updateUserInformation {
  __typename: "genericResponse";
  message: string | null;
  success: boolean | null;
}

export interface updateUser {
  updateUserInformation: updateUser_updateUserInformation | null;
}

export interface updateUserVariables {
  request?: UpdateUserInput | null;
}
