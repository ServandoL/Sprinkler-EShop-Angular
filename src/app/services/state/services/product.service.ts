import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../models/AppState';
import {
  AddProductRequest,
  DeleteProductRequest,
  IProduct,
  ProductRequest,
  ReviewRequest,
  UpdateProductRequest,
} from '../../../models/product.model';
import * as ProductActions from '../product/product.actions';
import * as FilterActions from '../product-filters/filter.actions';

@Injectable({
  providedIn: 'root',
})
export class ProductAppService {
  constructor(private store: Store<AppState>) {}

  loadProducts(request: ProductRequest) {
    this.store.dispatch(ProductActions.loadProducts({ request }));
  }

  deleteProduct(request: DeleteProductRequest) {
    this.store.dispatch(
      ProductActions.deleteProduct({
        request: request,
      })
    );
  }

  resetDeleteResponse() {
    this.store.dispatch(ProductActions.resetDeleteResponse());
  }

  updateProduct(request: UpdateProductRequest) {
    this.store.dispatch(ProductActions.updateProduct({ request }));
  }

  resetUpdateResponse() {
    this.store.dispatch(ProductActions.resetUpdateResponse());
  }

  loadProductFilters(filters: string[]) {
    this.store.dispatch(
      FilterActions.loadProductFilters({
        request: filters,
      })
    );
  }

  createProduct(product: AddProductRequest) {
    this.store.dispatch(ProductActions.addNewProduct({ request: product }));
  }

  resetAddSuccess() {
    this.store.dispatch(ProductActions.resetAddSuccess());
  }

  reviewProduct(product: IProduct) {
    this.store.dispatch(ProductActions.reviewClicked({ product }));
  }

  submitReview(request: ReviewRequest) {
    this.store.dispatch(ProductActions.submitReview({ review: request }));
  }
}
