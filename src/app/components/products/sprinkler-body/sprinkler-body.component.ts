import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from '../../../models/AppState';
import * as ProductActions from '../state/product.actions';
import { getProducts } from '../state/product.reducers';

@Component({
  selector: 'app-sprinkler-body',
  templateUrl: './sprinkler-body.component.html',
  styleUrls: ['./sprinkler-body.component.css']
})
export class SprinklerBodyComponent implements OnInit {

  constructor(private store: Store<State>) { }

  pageTitle = 'Nozzles';
  addedToCart = false;
  products$ = this.store.select(getProducts);
  errorMessage$!: Observable<string>;
  quantity!: number;

  ngOnInit(): void {
    this.store.dispatch(ProductActions.loadSprinklerBodies());
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
