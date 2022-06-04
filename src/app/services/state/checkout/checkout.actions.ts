import { createAction, props } from '@ngrx/store';
import { Order } from '../../../models/checkout.model';

export const CheckoutAction = '[Checkout] Check Out';
export const CheckoutSuccess = '[Checkout] Check Out Success';
export const CheckoutFailure = '[Checkout] Check Out Failure';
export const ResetMessage = '[Checkout] Reset Message';

export const checkOutAction = createAction(
  CheckoutAction,
  props<{ order: Order }>()
);

export const checkOutSuccess = createAction(
  CheckoutSuccess,
  props<{ response: string }>()
);

export const checkOutFailure = createAction(
  CheckoutFailure,
  props<{ error: string }>()
);

export const resetMessage = createAction(ResetMessage);
