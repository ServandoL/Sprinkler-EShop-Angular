import { createReducer, on } from '@ngrx/store';
import { resetSearchCriteria, setSearchCriteria } from './searchCriteria.actions';
import { InitialSearchCriteriaState, SearchCriteriaState } from './searchCriteria.state';
import * as ProductActions from '../product.actions';

export const searchCriteriaReducer = createReducer<SearchCriteriaState>(
  InitialSearchCriteriaState,
  on(setSearchCriteria, (state, action): SearchCriteriaState => {
    return {
      ...state,
      criteria: action.payload,
    };
  }),
  on(resetSearchCriteria, (): SearchCriteriaState => {
    return {
      ...InitialSearchCriteriaState,
    };
  }),
  on(ProductActions.loadProducts, (state, action): SearchCriteriaState => {
    return {
      ...state,
      criteria: action.request,
    };
  })
);
