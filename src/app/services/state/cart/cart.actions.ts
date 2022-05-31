import { createAction, props } from '@ngrx/store';
import {
  CartGqlResponse,
  GetCartResponse,
  ICartItem,
} from '../../../models/cart.model';

const LoadCartAction = '[Cart] Load Cart';
const LoadCartSuccess = '[Cart] Load Cart Success';
const LoadCartFailure = '[Cart] Load Cart Failure';
const DeleteFromCartAction = '[Cart] Delete From Cart';
const DeleteFromCartSuccess = '[Cart] Delete From Cart Success';
const DeleteFromCartFailure = '[Cart] Delete From Cart Failure';
const UpdateCartAction = '[Cart] Update Cart';
const UpdateCartSuccess = '[Cart] Update Cart Success';
const UpdateCartFailure = '[Cart] Update Cart Failure';
const AddToCartAction = '[Cart] Add To Cart';
const ClearCartAction = '[Cart] Clear Cart';
const UpdateCartQuantityAction = '[Cart] Update Cart Quantity';
const AddToCartSuccess = '[Cart] Add To Cart Success';
const AddToCartFailure = '[Cart] Add To Cart Failure';
const ResetMessageAction = '[Cart] Reset Message';
const SaveCartAction = '[Cart] Save Cart';
const SaveCartSuccess = '[Cart] Save Cart Success';
const SaveCartFailure = '[Cart] Save Cart Failure';

export const clearCart = createAction(ClearCartAction);

export const resetMessage = createAction(ResetMessageAction);

export const saveCart = createAction(
  SaveCartAction,
  props<{ products: ICartItem[]; user_id: string }>()
);

export const saveCartSuccess = createAction(
  SaveCartSuccess,
  props<{ response: string; success: boolean }>()
);

export const saveCartFailure = createAction(
  SaveCartFailure,
  props<{ error: unknown }>()
);

export const updateProductQuantity = createAction(
  UpdateCartQuantityAction,
  props<{ product: ICartItem; quantity: number }>()
);

export const loadCart = createAction(
  LoadCartAction,
  props<{ user_id: string | null }>()
);
export const loadCartSuccess = createAction(
  LoadCartSuccess,
  props<{ response: GetCartResponse }>()
);
export const loadCartFailure = createAction(
  LoadCartFailure,
  props<{ error: unknown }>()
);

export const deleteFromCart = createAction(
  DeleteFromCartAction,
  props<{ product: ICartItem }>()
);
export const deleteFromCartSuccess = createAction(
  DeleteFromCartSuccess,
  props<{ response: CartGqlResponse }>()
);
export const deleteFromCartFailure = createAction(
  DeleteFromCartFailure,
  props<{ error: unknown }>()
);

export const updateCart = createAction(
  UpdateCartAction,
  props<{ product: ICartItem; quantity: number }>()
);
export const updateCartSuccess = createAction(
  UpdateCartSuccess,
  props<{ response: CartGqlResponse }>()
);
export const updateCartFailure = createAction(
  UpdateCartFailure,
  props<{ error: unknown }>()
);

export const addToCart = createAction(
  AddToCartAction,
  props<{ product: ICartItem }>()
);
export const addToCartSuccess = createAction(
  AddToCartSuccess,
  props<{ response: CartGqlResponse; product: ICartItem }>()
);
export const addToCartFailure = createAction(
  AddToCartFailure,
  props<{ error: unknown }>()
);
