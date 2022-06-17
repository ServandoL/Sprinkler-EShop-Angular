import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import {
  clearOrderHistory,
  loadOrders,
  loadOrdersFailure,
  loadOrdersSuccess,
} from './orderHistory.actions';
import { OrderHistoryState } from './orderHistory.state';

const initialState: OrderHistoryState = {
  user_id: undefined,
  orders: undefined,
  error: '',
  response: '',
  isLoading: false,
};

const getOrdersFeatureState =
  createFeatureSelector<OrderHistoryState>('orderHistory');

export const getHistoryLoading = createSelector(
  getOrdersFeatureState,
  (state) => state.isLoading
);

export const getHistoryError = createSelector(
  getOrdersFeatureState,
  (state) => state.error
);

export const getHistoryResponse = createSelector(
  getOrdersFeatureState,
  (state) => state.response
);

export const getOrders = createSelector(getOrdersFeatureState, (state) =>
  state.orders ? [...state.orders] : []
);

export const orderHistoryReducer = createReducer<OrderHistoryState>(
  initialState,
  on(loadOrders, (state, action): OrderHistoryState => {
    return {
      ...state,
      user_id: action.email,
      isLoading: true,
    };
  }),
  on(loadOrdersSuccess, (state, action): OrderHistoryState => {
    const orders = action.orders.map((order) => {
      return {
        ...order,
        orderedDate: order.orderedDate ? order.orderedDate : undefined,
      };
    });

    return {
      ...state,
      orders: [...orders],
      isLoading: false,
      response: action.response,
    };
  }),
  on(loadOrdersFailure, (state, action): OrderHistoryState => {
    return {
      ...state,
      isLoading: false,
      error: action.error,
    };
  }),
  on(clearOrderHistory, (state, action): OrderHistoryState => {
    return {
      ...initialState,
    };
  })
);
