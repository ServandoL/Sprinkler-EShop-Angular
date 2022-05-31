import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../../../utils/auth/auth-service.service';
import { AppState } from '../../../models/AppState';
import * as ProductActions from '../../../services/state/product.actions';
import {
  getProductFeatureState,
  getProducts,
} from '../../../services/state/product.reducers';
import { getCartFeatureState } from '../../../services/state/cart/cart.reducers';
import { addToCart } from '../../../services/state/cart/cart.selectors';
import { IProduct } from '../../../models/product.model';
import { addToCartFunction } from '../../../utils/common/functions';
import { ProductState } from '../../../services/state/product.state';
import { CartState } from '../../../services/state/cart/cart.state';
import * as CartActions from '../../../services/state/cart/cart.actions';

@Component({
  selector: 'app-valves',
  templateUrl: './valves.component.html',
  styleUrls: ['./valves.component.css'],
})
export class ValvesComponent implements OnInit, OnDestroy {
  pageTitle = 'Nozzles';
  validated!: boolean;
  addedToCart = false;
  subscription: Subscription[] = [];
  success!: boolean | undefined;
  quantity!: number;
  products$!: Observable<IProduct[]>;
  productsLoading$: Observable<ProductState>;
  addToCartLoading$: Observable<CartState>;
  addToCartResponse$: Observable<string>;
  message!: string;

  constructor(private store: Store<AppState>, public authService: AuthService) {
    this.products$ = this.store.select(getProducts);
    this.productsLoading$ = this.store.select(getProductFeatureState);
    this.addToCartLoading$ = this.store.select(getCartFeatureState);
    this.addToCartResponse$ = this.store.select(addToCart);
  }

  ngOnInit(): void {
    this.store.dispatch(ProductActions.loadValves());
    this.subscription.push(
      this.authService
        .getToken$()
        .subscribe((result) => (this.validated = result))
    );
    this.subscription.push(
      this.addToCartLoading$.subscribe((state) => {
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

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe());
  }

  updateQuantity(value: number) {
    this.quantity = value;
  }

  submit(product: IProduct, qty: number) {
    addToCartFunction(product, qty, this.validated, this.store);
  }
}
