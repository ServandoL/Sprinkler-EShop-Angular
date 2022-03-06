import { createSelector } from '@ngrx/store';
import { getCartFeatureState } from './cart.reducers';

export const getCart = createSelector(
  getCartFeatureState,
  (state) => state.products
);

export const deleteCart = createSelector(
  getCartFeatureState,
  (state) => state.response
);

export const updateCart = createSelector(
  getCartFeatureState,
  (state) => state.response
);

export const addToCart = createSelector(
  getCartFeatureState,
  (state) => state.response
);
