import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getCartFeatureState } from '../../../services/state/cart/cart.reducers';
import {
  apiError,
  apiResponse,
  apiSuccess,
  emptyOnLogin,
  getCart,
} from '../../../services/state/cart/cart.selectors';
import { ICartItem } from '../../../models/cart.model';
import { Observable, Subscription } from 'rxjs';
import { CartState } from '../../../services/state/cart/cart.state';
import { Router } from '@angular/router';
import { SALES_TAX } from '../../../utils/common/constants';
import { CartAppService } from '../../../services/state/services/cart.service';
import { IUser } from '../../../models/user.model';
import { getUser } from '../../../services/state/users/users.selectors';
import { AppState } from '../../../services/state/state';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  tax = SALES_TAX;
  subtotal!: number;
  length!: number;
  cartLoading$!: Observable<CartState>;
  cart$!: Observable<ICartItem[]>;
  cart: ICartItem[] = [];
  emptyOnLogin$!: Observable<boolean>;
  apiResponse$: Observable<string>;
  apiSuccess$: Observable<boolean>;
  apiError$: Observable<string>;
  user$: Observable<IUser>;
  user!: IUser;

  constructor(
    private store: Store<AppState>,
    public cartService: CartAppService,
    private router: Router
  ) {
    this.cartLoading$ = this.store.select(getCartFeatureState);
    this.cart$ = this.store.select(getCart);
    this.emptyOnLogin$ = this.store.select(emptyOnLogin);
    this.apiResponse$ = this.store.select(apiResponse);
    this.apiSuccess$ = this.store.select(apiSuccess);
    this.apiError$ = this.store.select(apiError);
    this.user$ = this.store.select(getUser);
  }

  ngOnInit(): void {
    this.cartService.resetCartMessage();
    this.cartService.clearSuccess();
    this.subscriptions.push(
      this.user$.subscribe((user) => {
        this.user = user;
      })
    );
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
      this.cartService.saveCart([...this.cart], this.user._id);
    }
  }

  checkout() {
    this.router.navigateByUrl('/account/cart/checkout');
  }

  deleteCart() {
    if (this.user) {
      this.cartService.deleteCart(this.user._id);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
