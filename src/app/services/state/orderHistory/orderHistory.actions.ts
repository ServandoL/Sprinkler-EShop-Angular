import { createAction, props } from '@ngrx/store';
import { OrderHistoryRequest, OrderHistoryResponse } from '../../../models/orderHistory.model';

const LoadOrders = '[Order History] Load Orders';
const LoadOrdersSuccess = '[Order History] Load Orders Success';
const LoadOrdersFailure = '[Order History] Load Orders Failure';
const ClearOrderHistory = '[Order History] Clear Order History';

export const clearOrderHistory = createAction(ClearOrderHistory);
export const loadOrders = createAction(LoadOrders, props<{ request: OrderHistoryRequest }>());

export const loadOrdersSuccess = createAction(
  LoadOrdersSuccess,
  props<{ response: OrderHistoryResponse }>()
);

export const loadOrdersFailure = createAction(LoadOrdersFailure, props<{ error: string }>());
