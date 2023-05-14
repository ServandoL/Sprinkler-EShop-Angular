import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { IProduct } from '../../../models/product.model';
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
import { getSearchCriteria } from '../../../services/state/product/searchCriteria/searchCriteria.selectors';
import { CartAppService } from '../../../services/state/services/cart.service';
import { ProductAppService } from '../../../services/state/services/product.service';
import { AuthService } from '../../../services/auth/auth-service.service';
import { getBrands, getCategories } from '../../../services/state/product-filters/filter.selector';
import { FindProductInput } from '../../../services/state/product/product.state';
import { AppState } from '../../../services/state/state';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit, OnDestroy {
  pageTitle: string = '';
  validated!: boolean;
  addedToCart = false;
  subscription: Subscription[] = [];
  success!: boolean | undefined;
  quantity!: number;
  products$: Observable<IProduct[]>;
  productsLoading$: Observable<boolean>;
  addToCartLoading$: Observable<CartState>;
  addToCartResponse$: Observable<string>;
  brands$: Observable<string[]>;
  categories$: Observable<string[]>;
  searchCriteria$: Observable<FindProductInput>;
  pageTitle$!: Observable<string>;
  searchCriteria!: FindProductInput;
  message!: string;
  request!: FindProductInput;
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
    private productService: ProductAppService,
    private route: ActivatedRoute
  ) {
    this.brands$ = this.store.select(getBrands);
    this.categories$ = this.store.select(getCategories);
    this.products$ = this.store.select(getProducts);
    this.pagination$ = this.store.select(getProductPagination);
    this.productsLoading$ = this.store.select(getProductLoading);
    this.addToCartLoading$ = this.store.select(getCartFeatureState);
    this.addToCartResponse$ = this.store.select(addToCart);
    this.searchCriteria$ = this.store.select(getSearchCriteria);
    this.request = {
      __typename: 'FindProductInput',
      categories: [this.pageTitle],
      page: {
        pageNumber: 1,
        pageSize: 8,
      },
    };
  }

  ngOnInit(): void {
    this.subscription.push(
      this.route.paramMap.subscribe((params) => {
        const name = params.get('name')!;
        this.pageTitle = `${name[0].toUpperCase()}${name.slice(1)}`;
        this.productService.initializeProducts([this.pageTitle]);
      })
    );
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
    this.subscription.push(
      this.searchCriteria$.subscribe((state) => {
        this.searchCriteria = state;
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
      ...this.searchCriteria,
      page: {
        pageNumber: page,
        pageSize: 8,
      },
    };
    this.productService.loadProducts(this.request);
  }

  onNext(page: number): void {
    this.request = {
      ...this.searchCriteria,
      page: {
        pageNumber: page + 1,
        pageSize: 8,
      },
    };
    this.productService.loadProducts(this.request);
  }

  onPrevious(page: number): void {
    this.request = {
      ...this.searchCriteria,
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

  onFilterSubmit(searchFilter: FindProductInput) {
    this.pageTitle = 'Custom Search';
    this.productService.setSearchCriteria(searchFilter);
    this.productService.filteredSearch(searchFilter);
  }

  onResetClicked(clicked: boolean) {
    if (clicked) {
      this.productService.resetSearchCriteria();
      this.productService.loadProducts({
        __typename: 'FindProductInput',
        categories: [],
        page: {
          pageNumber: 1,
          pageSize: 8,
        },
      });
    }
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
