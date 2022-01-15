import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from '../../../models/AppState';
import { IProduct } from '../../../models/product.model';
import * as ProductActions from '../state/product.actions';
import { getProducts } from '../state/product.reducers';

@Component({
  selector: 'app-controllers',
  templateUrl: './controllers.component.html',
  styleUrls: ['./controllers.component.css']
})
export class ControllersComponent implements OnInit {

  constructor(private store: Store<State>) { }

  pageTitle = 'Controllers';
  products$ = this.store.select(getProducts);
  errorMessage$!: Observable<string>;
  quantity!: number;

  ngOnInit(): void {
    this.store.dispatch(ProductActions.loadProducts());
  }

  updateQuantity(value: number) {
    this.quantity = value;
  }

  submit() {
    console.log(this.quantity)
  }

}
