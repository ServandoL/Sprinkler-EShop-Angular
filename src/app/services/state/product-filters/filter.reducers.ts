import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import { FilterState } from './filter.state';
import * as FilterActions from './filter.actions';

const initialFilterState: FilterState = {
  categories: [],
  brands: [],
  error: '',
};

export const getFilterFeatureState =
  createFeatureSelector<FilterState>('filters');

export const getError = createSelector(
  getFilterFeatureState,
  (state) => state.error
);

export const getCategories = createSelector(
  getFilterFeatureState,
  (state) => state.categories
);

export const getBrands = createSelector(
  getFilterFeatureState,
  (state) => state.brands
);

export const filterReducer = createReducer<FilterState>(
  initialFilterState,
  on(FilterActions.loadProductFilter, (state, action): FilterState => {
    return {
      ...state,
    };
  }),
  on(FilterActions.loadFilterSuccess, (state, action): FilterState => {
    return {
      ...state,
      categories: action.filter.categories,
      brands: action.filter.brands,
    };
  }),
  on(FilterActions.loadFilterFailure, (state, action): FilterState => {
    return {
      ...state,
      error: action.error,
    };
  })
);
