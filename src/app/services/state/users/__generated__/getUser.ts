/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getUser
// ====================================================

export interface getUser_getUser_user {
  __typename: "User";
  _id: string | null;
  fname: string | null;
  lname: string | null;
  email: string | null;
  isAdmin: boolean | null;
}

export interface getUser_getUser {
  __typename: "getUserResponse";
  message: string | null;
  success: boolean | null;
  user: getUser_getUser_user | null;
}

export interface getUser {
  getUser: getUser_getUser | null;
}

export interface getUserVariables {
  email?: string | null;
  password?: string | null;
}
