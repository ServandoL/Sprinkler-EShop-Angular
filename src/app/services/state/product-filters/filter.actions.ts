import { createAction, props } from '@ngrx/store';
import { IFilter } from '../../../models/product.model';

const LoadFilters = '[Filter] Load Product Filters';
const LoadFilterSuccess = '[Filter] Load Filter Success';
const LoadFilterFailure = '[Filter] Load Filter Failure';

export const loadProductFilter = createAction(LoadFilters);

export const loadFilterSuccess = createAction(
  LoadFilterSuccess,
  props<{ filter: IFilter }>()
);
export const loadFilterFailure = createAction(
  LoadFilterFailure,
  props<{ error: string }>()
);
