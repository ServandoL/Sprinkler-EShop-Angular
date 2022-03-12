import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../../models/AppState';
import { getCartFeatureState } from '../../../services/state/cart/cart.reducers';
import { getCart } from '../../../services/state/cart/cart.selectors';
import { CartService } from '../../../services/state/cart/cart.service';
import * as CartActions from '../../../services/state/cart/cart.actions';
import { ICartItem } from '../../../models/cart.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
  constructor(private store: Store<State>, public cartService: CartService) {}

  cart$ = this.store.select(getCart);
  cartLoading$ = this.store.select(getCartFeatureState);

  ngOnInit(): void {
    this.store.dispatch(CartActions.clearCart());
    this.store.dispatch(
      CartActions.loadCart({
        user_id:
          sessionStorage.getItem('SessionUser') ||
          sessionStorage.getItem('SessionAdmin'),
      })
    );
  }

  updateQuantity(value: number) {
    console.log(value);
  }

  onUpdate(qty: number, product: ICartItem) {
    console.log(qty);
    console.log('update clicked');
    this.store.dispatch(
      CartActions.updateCart({ product: product, quantity: qty })
    );
  }

  ngOnDestroy(): void {}
}
