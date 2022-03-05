import { createAction, props } from '@ngrx/store';
import { ICart } from '../../../models/cart.model';
import { ObjectId } from 'mongodb';

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
const AddToCartSuccess = '[Cart] Add To Cart Success';
const AddToCartFailure = '[Cart] Add To Cart Failure';

export const loadCart = createAction(LoadCartAction);
export const loadCartSuccess = createAction(
  LoadCartSuccess,
  props<{ cart: ICart }>()
);
