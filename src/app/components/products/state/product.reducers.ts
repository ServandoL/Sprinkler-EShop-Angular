import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import { IProduct } from '../../../models/product.model';
import { ProductState } from './product.state';
import * as ProductActions from './product.actions';

const initialState: ProductState = {
  products: [],
  currentProductId: null,
  error: '',
};

const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const getError = createSelector(
  getProductFeatureState,
  (state) => state.error
);

export const getCurrentProductId = createSelector(
  getProductFeatureState,
  (state) => state.currentProductId
);

export const getCurrentProduct = createSelector(
  getProductFeatureState,
  getCurrentProductId,
  (state, getCurrentProductId) => {
    if (getCurrentProductId === null) {
      let product: IProduct = {
        _id: null,
        productName: '',
        price: 0,
        category: '',
        brand: '',
        stock: 0,
      };
      return product;
    } else {
      return getCurrentProductId
        ? state.products.find((product) => product._id === getCurrentProductId)
        : null;
    }
  }
);

export const getProducts = createSelector(
  getProductFeatureState,
  (state) => state.products
)

export const productReducer = createReducer<ProductState>(
  initialState,
  on(ProductActions.setCurrentProduct, (state, action): ProductState => {
    return {
      ...state,
      currentProductId: action.currentProductId
    }
  }),
  on(ProductActions.clearCurrentProduct, (state, action): ProductState => {
    return {
      ...state,
      currentProductId: null
    }
  }),
  on(ProductActions.initializeCurrentProduct, (state) => {
    return {
      ...state,
      currentProductId: null
    }
  }),
  on(ProductActions.loadProductsSuccess, (state, action): ProductState => {
    return {
      ...state,
      products: action.products,
      error: '',
    }
  }),
  on(ProductActions.loadProductsFailure, (state, action): ProductState => {
    return {
      ...state,
      products: [],
      error: action.error,
    };
  }),
  on(ProductActions.updateProductSuccess, (state, action): ProductState => {
    const updatedProducts = state.products.map((item) =>
      action.product._id === item._id ? action.product : item
    );
    return {
      ...state,
      products: updatedProducts,
      currentProductId: action.product._id,
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
    const newProduct = [...state.products, action.product]
    return {
      ...state,
      products: newProduct,
      currentProductId: action.product._id,
      error: ''
    }
  }),
  on(ProductActions.addNewProductFailure, (state, action): ProductState => {
    return {
      ...state,
      error: action.error
    }
  }),
  on(ProductActions.deleteProductSuccess, (state, action): ProductState => {
    const products = state.products.filter(item => item._id !== action.productId)
    return {
      ...state,
      products: products,
      currentProductId: null,
      error: ''
    }
  }),
  on(ProductActions.deleteProductFailure, (state, action): ProductState => {
    return {
      ...state,
      error: action.error
    }
  })
)
