import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import { ProductState } from './product.state';
import * as ProductActions from './product.actions';

const initialState: ProductState = {
  products: [],
  error: '',
  isLoading: false,
  page: {
    totalDocs: 0,
    limit: 0,
    hasPrevPage: false,
    hasNextPage: false,
    page: 0,
    totalPages: 0,
    offset: 0,
    prevPage: 0,
    nextPage: 0,
    pagingCounter: 0,
  },
};

export const getProductFeatureState =
  createFeatureSelector<ProductState>('products');

export const getLoading = createSelector(
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

export const productReducer = createReducer<ProductState>(
  initialState,
  on(ProductActions.loadProducts, (state, action): ProductState => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(ProductActions.loadProductsSuccess, (state, action): ProductState => {
    return {
      ...state,
      products: [...action.response.data],
      page: { ...action.response.pagination },
      error: '',
      isLoading: false,
    };
  }),
  on(ProductActions.loadProductsFailure, (state, action): ProductState => {
    return {
      ...state,
      products: [],
      error: action.error,
      isLoading: false,
    };
  }),
  on(ProductActions.updateProductSuccess, (state, action): ProductState => {
    const updatedProducts = state.products.map((item) =>
      action.product._id === item._id ? action.product : item
    );
    return {
      ...state,
      products: updatedProducts,
      error: '',
    };
  }),
  on(ProductActions.updateProductFailure, (state, action): ProductState => {
    return {
      ...state,
      error: action.error,
    };
  }),
  on(ProductActions.addNewProductSuccess, (state, action): ProductState => {
    const newProduct = [...state.products, action.product];
    return {
      ...state,
      products: newProduct,
      error: '',
    };
  }),
  on(ProductActions.addNewProductFailure, (state, action): ProductState => {
    return {
      ...state,
      error: action.error,
    };
  }),
  on(ProductActions.deleteProductSuccess, (state, action): ProductState => {
    const products = state.products.filter(
      (item) => item._id !== action.productId
    );
    return {
      ...state,
      products: products,
      error: '',
    };
  }),
  on(ProductActions.deleteProductFailure, (state, action): ProductState => {
    return {
      ...state,
      error: action.error,
    };
  })
);
