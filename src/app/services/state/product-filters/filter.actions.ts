import { createAction, props } from '@ngrx/store';
import { FilterResponse } from '../../../models/product.model';

const LoadProductFiltersAction = '[Product] Load Product Filters';
const LoadProductFiltersSuccess = '[Product] Load Product Filters Success';
const LoadProductFiltersFailure = '[Product] Load Product Filters Failure';

export const loadProductFilters = createAction(
  LoadProductFiltersAction,
  props<{ request: string[] }>()
);

export const loadProductFiltersSuccess = createAction(
  LoadProductFiltersSuccess,
  props<{ response: FilterResponse }>()
);

export const loadProductFiltersFailure = createAction(
  LoadProductFiltersFailure,
  props<{ error: string }>()
);
