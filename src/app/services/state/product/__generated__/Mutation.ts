/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ReviewRequest } from '../../__generated__/globalTypes';

// ====================================================
// GraphQL mutation operation: Mutation
// ====================================================

export interface Mutation_reviewProduct {
  __typename: 'genericResponse';
  message: string | null;
  success: boolean | null;
}

export interface Mutation {
  reviewProduct: Mutation_reviewProduct | null;
}

export interface MutationVariables {
  reviewRequest?: ReviewRequest | null;
}
