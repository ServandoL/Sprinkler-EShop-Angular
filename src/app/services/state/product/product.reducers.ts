import { createReducer, on } from '@ngrx/store';
import { ProductState } from './product.state';
import * as ProductActions from './product.actions';

const initialState: ProductState = {
  products: [],
  error: '',
  updateSuccess: false,
  isLoading: false,
  deleteSuccess: false,
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
  on(ProductActions.updateProduct, (state, action): ProductState => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(ProductActions.resetUpdateResponse, (state, action): ProductState => {
    return {
      ...state,
      updateSuccess: false,
    };
  }),
  on(ProductActions.updateProductSuccess, (state, action): ProductState => {
    return {
      ...state,
      updateSuccess: action.response.success,
      isLoading: false,
    };
  }),
  on(ProductActions.updateProductFailure, (state, action): ProductState => {
    return {
      ...state,
      error: action.error,
      isLoading: false,
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
  on(ProductActions.deleteProduct, (state, action): ProductState => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(ProductActions.deleteProductSuccess, (state, action): ProductState => {
    return {
      ...state,
      deleteSuccess: action.response.success,
      isLoading: false,
    };
  }),
  on(ProductActions.deleteProductFailure, (state, action): ProductState => {
    return {
      ...state,
      isLoading: false,
      error: action.error,
    };
  }),
  on(ProductActions.resetDeleteResponse, (state, action): ProductState => {
    return {
      ...state,
      deleteSuccess: false,
    };
  })
);
