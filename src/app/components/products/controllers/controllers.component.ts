import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../../../utils/auth/auth-service.service';
import { AppState } from '../../../models/AppState';
import * as ProductActions from '../../../services/state/product.actions';
import {
  getLoading,
  getProductFeatureState,
  getProductPagination,
  getProducts,
} from '../../../services/state/product.reducers';
import { IProduct, ProductRequest } from '../../../models/product.model';
import { getCartFeatureState } from '../../../services/state/cart/cart.reducers';
import { addToCart } from '../../../services/state/cart/cart.selectors';
import { addToCartFunction } from '../../../utils/common/functions';
import { ProductState } from '../../../services/state/product.state';
import { CartState } from '../../../services/state/cart/cart.state';
import * as CartActions from '../../../services/state/cart/cart.actions';
import { Pagination } from '../../../models/pagination.model';

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
  products: IProduct[] = [];
  pagination$!: Observable<Pagination>;

  constructor(private store: Store<AppState>, public authService: AuthService) {
    this.products$ = this.store.select(getProducts);
    this.pagination$ = this.store.select(getProductPagination);
    this.productsLoading$ = this.store.select(getLoading);
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
    this.store.dispatch(ProductActions.loadProducts({ request: this.request }));
    this.store.dispatch(CartActions.resetMessage());

    this.success = false;

    this.quantity = 1;
    this.subscription.push(
      this.authService
        .getToken$()
        .subscribe((result) => (this.validated = result))
    );
    this.subscription.push(
      this.pagination$.subscribe((page) => (this.paging = page))
    );
    this.subscription.push(
      this.addToCartLoading$.subscribe((state) => {
        this.success = state.error.length === 0;
        this.message = state.response;
        if (this.success && this.message?.length) {
          setTimeout(() => {
            this.success = false;
            this.store.dispatch(CartActions.resetMessage());
          }, 5000);
        }
      })
    );
    this.subscription.push(
      this.products$.subscribe((data) => {
        this.products = [...data];
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
  }
  onGoTo(page: number): void {
    this.request = {
      category: this.pageTitle,
      page: {
        pageNumber: page,
        pageSize: 8,
      },
    };
    this.store.dispatch(ProductActions.loadProducts({ request: this.request }));
  }

  onNext(page: number): void {
    this.request = {
      category: this.pageTitle,
      page: {
        pageNumber: page + 1,
        pageSize: 8,
      },
    };
    this.store.dispatch(ProductActions.loadProducts({ request: this.request }));
  }

  onPrevious(page: number): void {
    this.request = {
      category: this.pageTitle,
      page: {
        pageNumber: page - 1,
        pageSize: 8,
      },
    };
    this.store.dispatch(ProductActions.loadProducts({ request: this.request }));
  }

  updateQuantity(value: number) {
    this.quantity = value;
  }

  submit(product: IProduct, qty: number) {
    addToCartFunction(product, qty, this.validated, this.store);
  }
}
