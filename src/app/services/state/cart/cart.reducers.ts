import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import { ICartItem } from '../../../models/cart.model';
import { CartState } from './cart.state';
import * as CartActions from './cart.actions';
import { IProduct } from '../../../models/product.model';

const initialState: CartState = {
  user_id: '',
  products: [],
  currentProduct: null,
  cartQuantity: 0,
  response: '',
  error: '',
  isLoading: false,
};

export const getCartFeatureState = createFeatureSelector<CartState>('cart');

export const getError = createSelector(
  getCartFeatureState,
  (state) => state.error
);

export const cartReducer = createReducer<CartState>(
  initialState,
  on(CartActions.clearCart, (state, action): CartState => {
    return {
      ...initialState,
    };
  }),
  on(
    CartActions.updateProductQuantity,
    (state: CartState, action): CartState => {
      let products: ICartItem[] = JSON.parse(JSON.stringify(state.products));
      products.map((product) => {
        if (product.productName === action.product.productName) {
          product.quantity = action.quantity;
          return product;
        }
        return product;
      });

      return {
        ...state,
        products: [...products],
      };
    }
  ),
  on(CartActions.loadCart, (state, action): CartState => {
    return {
      ...state,
      user_id: action.user_id,
      isLoading: true,
    };
  }),
  on(CartActions.loadCartSuccess, (state, action): CartState => {
    console.log(action);
    return {
      ...state,
      products: action.response.cart,
      cartQuantity: action.response.cart.length,
      isLoading: false,
    };
  }),
  on(CartActions.loadCartFailure, (state, action): CartState => {
    return {
      ...state,
      error: action.error as any,
      isLoading: false,
    };
  }),
  on(CartActions.updateCart, (state, action): CartState => {
    state.products.forEach((product) => {
      if (product.productName === action.product.productName) {
        product = { ...action.product };
      }
    });
    return {
      ...state,
    };
  }),
  on(CartActions.addToCart, (state, action): CartState => {
    let products = state.products.length > 0 ? [...state.products] : [];
    let response = '';
    if (action.product) {
      products.push(action.product);
      response = 'Successfully added to your cart.';
    }
    return {
      ...state,
      user_id: action.product.user_id,
      products: products,
      cartQuantity: products.length,
      currentProduct: action.product,
      response: response,
    };
  }),
  on(CartActions.resetMessage, (state, action): CartState => {
    return {
      ...state,
      response: '',
    };
  }),
  on(CartActions.addToCartFailure, (state, action): CartState => {
    return {
      ...state,
      products: [],
      currentProduct: null,
      error: action.error as any,
      isLoading: false,
    };
  }),
  on(CartActions.deleteFromCart, (state, action): CartState => {
    let products = [];
    for (const product of state.products) {
      if (product.productName !== action.product.productName) {
        products.push(product);
      }
    }
    return {
      ...state,
      products: [...products],
      cartQuantity: products.length,
      response: 'Updated your cart successfully.',
    };
  }),
  on(CartActions.saveCart, (state: CartState, action): CartState => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(CartActions.saveCartSuccess, (state: CartState, action): CartState => {
    return {
      ...state,
      isLoading: false,
      response: action.response,
    };
  }),
  on(CartActions.saveCartFailure, (state: CartState, action): CartState => {
    return {
      ...state,
      error: action.error as any,
      isLoading: false,
    };
  })
);
