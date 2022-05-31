import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../models/AppState';
import { getCartFeatureState } from '../../../services/state/cart/cart.reducers';
import { getCart, saveCart } from '../../../services/state/cart/cart.selectors';
import { CartService } from '../../../services/state/cart/cart.service';
import * as CartActions from '../../../services/state/cart/cart.actions';
import { ICartItem } from '../../../models/cart.model';
import { Observable, Subscription } from 'rxjs';
import { CartState } from '../../../services/state/cart/cart.state';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  success!: boolean | undefined;
  tax = 0.0825;
  subtotal!: number;
  length!: number;
  cartLoading$!: Observable<CartState>;
  cart$!: Observable<ICartItem[]>;
  cart: ICartItem[] = [];
  saveCartResponse$!: Observable<string>;
  message!: string;
  constructor(private store: Store<AppState>, public cartService: CartService) {
    this.cartLoading$ = this.store.select(getCartFeatureState);
    this.cart$ = this.store.select(getCart);
    this.saveCartResponse$ = this.store.select(saveCart);
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.cart$.subscribe((state) => {
        this.length = state.length;
      })
    );
    this.subscriptions.push(
      this.cart$.subscribe((state) => {
        this.subtotal = 0;
        state.forEach((item) => {
          this.subtotal += item.price * item.quantity;
        });
      })
    );
    this.subscriptions.push(
      this.cart$.subscribe((cart) => {
        this.cart = [...cart];
      })
    );
    this.subscriptions.push(
      this.cartLoading$.subscribe((state) => {
        this.success = state.response.length > 0;
        this.message = state.response;
        if (this.success && this.message.length) {
          setTimeout(() => {
            this.success = false;
            this.store.dispatch(CartActions.resetMessage());
          }, 5000);
        }
      })
    );
  }

  updateQuantity(value: number, product: ICartItem) {
    this.store.dispatch(
      CartActions.updateProductQuantity({ product: product, quantity: value })
    );
  }

  onUpdate(qty: number, product: ICartItem) {
    this.subtotal = 0;
    this.store.dispatch(
      CartActions.updateCart({ product: product, quantity: qty })
    );
  }

  onRemove(product: ICartItem) {
    this.subtotal = 0;
    this.store.dispatch(CartActions.deleteFromCart({ product: product }));
  }

  saveCart() {
    const user =
      sessionStorage.getItem('SessionUser') ||
      sessionStorage.getItem('SessionAdmin') ||
      '';
    this.store.dispatch(
      CartActions.saveCart({
        products: [...this.cart],
        user_id: user,
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
