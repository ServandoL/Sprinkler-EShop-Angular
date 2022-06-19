import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../models/AppState';
import { AddProductRequest, IProduct } from '../../../models/product.model';
import { Observable, Subscription } from 'rxjs';
import {
  getBrands,
  getCategories,
  getFilterError,
  getFilterLoading,
  getFilterSuccess,
} from '../../../services/state/product-filters/filter.selector';
import * as FilterActions from '../../../services/state/product-filters/filter.actions';
import { IUser } from '../../../models/user.model';
import { getUser } from '../../../services/state/users/users.selectors';
import {
  addNewProduct,
  resetAddSuccess,
} from '../../../services/state/product/product.actions';
import { getAddSuccess } from '../../../services/state/product/product.selectors';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.css'],
})
export class CreateItemComponent implements OnInit {
  brands$!: Observable<string[]>;
  categories$!: Observable<string[]>;
  filterLoading$!: Observable<boolean>;
  errorMessage$!: Observable<string>;
  filterSuccess$!: Observable<boolean>;
  addSuccess$!: Observable<boolean>;
  user$!: Observable<IUser>;
  subscriptions: Subscription[] = [];
  user!: IUser;

  newProduct!: IProduct;
  constructor(private store: Store<AppState>) {
    this.brands$ = this.store.select(getBrands);
    this.categories$ = this.store.select(getCategories);
    this.filterLoading$ = this.store.select(getFilterLoading);
    this.errorMessage$ = this.store.select(getFilterError);
    this.filterSuccess$ = this.store.select(getFilterSuccess);
    this.user$ = this.store.select(getUser);
    this.addSuccess$ = this.store.select(getAddSuccess);
  }

  ngOnInit(): void {
    this.store.dispatch(
      FilterActions.loadProductFilters({
        request: ['category', 'brand'],
      })
    );
    this.subscriptions.push(this.user$.subscribe((user) => (this.user = user)));
  }

  createItemForm = new FormGroup({
    productName: new FormControl('', [Validators.required]),
    productPrice: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /(?:^[1-9]([0-9]+)?(?:\.[0-9]{1,2})?$)|(?:^(?:0)$)|(?:^[0-9]\.[0-9](?:[0-9])?$)/
      ),
    ]),
    productCategory: new FormControl('', [Validators.required]),
    productBrand: new FormControl('', [Validators.required]),
    productStock: new FormControl(0, [Validators.required, Validators.min(1)]),
    productImage: new FormControl(''),
  });

  get productName() {
    return this.createItemForm.get('productName');
  }
  get productPrice() {
    return this.createItemForm.get('productPrice');
  }
  get productCategory() {
    return this.createItemForm.get('productCategory');
  }
  get productBrand() {
    return this.createItemForm.get('productBrand');
  }
  get productStock() {
    return this.createItemForm.get('productStock');
  }
  get productImage() {
    return this.createItemForm.get('productImage');
  }

  onSubmit() {
    const request: AddProductRequest = {
      productName: this.productName?.value,
      price: +this.productPrice?.value,
      category: this.productCategory?.value,
      brand: this.productBrand?.value,
      stock: +this.productStock?.value,
      imageUrl: this.productImage?.value,
      createdBy: `${this.user.fname} ${this.user.lname} || ${this.user._id}`,
    };
    this.store.dispatch(addNewProduct({ request }));
  }

  onReset() {
    this.createItemForm.reset();
    this.store.dispatch(resetAddSuccess());
  }
}
