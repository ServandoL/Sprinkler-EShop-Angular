import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppState } from '../../../models/AppState';

import { IProduct, ProductRequest } from '../../../models/product.model';
import { addToCartFunction } from '../../../utils/common/functions';
import { getCartFeatureState } from '../../../services/state/cart/cart.reducers';
import { addToCart } from '../../../services/state/cart/cart.selectors';
import { CartState } from '../../../services/state/cart/cart.state';
import { Pagination } from '../../../models/pagination.model';
import {
  getProducts,
  getProductPagination,
  getProductFeatureState,
} from '../../../services/state/product/product.selectors';
import { ProductState } from '../../../services/state/product/product.state';
import { CartAppService } from '../../../services/state/services/cart.service';
import { ProductAppService } from '../../../services/state/services/product.service';
import { AuthService } from '../../../services/auth/auth-service.service';

@Component({
  selector: 'app-sprinkler-nozzles',
  templateUrl: './sprinkler-nozzles.component.html',
  styleUrls: ['./sprinkler-nozzles.component.css'],
})
export class SprinklerNozzlesComponent implements OnInit, OnDestroy {
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
  request!: ProductRequest;
  paging!: Pagination;
  pagination$!: Observable<Pagination>;
  submitted!: string;
  addToCartError!: string;

  constructor(
    private store: Store<AppState>,
    public authService: AuthService,
    private cartService: CartAppService,
    private productService: ProductAppService
  ) {
    this.products$ = this.store.select(getProducts);
    this.pagination$ = this.store.select(getProductPagination);
    this.productsLoading$ = this.store.select(getProductFeatureState);
    this.addToCartLoading$ = this.store.select(getCartFeatureState);
    this.addToCartResponse$ = this.store.select(addToCart);
    this.request = {
      category: 'Nozzles',
      page: {
        pageNumber: 1,
        pageSize: 8,
      },
    };
  }

  ngOnInit(): void {
    this.productService.loadProducts(this.request);

    this.subscription.push(
      this.authService.getToken$().subscribe((result) => (this.validated = result))
    );
    this.subscription.push(
      this.addToCartLoading$.subscribe((state) => {
        this.success = state.error.length === 0;
        this.message = state.response;
      })
    );
    this.subscription.push(
      this.pagination$.subscribe((data) => {
        this.paging = { ...data };
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe());
    this.cartService.resetCartMessage();
  }

  onGoTo(page: number): void {
    this.request = {
      category: 'Nozzles',
      page: {
        pageNumber: page,
        pageSize: 8,
      },
    };
    this.productService.loadProducts(this.request);
  }

  onNext(page: number): void {
    this.request = {
      category: 'Nozzles',
      page: {
        pageNumber: page + 1,
        pageSize: 8,
      },
    };
    this.productService.loadProducts(this.request);
  }

  onPrevious(page: number): void {
    this.request = {
      category: 'Nozzles',
      page: {
        pageNumber: page - 1,
        pageSize: 8,
      },
    };
    this.productService.loadProducts(this.request);
  }

  updateQuantity(value: number) {
    this.quantity = value;
  }

  submit(product: IProduct, qty: number) {
    const cartItem = addToCartFunction(product, qty, this.validated);
    if (typeof cartItem !== 'string') {
      this.cartService.addToCart(cartItem);
      this.submitted = cartItem._id;
    } else {
      this.addToCartError = cartItem;
    }
  }
}
