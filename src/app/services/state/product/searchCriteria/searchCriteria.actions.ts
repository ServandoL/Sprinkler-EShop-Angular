import { createAction, props } from '@ngrx/store';
import { FindProductInput } from '../product.state';

export enum SearchCriteraActions {
  SetSearchCriteria = '[Search Criteria] Set Search Filters',
  ResetSearchCriteria = '[Search Criteria] Reset Search Criteria',
}

export const setSearchCriteria = createAction(
  SearchCriteraActions.SetSearchCriteria,
  props<{ payload: FindProductInput }>()
);

export const resetSearchCriteria = createAction(SearchCriteraActions.ResetSearchCriteria);
