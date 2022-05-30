import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import { ICartItem } from '../../../models/cart.model';
import { CartState } from './cart.state';
import * as CartActions from './cart.actions';

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
      let product: ICartItem = { ...action.product, quantity: action.quantity };
      // TODO: update quantity when typed does not work

      return {
        ...state,
      };
    }
  ),
  on(CartActions.loadCart, (state, action): CartState => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(CartActions.loadCartSuccess, (state, action): CartState => {
    return {
      ...state,
      products: action.products,
      cartQuantity: action.products.length,
      error: '',
      isLoading: false,
    };
  }),
  on(CartActions.loadCartFailure, (state, action): CartState => {
    return {
      ...state,
      products: [],
      error: action.error,
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
      isLoading: true,
    };
  }),
  on(CartActions.updateCartSuccess, (state, action): CartState => {
    return {
      ...state,
      currentProduct: null,
      response: 'Updated your cart successfully.',
      error: '',
      isLoading: false,
    };
  }),
  on(CartActions.updateCartFailure, (state, action): CartState => {
    return {
      ...state,
      currentProduct: null,
      error: action.error,
      isLoading: false,
    };
  }),
  on(CartActions.addToCart, (state, action): CartState => {
    let products = [...state.products];
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
      isLoading: false,
    };
  }),
  // on(CartActions.addToCartSuccess, (state, action): CartState => {
  //   let products = [...state.products];
  //   if (action.product) {
  //     products.push(action.product);
  //   }
  //   return {
  //     ...state,
  //     user_id: action.product.user_id,
  //     products: products,
  //     cartQuantity: products.length,
  //     currentProduct: null,
  //     error: '',
  //     response: action.response,
  //     isLoading: false,
  //   };
  // }),
  on(CartActions.addToCartFailure, (state, action): CartState => {
    return {
      ...state,
      products: [],
      currentProduct: null,
      error: action.error,
      isLoading: false,
    };
  }),
  on(CartActions.deleteFromCart, (state, action): CartState => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(CartActions.deleteFromCartSuccess, (state, action): CartState => {
    return {
      ...state,
      products: state.products,
      currentProduct: null,
      response: 'Updated your cart successfully.',
      error: '',
      isLoading: false,
    };
  }),
  on(CartActions.deleteFromCartFailure, (state, action): CartState => {
    return {
      ...state,
      products: state.products,
      currentProduct: null,
      error: action.error,
      isLoading: false,
    };
  })
);
