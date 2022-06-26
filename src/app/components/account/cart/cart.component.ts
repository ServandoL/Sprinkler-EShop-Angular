import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../models/AppState';
import { getCartFeatureState } from '../../../services/state/cart/cart.reducers';
import {
  emptyOnLogin,
  getCart,
  saveCart,
} from '../../../services/state/cart/cart.selectors';
import { ICartItem } from '../../../models/cart.model';
import { Observable, Subscription } from 'rxjs';
import { CartState } from '../../../services/state/cart/cart.state';
import { Router } from '@angular/router';
import { SALES_TAX } from '../../../utils/common/constants';
import { CartAppService } from '../../../services/state/services/cart.service';

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
    public cartService: CartAppService,
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
    this.cartService.resetCartMessage();
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
    this.cartService.updateCartquantity(value, product);
  }

  onUpdate(qty: number, product: ICartItem) {
    this.subtotal = 0;
    this.cartService.onCartUpdate(qty, product);
  }

  onRemove(product: ICartItem) {
    this.subtotal = 0;
    this.cartService.deleteFromCart(product);
  }

  saveCart() {
    if (this.user) {
      this.cartService.saveCart([...this.cart], this.user);
    }
  }

  checkout() {
    this.router.navigateByUrl('/account/cart/checkout');
  }

  deleteCart() {
    if (this.user) {
      this.cartService.deleteCart(this.user);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
