import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { ICartItem } from '../../../models/cart.model';
import { CartState } from './cart.state';
import * as CartActions from './cart.actions';
import { state } from '@angular/animations';
import { logout } from '../users/users.actions';

const initialState: CartState = {
  userId: '',
  products: [],
  currentProduct: undefined,
  cartQuantity: 0,
  response: '',
  error: '',
  isLoading: false,
  emptyOnLogin: true,
  success: false,
};

export const getCartFeatureState = createFeatureSelector<CartState>('cart');

export const getError = createSelector(getCartFeatureState, (state) => state.error);

export const cartReducer = createReducer<CartState>(
  initialState,
  on(CartActions.clearCartState, (state, action): CartState => {
    return {
      ...initialState,
    };
  }),
  on(CartActions.clearCart, (state, action): CartState => {
    return {
      ...initialState,
      userId: state.userId,
    };
  }),
  on(CartActions.clearCartApi, (state, action): CartState => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(CartActions.clearCartSuccess, (state, action): CartState => {
    return {
      ...initialState,
      response: action.response.message,
      success: action.response.success,
      isLoading: false,
    };
  }),
  on(CartActions.clearCartFailure, (state, action): CartState => {
    return {
      ...state,
      error: action.error as any,
      success: false,
      isLoading: false,
    };
  }),
  on(CartActions.updateProductQuantity, (state: CartState, action): CartState => {
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
  }),
  on(CartActions.loadCart, (state, action): CartState => {
    return {
      ...state,
      userId: action.user_id,
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
      userId: state.userId,
      isLoading: false,
      emptyOnLogin: cart.length === 0,
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
      const exists = products.filter((product) => product._id === action.product._id);
      if (!exists.length) {
        products.push(action.product);
      } else {
        products = products.map((product) => {
          if (product._id === action.product._id) {
            const quantity = action.product.quantity;
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
      userId: action.product.userId,
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
      currentProduct: undefined,
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
      success: action.success,
      error: '',
    };
  }),
  on(CartActions.saveCartFailure, (state: CartState, action): CartState => {
    return {
      ...state,
      error: action.error,
      success: false,
      isLoading: false,
    };
  }),
  on(CartActions.clearSuccess, (state: CartState): CartState => {
    return {
      ...state,
      success: false,
    };
  }),
  on(logout, (): CartState => {
    return {
      ...initialState,
    };
  })
);
