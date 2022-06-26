import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../models/AppState';
import { ICartItem } from '../../../models/cart.model';
import { IUser } from '../../../models/user.model';
import * as CartActions from '../cart/cart.actions';

@Injectable({
  providedIn: 'root',
})
export class CartAppService {
  constructor(private store: Store<AppState>) {}

  clearCart() {
    this.store.dispatch(CartActions.clearCart());
  }

  addToCart(product: ICartItem) {
    this.store.dispatch(CartActions.addToCart({ product: product }));
  }

  loadCart(email: string) {
    this.store.dispatch(CartActions.loadCart({ user_id: email }));
  }

  resetCartMessage() {
    this.store.dispatch(CartActions.resetMessage());
  }

  updateCartquantity(value: number, product: ICartItem) {
    this.store.dispatch(
      CartActions.updateProductQuantity({
        product: product,
        quantity: value,
      })
    );
  }

  onCartUpdate(quantity: number, product: ICartItem) {
    this.store.dispatch(
      CartActions.updateCart({
        product: product,
        quantity,
      })
    );
  }

  deleteFromCart(product: ICartItem) {
    this.store.dispatch(
      CartActions.deleteFromCart({
        product: product,
      })
    );
  }

  saveCart(cart: ICartItem[], email: string) {
    this.store.dispatch(
      CartActions.saveCart({
        products: [...cart],
        email: email,
      })
    );
  }

  deleteCart(email: string) {
    this.store.dispatch(CartActions.clearCartApi({ email: email }));
  }
}