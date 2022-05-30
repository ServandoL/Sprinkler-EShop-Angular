import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  getBrands,
  getCategories,
} from '../../../services/state/product-filters/filter.reducers';
import { AppState } from '../../../models/AppState';
import { IProduct } from '../../../models/product.model';
import * as FilterActions from '../../../services/state/product-filters/filter.actions';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.css'],
})
export class CreateItemComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  brands$ = this.store.select(getBrands);
  categories$ = this.store.select(getCategories);
  newProduct!: IProduct;

  ngOnInit(): void {
    this.store.dispatch(FilterActions.loadProductFilter());
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
    alert('submitted');
  }
}
