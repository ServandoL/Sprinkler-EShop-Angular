import { createAction, props } from '@ngrx/store';
import { Order } from '../../../models/checkout.model';

const LoadOrders = '[Order History] Load Orders';
const LoadOrdersSuccess = '[Order History] Load Orders Success';
const LoadOrdersFailure = '[Order History] Load Orders Failure';
const ClearState = '[Order History] Clear State';

export const clearState = createAction(ClearState);
export const loadOrders = createAction(LoadOrders, props<{ email: string }>());

export const loadOrdersSuccess = createAction(
  LoadOrdersSuccess,
  props<{ response: string; orders: Order[] }>()
);

export const loadOrdersFailure = createAction(
  LoadOrdersFailure,
  props<{ error: string }>()
);
