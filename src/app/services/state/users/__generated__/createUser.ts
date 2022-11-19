/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AddUserInput } from '../../__generated__/globalTypes';

// ====================================================
// GraphQL mutation operation: createUser
// ====================================================

export interface createUser_addUser {
  __typename: 'genericResponse';
  message: string | null;
  success: boolean | null;
}

export interface createUser {
  addUser: createUser_addUser | null;
}

export interface createUserVariables {
  request?: AddUserInput | null;
}
