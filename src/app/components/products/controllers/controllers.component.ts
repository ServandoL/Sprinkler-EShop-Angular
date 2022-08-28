import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppState } from '../../../models/AppState';

import { IProduct, ProductRequest } from '../../../models/product.model';
import { getCartFeatureState } from '../../../services/state/cart/cart.reducers';
import { addToCart } from '../../../services/state/cart/cart.selectors';
import { addToCartFunction } from '../../../utils/common/functions';
import { CartState } from '../../../services/state/cart/cart.state';
import { Pagination } from '../../../models/pagination.model';
import {
  getProducts,
  getProductPagination,
  getProductLoading,
} from '../../../services/state/product/product.selectors';
import { CartAppService } from '../../../services/state/services/cart.service';
import { ProductAppService } from '../../../services/state/services/product.service';
import { AuthService } from '../../../services/auth/auth-service.service';

@Component({
  selector: 'app-controllers',
  templateUrl: './controllers.component.html',
  styleUrls: ['./controllers.component.css'],
})
export class ControllersComponent implements OnInit, OnDestroy {
  pageTitle = 'Controllers';
  validated!: boolean;
  addedToCart = false;
  subscription: Subscription[] = [];
  success!: boolean | undefined;
  quantity!: number;
  products$: Observable<IProduct[]>;
  productsLoading$: Observable<boolean>;
  addToCartLoading$: Observable<CartState>;
  addToCartResponse$: Observable<string>;
  message!: string;
  request!: ProductRequest;
  paging!: Pagination;
  pagination$!: Observable<Pagination>;
  submitted!: string;
  reviewClicked!: boolean;
  viewProduct!: IProduct;
  addToCartError!: string;

  constructor(
    private store: Store<AppState>,
    public authService: AuthService,
    private cartService: CartAppService,
    private productService: ProductAppService
  ) {
    this.products$ = this.store.select(getProducts);
    this.pagination$ = this.store.select(getProductPagination);
    this.productsLoading$ = this.store.select(getProductLoading);
    this.addToCartLoading$ = this.store.select(getCartFeatureState);
    this.addToCartResponse$ = this.store.select(addToCart);
    this.request = {
      category: this.pageTitle,
      page: {
        pageNumber: 1,
        pageSize: 8,
      },
    };
  }

  ngOnInit(): void {
    this.productService.loadProducts(this.request);
    this.reviewClicked = false;
    this.quantity = 1;
    this.subscription.push(
      this.authService.getToken$().subscribe((result) => (this.validated = result))
    );
    this.subscription.push(this.pagination$.subscribe((page) => (this.paging = page)));
    this.subscription.push(
      this.addToCartLoading$.subscribe((state) => {
        this.success = state.error.length === 0;
        this.message = state.response;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe());
    this.cartService.resetCartMessage();
    this.reviewClicked = false;
  }

  onReviewClicked($event: IProduct) {
    this.reviewClicked = true;
    this.productService.reviewProduct($event);
  }

  onGoTo(page: number): void {
    this.request = {
      category: this.pageTitle,
      page: {
        pageNumber: page,
        pageSize: 8,
      },
    };
    this.productService.loadProducts(this.request);
  }

  onNext(page: number): void {
    this.request = {
      category: this.pageTitle,
      page: {
        pageNumber: page + 1,
        pageSize: 8,
      },
    };
    this.productService.loadProducts(this.request);
  }

  onPrevious(page: number): void {
    this.request = {
      category: this.pageTitle,
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
