import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppState } from '../../../models/AppState';
import { DeleteProductRequest, IProduct, ProductRequest } from '../../../models/product.model';
import { Pagination } from '../../../models/pagination.model';
import { AuthService } from '../../../utils/auth/auth-service.service';
import { IUser } from '../../../models/user.model';
import { getUser } from '../../../services/state/users/users.selectors';
import {
  getProducts,
  getProductPagination,
  getProductLoading,
  getDeleteResponse,
} from '../../../services/state/product/product.selectors';
import { ProductAppService } from '../../../services/state/services/product.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'],
})
export class AdminHomeComponent implements OnInit, OnDestroy {
  errroMessage!: Observable<string>;
  subscription: Subscription[] = [];
  products$!: Observable<IProduct[]>;
  productsLoading$!: Observable<boolean>;
  deleteSuccess$!: Observable<boolean>;
  productToUpdate!: IProduct;
  productToDelete!: IProduct;
  showDeleteModal = false;
  deleted = false;
  confirmDelete = false;
  updated = false;
  request!: ProductRequest;
  paging!: Pagination;
  products: IProduct[] = [];
  pagination$!: Observable<Pagination>;
  validated!: boolean;
  user$!: Observable<IUser>;
  user!: IUser;
  iconClickedProduct!: IProduct | undefined;
  displayDelete = true;

  constructor(
    private productService: ProductAppService,
    private store: Store<AppState>,
    public authService: AuthService
  ) {
    this.products$ = this.store.select(getProducts);
    this.pagination$ = this.store.select(getProductPagination);
    this.productsLoading$ = this.store.select(getProductLoading);
    this.user$ = this.store.select(getUser);
    this.deleteSuccess$ = this.store.select(getDeleteResponse);
    this.request = {
      category: undefined,
      page: {
        pageSize: 8,
        pageNumber: 1,
      },
    };
  }

  ngOnInit(): void {
    this.productService.loadProducts(this.request);
    this.subscription.push(this.user$.subscribe((user) => (this.user = user)));
    this.subscription.push(
      this.authService.getToken$().subscribe((result) => (this.validated = result))
    );
    this.subscription.push(
      this.products$.subscribe((data) => {
        this.products = [...data];
      })
    );
    this.subscription.push(this.pagination$.subscribe((page) => (this.paging = page)));
    this.subscription.push(
      this.deleteSuccess$.subscribe((deleted) => {
        if (deleted) {
          this.displayDelete = false;
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe());
  }

  onIconClicked(product: IProduct) {
    this.iconClickedProduct = product;
  }

  onIconClickedConfirm() {
    this.iconClickedProduct = undefined;
  }

  onUpdate(value: IProduct) {
    this.productToUpdate = value;
  }

  resetDeleteResponse() {
    this.productService.resetDeleteResponse();
  }

  onConfirmDelete(request: IProduct) {
    const toDelete: DeleteProductRequest = {
      product: {
        _id: request._id,
      },
      email: this.user.email,
    };
    this.productService.deleteProduct(toDelete);
  }

  onDelete(value: IProduct) {
    this.productToDelete = value;
  }

  onGoTo(page: number): void {
    this.request = {
      category: undefined,
      page: {
        pageNumber: page,
        pageSize: 8,
      },
    };
    this.productService.loadProducts(this.request);
  }

  onNext(page: number): void {
    this.request = {
      category: undefined,
      page: {
        pageNumber: page + 1,
        pageSize: 8,
      },
    };
    this.productService.loadProducts(this.request);
  }

  onPrevious(page: number): void {
    this.request = {
      category: undefined,
      page: {
        pageNumber: page - 1,
        pageSize: 8,
      },
    };
    this.productService.loadProducts(this.request);
  }
}
