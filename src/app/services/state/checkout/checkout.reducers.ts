import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import {
  checkOutAction,
  checkOutFailure,
  checkOutSuccess,
  clearCheckoutState,
  resetMessage,
  resetSuccess,
} from './checkout.actions';
import { CheckoutState } from './checkout.state';

const initialState: CheckoutState = {
  user_id: null,
  order: undefined,
  error: '',
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
  initialState,
  on(clearCheckoutState, (state): CheckoutState => {
    return {
      ...initialState,
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
      success: false,
    };
  })
);
