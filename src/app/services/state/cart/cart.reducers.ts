import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import { ICartItem } from '../../../models/cart.model';
import { CartState } from './cart.state';
import * as CartActions from './cart.actions';
import { exists } from 'fs';

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
      user_id: state.user_id,
    };
  }),
  on(CartActions.clearCartApi, (state, action): CartState => {
    return {
      ...state,
      user_id: state.user_id,
      isLoading: true,
    };
  }),
  on(CartActions.clearCartSuccess, (state, action): CartState => {
    return {
      ...initialState,
      user_id: state.user_id,
      response: action.response.message,
      isLoading: false,
    };
  }),
  on(CartActions.clearCartFailure, (state, action): CartState => {
    return {
      ...state,
      error: action.error as any,
      isLoading: false,
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
    let cart: ICartItem[] = [];
    if (action.response) {
      cart = action.response.cart;
    }
    return {
      ...state,
      products: [...cart],
      cartQuantity: cart.length || 0,
      user_id: state.user_id,
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
    if (action.product) {
      const exists = products.filter(
        (product) => product.productName === action.product.productName
      );
      if (!exists.length) {
        products.push(action.product);
      } else {
        products = products.map((product) => {
          if (product.productName === action.product.productName) {
            const quantity = product.quantity + action.product.quantity;
            return {
              ...product,
              quantity: quantity,
            };
          } else {
            return { ...product };
          }
        });
      }
    }
    return {
      ...state,
      user_id: action.product.user_id,
      products: [...products],
      cartQuantity: products.length,
      currentProduct: action.product,
      response: 'Successfully added to your cart.',
    };
  }),
  on(CartActions.resetMessage, (state, action): CartState => {
    return {
      ...state,
      response: '',
      error: '',
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
