import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import {
  checkOutAction,
  checkOutFailure,
  checkOutSuccess,
} from './checkout.actions';
import { CheckoutState } from './checkout.state';

const initialState: CheckoutState = {
  user_id: null,
  order: undefined,
  error: '',
  response: '',
  isLoading: false,
};

export const getCheckoutFeatureState =
  createFeatureSelector<CheckoutState>('checkout');

export const getError = createSelector(
  getCheckoutFeatureState,
  (state) => state.error
);

export const checkoutReducer = createReducer<CheckoutState>(
  initialState,
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
    };
  }),
  on(checkOutFailure, (state, action): CheckoutState => {
    return {
      ...state,
      isLoading: false,
      error: action.error,
    };
  })
);
