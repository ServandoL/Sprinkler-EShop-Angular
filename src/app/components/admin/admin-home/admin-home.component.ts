import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  getProductFeatureState,
  getProducts,
} from '../../../services/state/product.reducers';
import { State } from '../../../models/AppState';
import * as ProductActions from '../../../services/state/product.actions';
import { IProduct } from '../../../models/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'],
})
export class AdminHomeComponent implements OnInit {
  constructor(private store: Store<State>, private router: Router) {}

  products$ = this.store.select(getProducts);
  productsLoading$ = this.store.select(getProductFeatureState);
  errroMessage!: Observable<string>;
  productToUpdate!: IProduct;
  showDeleteModal = false;
  deleted = false;
  confirmDelete = false;
  updated = false;

  ngOnInit(): void {
    this.store.dispatch(ProductActions.loadProducts());
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
    console.log(value)
  }

}
