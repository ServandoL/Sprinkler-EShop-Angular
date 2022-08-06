import { createSelector } from '@ngrx/store';
import { getCartFeatureState } from './cart.reducers';

export const getCart = createSelector(getCartFeatureState, (state) => state.products);

export const deleteCart = createSelector(getCartFeatureState, (state) => state.response);

export const saveCartResponse = createSelector(getCartFeatureState, (state) => state.response);

export const saveCartSuccess = createSelector(getCartFeatureState, (state) => state.success);

export const addToCart = createSelector(getCartFeatureState, (state) => state.response);

export const saveCart = createSelector(getCartFeatureState, (state) => state.response);

export const emptyOnLogin = createSelector(getCartFeatureState, (state) => state.emptyOnLogin);

export const saveCartError = createSelector(getCartFeatureState, (state) => state.error);
