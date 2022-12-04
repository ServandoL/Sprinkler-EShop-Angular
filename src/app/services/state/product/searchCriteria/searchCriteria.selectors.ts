import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SearchCriteriaState } from './searchCriteria.state';
export const getSearchCriteriaFeatureState =
  createFeatureSelector<SearchCriteriaState>('searchCriteria');

export const getSearchCriteria = createSelector(
  getSearchCriteriaFeatureState,
  (state) => state.criteria
);
