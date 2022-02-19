import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../../../utils/auth/auth-service.service';
import { State } from '../../../models/AppState';
import * as ProductActions from '../../../services/state/product.actions';
import {
  getProductFeatureState,
  getProducts,
} from '../../../services/state/product.reducers';

@Component({
  selector: 'app-rotors',
  templateUrl: './rotors.component.html',
  styleUrls: ['./rotors.component.css'],
})
export class RotorsComponent implements OnInit {
  constructor(private store: Store<State>, public authService: AuthService) {}
  pageTitle = 'Rotors';
  addedToCart = false;
  validated!: boolean;
  subscription!: Subscription;
  products$ = this.store.select(getProducts);
  productsLoading$ = this.store.select(getProductFeatureState);
  errorMessage$!: Observable<string>;
  quantity!: number;

  ngOnInit(): void {
    this.store.dispatch(ProductActions.loadRotors());
    this.subscription = this.authService
      .getToken$()
      .subscribe((result) => (this.validated = result));
  }

  updateQuantity(value: number) {
    this.quantity = value;
  }

  submit() {
    if (this.validated) {
      this.addedToCart = true;
      setTimeout(() => {
        this.addedToCart = false;
      }, 5000);
      console.log(this.quantity);
    }
  }
}
