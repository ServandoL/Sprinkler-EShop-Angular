import { createAction, props } from '@ngrx/store';
import { CartGqlResponse, ICartItem } from '../../../models/cart.model';

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
const updateCartQuantityAction = '[Cart] Update Cart Quantity';
const AddToCartSuccess = '[Cart] Add To Cart Success';
const AddToCartFailure = '[Cart] Add To Cart Failure';

export const clearCart = createAction(ClearCartAction);

export const loadCart = createAction(
  LoadCartAction,
  props<{ user_id: string | null }>()
);
export const loadCartSuccess = createAction(
  LoadCartSuccess,
  props<{ products: ICartItem[] }>()
);
export const loadCartFailure = createAction(
  LoadCartFailure,
  props<{ error: string }>()
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
  props<{ error: string }>()
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
  props<{ error: string }>()
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
  props<{ error: string }>()
);
