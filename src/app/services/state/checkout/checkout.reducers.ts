import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { logout } from '../users/users.actions';
import {
  checkOutAction,
  checkOutFailure,
  checkOutSuccess,
  clearCheckoutState,
  resetMessage,
  resetSuccess,
} from './checkout.actions';
import { CheckoutState } from './checkout.state';

export const InitialCheckoutState: CheckoutState = {
  user_id: null,
  order: undefined,
  error: undefined,
  response: '',
  isLoading: false,
  success: undefined,
};

export const getCheckoutFeatureState = createFeatureSelector<CheckoutState>('checkout');

export const getErrorSelector = createSelector(getCheckoutFeatureState, (state) => state.error);

export const getResponseSelector = createSelector(
  getCheckoutFeatureState,
  (state) => state.response
);

export const getLoadingSelector = createSelector(
  getCheckoutFeatureState,
  (state) => state.isLoading
);

export const getSuccessSelector = createSelector(getCheckoutFeatureState, (state) => state.success);

export const checkoutReducer = createReducer<CheckoutState>(
  InitialCheckoutState,
  on(clearCheckoutState, (state): CheckoutState => {
    return {
      ...InitialCheckoutState,
    };
  }),
  on(resetMessage, (state, action): CheckoutState => {
    return {
      ...state,
      response: '',
    };
  }),
  on(checkOutAction, (state, action): CheckoutState => {
    return {
      ...state,
      order: { ...action.order },
      user_id: action.order.email,
      isLoading: true,
    };
  }),
  on(checkOutSuccess, (state, action): CheckoutState => {
    return {
      ...state,
      isLoading: false,
      response: action.response,
      success: true,
      error: undefined,
    };
  }),
  on(checkOutFailure, (state, action): CheckoutState => {
    return {
      ...state,
      isLoading: false,
      error: action.error,
      success: false,
    };
  }),
  on(resetSuccess, (state: CheckoutState): CheckoutState => {
    return {
      ...state,
      isLoading: false,
      success: false,
    };
  }),
  on(logout, (): CheckoutState => {
    return {
      ...InitialCheckoutState,
    };
  })
);
