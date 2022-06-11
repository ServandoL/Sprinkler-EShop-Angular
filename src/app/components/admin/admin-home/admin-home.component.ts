import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import {
  getLoading,
  getProductFeatureState,
  getProductPagination,
  getProducts,
} from '../../../services/state/product.reducers';
import { AppState } from '../../../models/AppState';
import * as ProductActions from '../../../services/state/product.actions';
import { IProduct, ProductRequest } from '../../../models/product.model';
import { Router } from '@angular/router';
import { Pagination } from '../../../models/pagination.model';
import { ProductState } from '../../../services/state/product.state';
import { AuthService } from '../../../utils/auth/auth-service.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'],
})
export class AdminHomeComponent implements OnInit, OnDestroy {
  errroMessage!: Observable<string>;
  subscription: Subscription[] = [];
  products$!: Observable<IProduct[]>;
  productsLoading$!: Observable<ProductState>;
  productToUpdate!: IProduct;
  showDeleteModal = false;
  deleted = false;
  confirmDelete = false;
  updated = false;
  request!: ProductRequest;
  paging!: Pagination;
  products: IProduct[] = [];
  pagination$!: Observable<Pagination>;
  validated!: boolean;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    public authService: AuthService
  ) {
    this.products$ = this.store.select(getProducts);
    this.pagination$ = this.store.select(getProductPagination);
    this.productsLoading$ = this.store.select(getProductFeatureState);
    this.request = {
      category: undefined,
      page: {
        pageSize: 8,
        pageNumber: 1,
      },
    };
  }

  ngOnInit(): void {
    this.store.dispatch(
      ProductActions.loadAllProducts({ request: this.request })
    );
    this.subscription.push(
      this.authService
        .getToken$()
        .subscribe((result) => (this.validated = result))
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

  onUpdate(value: IProduct) {
    this.productToUpdate = value;
  }

  onConfirmDelete() {
    this.deleted = true;
    setTimeout(() => {
      this.deleted = false;
    }, 5000);
  }

  onDelete(value: IProduct) {
    console.log(value);
  }

  onGoTo(page: number): void {
    this.request = {
      category: undefined,
      page: {
        pageNumber: page,
        pageSize: 8,
      },
    };
    this.store.dispatch(
      ProductActions.loadAllProducts({ request: this.request })
    );
  }

  onNext(page: number): void {
    this.request = {
      category: undefined,
      page: {
        pageNumber: page + 1,
        pageSize: 8,
      },
    };
    this.store.dispatch(
      ProductActions.loadAllProducts({ request: this.request })
    );
  }

  onPrevious(page: number): void {
    this.request = {
      category: undefined,
      page: {
        pageNumber: page - 1,
        pageSize: 8,
      },
    };
    this.store.dispatch(
      ProductActions.loadAllProducts({ request: this.request })
    );
  }
}
