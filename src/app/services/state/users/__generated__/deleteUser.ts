/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: deleteUser
// ====================================================

export interface deleteUser_deleteUser {
  __typename: 'genericResponse';
  message: string | null;
  success: boolean | null;
}

export interface deleteUser {
  deleteUser: deleteUser_deleteUser | null;
}

export interface deleteUserVariables {
  id?: string | null;
}
