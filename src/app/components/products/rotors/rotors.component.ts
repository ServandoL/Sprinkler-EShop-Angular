import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
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

@Component({
  selector: 'app-rotors',
  templateUrl: './rotors.component.html',
  styleUrls: ['./rotors.component.css'],
})
export class RotorsComponent implements OnInit, OnDestroy {
  constructor(
    private store: Store<AppState>,
    public authService: AuthService
  ) {}
  pageTitle = 'Rotors';
  validated!: boolean;
  addedToCart = false;
  subscription: Subscription[] = [];
  products$ = this.store.select(getProducts);
  productsLoading$ = this.store.select(getProductFeatureState);
  addToCartLoading$ = this.store.select(getCartFeatureState);
  addToCartResponse$ = this.store.select(addToCart);
  success!: boolean | undefined;
  quantity!: number;

  ngOnInit(): void {
    this.store.dispatch(ProductActions.loadRotors());
    this.quantity = 1;
    this.subscription.push(
      this.authService
        .getToken$()
        .subscribe((result) => (this.validated = result))
    );
    this.subscription.push(
      this.addToCartLoading$.subscribe((state) => {
        this.success = state?.response?.success;
        if (this.success) {
          setTimeout(() => {
            this.success = false;
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
