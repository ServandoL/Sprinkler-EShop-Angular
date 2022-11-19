/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FilterInput } from '../../__generated__/globalTypes';

// ====================================================
// GraphQL query operation: getFilters
// ====================================================

export interface getFilters_getFilters {
  __typename: 'getFilterResponse';
  brands: (string | null)[] | null;
  categories: (string | null)[] | null;
}

export interface getFilters {
  getFilters: getFilters_getFilters | null;
}

export interface getFiltersVariables {
  filterRequest?: FilterInput | null;
}
