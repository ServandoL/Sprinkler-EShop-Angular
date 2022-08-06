import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FilterState } from './filter.state';

export const getFilterFeatureState = createFeatureSelector<FilterState>('productFilters');

export const getBrands = createSelector(getFilterFeatureState, (state) => state.brands);

export const getCategories = createSelector(getFilterFeatureState, (state) => state.categories);

export const getFilterSuccess = createSelector(getFilterFeatureState, (state) => state.success);

export const getFilterError = createSelector(getFilterFeatureState, (state) => state.error);

export const getFilterLoading = createSelector(getFilterFeatureState, (state) => state.isLoading);
