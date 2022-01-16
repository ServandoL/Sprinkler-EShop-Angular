import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from '../../../models/AppState';
import * as ProductActions from '../state/product.actions';
import { getProductFeatureState, getProducts } from '../state/product.reducers';

@Component({
  selector: 'app-controllers',
  templateUrl: './controllers.component.html',
  styleUrls: ['./controllers.component.css']
})
export class ControllersComponent implements OnInit {

  constructor(private store: Store<State>) { }

  pageTitle = 'Controllers';
  addedToCart = false;
  products$ = this.store.select(getProducts);
  productsLoading$ = this.store.select(getProductFeatureState)
  errorMessage$!: Observable<string>;
  quantity!: number;

  ngOnInit(): void {
    this.store.dispatch(ProductActions.loadControllers());
  }

  updateQuantity(value: number) {
    this.quantity = value;
  }

  submit() {
    this.addedToCart = true;
    setTimeout(() => {
      this.addedToCart = false
    }, 5000);
    console.log(this.quantity)
  }

}
