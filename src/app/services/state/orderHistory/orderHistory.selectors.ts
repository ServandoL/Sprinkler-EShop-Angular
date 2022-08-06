import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OrderHistoryState } from './orderHistory.state';

const getOrdersFeatureState = createFeatureSelector<OrderHistoryState>('orderHistory');

export const getOrderPagination = createSelector(getOrdersFeatureState, (state) => state.page);

export const getHistoryLoading = createSelector(getOrdersFeatureState, (state) => state.isLoading);

export const getHistoryError = createSelector(getOrdersFeatureState, (state) => state.error);

export const getHistoryResponse = createSelector(getOrdersFeatureState, (state) => state.response);

export const getOrders = createSelector(getOrdersFeatureState, (state) => state.orders);
