import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../models/AppState';
import { getCartFeatureState } from '../../../services/state/cart/cart.reducers';
import {
  emptyOnLogin,
  getCart,
  saveCart,
} from '../../../services/state/cart/cart.selectors';
import { CartService } from '../../../services/state/cart/cart.service';
import * as CartActions from '../../../services/state/cart/cart.actions';
import { ICartItem } from '../../../models/cart.model';
import { Observable, Subscription } from 'rxjs';
import { CartState } from '../../../services/state/cart/cart.state';
import { Router } from '@angular/router';
import { SALES_TAX } from '../../../utils/common/constants';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  success!: boolean | undefined;
  tax = SALES_TAX;
  subtotal!: number;
  length!: number;
  cartLoading$!: Observable<CartState>;
  cart$!: Observable<ICartItem[]>;
  cart: ICartItem[] = [];
  saveCartResponse$!: Observable<string>;
  emptyOnLogin$!: Observable<boolean>;
  error!: string;
  message!: string;
  user!: string | null;
  constructor(
    private store: Store<AppState>,
    public cartService: CartService,
    private router: Router
  ) {
    this.cartLoading$ = this.store.select(getCartFeatureState);
    this.cart$ = this.store.select(getCart);
    this.saveCartResponse$ = this.store.select(saveCart);
    this.emptyOnLogin$ = this.store.select(emptyOnLogin);

    this.user =
      sessionStorage.getItem('SessionUser') ||
      sessionStorage.getItem('SessionAdmin') ||
      '';
  }

  ngOnInit(): void {
    this.store.dispatch(CartActions.resetMessage());
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
        let products: ICartItem[] = cart.map((product) => {
          const { __typename, ...fields } = product;
          return fields;
        });
        if (products.length) {
          this.cart = [...products];
        }
      })
    );
    this.subscriptions.push(
      this.cartLoading$.subscribe((state) => {
        this.success = state.error.length === 0;
        this.message = state.response;
        if (state.error) {
          this.message = state.error;
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
    if (this.user) {
      this.store.dispatch(
        CartActions.saveCart({
          products: [...this.cart],
          user_id: this.user,
        })
      );
    }
  }

  checkout() {
    this.router.navigateByUrl('/account/cart/checkout');
  }

  deleteCart() {
    if (this.user) {
      this.store.dispatch(CartActions.clearCartApi({ email: this.user }));
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
