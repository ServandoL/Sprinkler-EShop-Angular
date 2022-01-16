import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from '../../../models/AppState';
import * as ProductActions from '../state/product.actions';
import { getProductFeatureState, getProducts } from '../state/product.reducers';

@Component({
  selector: 'app-valves',
  templateUrl: './valves.component.html',
  styleUrls: ['./valves.component.css']
})
export class ValvesComponent implements OnInit {

  constructor(private store: Store<State>) { }

  pageTitle = 'Nozzles';
  addedToCart = false;
  products$ = this.store.select(getProducts);
  productsLoading$ = this.store.select(getProductFeatureState)
  errorMessage$!: Observable<string>;
  quantity!: number;

  ngOnInit(): void {
    this.store.dispatch(ProductActions.loadValves());
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
