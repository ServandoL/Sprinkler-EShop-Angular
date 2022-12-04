import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import {
  DeleteProductRequest,
  IProduct,
  UpdateProductRequest,
} from '../../../models/product.model';
import { Pagination } from '../../../models/pagination.model';
import { IUser } from '../../../models/user.model';
import { getUser } from '../../../services/state/users/users.selectors';
import {
  getProducts,
  getProductPagination,
  getProductLoading,
  getDeleteResponse,
  getUpdateResponse,
} from '../../../services/state/product/product.selectors';
import { ProductAppService } from '../../../services/state/services/product.service';
import { AuthService } from '../../../services/auth/auth-service.service';
import { AppState } from '../../../services/state/state';
import { FindProductInput } from '../../../services/state/product/product.state';
import { getSearchCriteria } from '../../../services/state/product/searchCriteria/searchCriteria.selectors';
import { getBrands, getCategories } from '../../../services/state/product-filters/filter.selector';

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
  searchCriteria$!: Observable<FindProductInput>;
  brands$!: Observable<string[]>;
  categories$!: Observable<string[]>;
  updateResponse$!: Observable<boolean | null>;
  searchCriteria!: FindProductInput;
  productToUpdate!: IProduct;
  productToDelete!: IProduct | undefined;
  showDeleteModal = false;
  deleted = false;
  confirmDelete = false;
  updated = false;
  request!: FindProductInput;
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
    this.brands$ = this.store.select(getBrands);
    this.categories$ = this.store.select(getCategories);
    this.products$ = this.store.select(getProducts);
    this.pagination$ = this.store.select(getProductPagination);
    this.productsLoading$ = this.store.select(getProductLoading);
    this.user$ = this.store.select(getUser);
    this.deleteSuccess$ = this.store.select(getDeleteResponse);
    this.searchCriteria$ = this.store.select(getSearchCriteria);
    this.updateResponse$ = this.store.select(getUpdateResponse);
    this.request = {
      __typename: 'FindProductInput',
      categories: [],
      page: {
        pageSize: 8,
        pageNumber: 1,
      },
    };
  }

  ngOnInit(): void {
    this.productService.initializeProducts([]);
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
          this.defaultSearch();
          this.displayDelete = false;
        }
      })
    );
    this.subscription.push(
      this.searchCriteria$.subscribe((state) => {
        this.searchCriteria = state;
      })
    );
    this.subscription.push(
      this.updateResponse$.subscribe((response) => {
        if (response) {
          this.defaultSearch();
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

  updateClicked(request: UpdateProductRequest) {
    this.productService.updateProduct(request);
  }

  resetDeleteResponse() {
    this.productService.resetDeleteResponse();
  }

  onConfirmDelete(request: IProduct | undefined) {
    if (!request) {
      return;
    }
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
    this.defaultSearch();
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

  onFilterSubmit(searchFilter: FindProductInput) {
    this.productService.setSearchCriteria(searchFilter);
    this.productService.filteredSearch(searchFilter);
  }
  onResetClicked(clicked: boolean) {
    if (clicked) {
      this.productService.resetSearchCriteria();
      this.defaultSearch();
    }
  }

  defaultSearch() {
    this.productService.loadProducts({
      __typename: 'FindProductInput',
      categories: [],
      page: {
        pageSize: 8,
        pageNumber: 1,
      },
    });
  }
}
