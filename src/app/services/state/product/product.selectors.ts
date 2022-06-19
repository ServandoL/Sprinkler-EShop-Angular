import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from './product.state';

export const getProductFeatureState =
  createFeatureSelector<ProductState>('products');

export const getProductLoading = createSelector(
  getProductFeatureState,
  (state) => state.isLoading
);

export const getError = createSelector(
  getProductFeatureState,
  (state) => state.error
);

export const getProducts = createSelector(
  getProductFeatureState,
  (state) => state.products
);
export const getProductPagination = createSelector(
  getProductFeatureState,
  (state) => state.page
);

export const getUpdateResponse = createSelector(
  getProductFeatureState,
  (state) => state.updateSuccess
);

export const getDeleteResponse = createSelector(
  getProductFeatureState,
  (state) => state.deleteSuccess
);

export const getAddSuccess = createSelector(
  getProductFeatureState,
  (state) => state.addSuccess
);
