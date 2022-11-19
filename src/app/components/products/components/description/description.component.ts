import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppState } from '../../../../models/AppState';
import { IProduct, Rating } from '../../../../models/product.model';
import { AuthService } from '../../../../services/auth/auth-service.service';
import { getCartFeatureState } from '../../../../services/state/cart/cart.reducers';
import { CartState } from '../../../../services/state/cart/cart.state';
import { getProductDescription } from '../../../../services/state/product/product.selectors';
import { CartAppService } from '../../../../services/state/services/cart.service';
import { addToCartFunction } from '../../../../utils/common/functions';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css'],
})
export class DescriptionComponent implements OnInit, OnDestroy {
  product$!: Observable<IProduct | null>;
  addToCartLoading$: Observable<CartState>;
  ratings: Rating[] = [];
  paginate: Rating[] = [];
  success!: boolean | undefined;
  message!: string;
  subscription: Subscription[] = [];
  product!: IProduct;
  quantity!: number;
  submitted!: string;
  validated!: boolean;
  addToCartError!: string;
  ratingPagination!: RatingPage;

  constructor(
    private store: Store<AppState>,
    private cartService: CartAppService,
    public authService: AuthService
  ) {
    this.product$ = this.store.select(getProductDescription);
    this.addToCartLoading$ = this.store.select(getCartFeatureState);
    this.ratingPagination = {
      current: 1,
      total: 1,
      numberOfPages: 1,
      last: false,
      first: true,
      size: 0,
    };
  }

  ngOnInit(): void {
    this.subscription.push(
      this.authService.getToken$().subscribe((result) => (this.validated = result))
    );
    this.subscription.push(
      this.addToCartLoading$.subscribe((state) => {
        this.success = state.error.length === 0;
        this.message = state.response;
      })
    );
    this.product$
      .subscribe((product) => {
        this.product = product!;
        this.ratings = [...product!.ratings];
        this.ratingPagination.current = 1;
        this.ratingPagination.total = this.ratings.length;
        this.ratingPagination.size = 4;
        this.ratingPagination.numberOfPages = Math.ceil(
          this.ratingPagination.total / this.ratingPagination.size
        );
        this.ratingPagination.first = true;
        this.ratingPagination.last = false;
        this.paginate = [...this.ratings.slice(0, this.ratingPagination.size)];
      })
      .unsubscribe();
  }

  ngOnDestroy(): void {
    this.subscription.forEach((subscription) => subscription.unsubscribe());
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

  onGoTo(page: number) {
    this.paginate = [];
    this.ratingPagination.current = page;
    if (page === 1) {
      this.paginate = [...this.ratings.slice(0, this.ratingPagination.size)];
    } else if (this.ratingPagination.current === this.ratingPagination.numberOfPages) {
      this.paginate = [
        ...this.ratings.slice(
          (this.ratingPagination.current - 1) * this.ratingPagination.size,
          this.ratingPagination.total
        ),
      ];
    } else {
      this.paginate = [
        ...this.ratings.slice(
          (this.ratingPagination.current - 1) * this.ratingPagination.size,
          this.ratingPagination.current * this.ratingPagination.size
        ),
      ];
    }
  }

  onPrevious(page: number) {
    this.paginate = [];
    this.ratingPagination.current = page - 1;
    if (this.ratingPagination.current === 1) {
      this.paginate = [...this.ratings.slice(0, this.ratingPagination.size)];
    } else if (this.ratingPagination.current === 2) {
      this.paginate = [
        ...this.ratings.slice(this.ratingPagination.size, this.ratingPagination.size * 2),
      ];
    } else {
      this.paginate = [
        ...this.ratings.slice(
          (page - 2) * this.ratingPagination.size,
          (page - 1) * this.ratingPagination.size
        ),
      ];
    }
  }

  onNext(page: number) {
    this.paginate = [];
    this.ratingPagination.current = page + 1;
    if (this.ratingPagination.current === 1) {
      this.paginate = [
        ...this.ratings.slice(this.ratingPagination.size - 1, (this.ratingPagination.size - 1) * 2),
      ];
    } else if (this.ratingPagination.current === this.ratingPagination.numberOfPages) {
      this.paginate = [...this.ratings.slice(page * this.ratingPagination.size)];
    } else {
      this.paginate = [
        ...this.ratings.slice(
          page * this.ratingPagination.size,
          page * this.ratingPagination.size > this.ratings.length
            ? this.ratings.length
            : (page + 1) * this.ratingPagination.size
        ),
      ];
    }
  }
}

export interface RatingPage {
  current: number;
  total: number;
  numberOfPages: number;
  last: boolean;
  first: boolean;
  size: number;
}
