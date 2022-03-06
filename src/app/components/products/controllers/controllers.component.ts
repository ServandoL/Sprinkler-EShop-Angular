import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../../../utils/auth/auth-service.service';
import { State } from '../../../models/AppState';
import * as ProductActions from '../../../services/state/product.actions';
import * as CartActions from '../../../services/state/cart/cart.actions';
import {
  getProductFeatureState,
  getProducts,
} from '../../../services/state/product.reducers';
import { IProduct } from '../../../models/product.model';
import { ICartItem } from '../../../models/cart.model';
import { getCartFeatureState } from '../../../services/state/cart/cart.reducers';
import { addToCart } from '../../../services/state/cart/cart.selectors';

@Component({
  selector: 'app-controllers',
  templateUrl: './controllers.component.html',
  styleUrls: ['./controllers.component.css'],
})
export class ControllersComponent implements OnInit, OnDestroy {
  constructor(private store: Store<State>, public authService: AuthService) {}

  pageTitle = 'Controllers';
  validated!: boolean;
  addedToCart = false;
  subscription!: Subscription;
  products$ = this.store.select(getProducts);
  productsLoading$ = this.store.select(getProductFeatureState);
  addToCartLoading$ = this.store.select(getCartFeatureState);
  addToCartResponse$ = this.store.select(addToCart);
  quantity!: number;

  ngOnInit(): void {
    this.store.dispatch(ProductActions.loadControllers());
    this.quantity = 1;
    this.subscription = this.authService
      .getToken$()
      .subscribe((result) => (this.validated = result));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  updateQuantity(value: number) {
    this.quantity = value;
  }

  submit(product: IProduct) {
    console.log('onSubmit product: ', product);
    const cartItem: ICartItem = {
      user_id:
        sessionStorage.getItem('SessionUser') ||
        sessionStorage.getItem('SessionAdmin'),
      productName: product.productName,
      stock: product.stock,
      quantity: this.quantity,
      price: product.price,
      brand: product.brand,
      category: product.category,
      imageUrl: product.imageUrl,
    };
    if (this.validated) {
      this.store.dispatch(CartActions.addToCart({ product: cartItem }));
    }
  }
}
