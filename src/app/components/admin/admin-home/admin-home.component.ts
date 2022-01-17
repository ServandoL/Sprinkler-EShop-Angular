import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getProductFeatureState, getProducts } from '../../../services/state/product.reducers';
import { State } from '../../../models/AppState';
import * as ProductActions from '../../../services/state/product.actions';


@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  constructor(private store: Store<State>) { }

  products$ = this.store.select(getProducts);
  productsLoading$ = this.store.select(getProductFeatureState);
  errroMessage!: Observable<string>;

  ngOnInit(): void {
    this.store.dispatch(ProductActions.loadProducts());
  }

  onDelete() {
    console.log('delete clicked')
  }

  onUpdate() {
    console.log('update clicked')
  }

}
