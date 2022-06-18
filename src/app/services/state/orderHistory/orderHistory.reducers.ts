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

export const orderHistoryReducer = createReducer<OrderHistoryState>(
  initialState,
  on(loadOrders, (state, action): OrderHistoryState => {
    return {
      ...state,
      user_id: action.request.email,
      isLoading: true,
    };
  }),
  on(loadOrdersSuccess, (state, action): OrderHistoryState => {
    const message =
      action.response.data.length === 0
        ? "You haven't placed an order yet."
        : '';
    return {
      ...state,
      orders: [...action.response.data],
      page: { ...action.response.pagination },
      response: message,
      isLoading: false,
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
