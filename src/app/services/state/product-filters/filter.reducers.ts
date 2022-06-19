import { createReducer, on } from '@ngrx/store';
import { FilterState } from './filter.state';
import * as FilterActions from './filter.actions';

const initialFilterState: FilterState = {
  categories: [],
  brands: [],
  success: false,
  isLoading: false,
  error: '',
};

export const filterReducer = createReducer<FilterState>(
  initialFilterState,
  on(FilterActions.loadProductFilters, (state, action): FilterState => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(FilterActions.loadProductFiltersSuccess, (state, action): FilterState => {
    return {
      ...state,
      categories: action.response.categories,
      brands: action.response.brands,
      isLoading: false,
      success: true,
    };
  }),
  on(FilterActions.loadProductFiltersFailure, (state, action): FilterState => {
    return {
      ...state,
      error: action.error,
      isLoading: false,
      success: false,
    };
  })
);
