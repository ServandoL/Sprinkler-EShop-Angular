import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../models/AppState';
import { OrderHistoryRequest } from '../../../models/orderHistory.model';
import * as OrderHistoryActions from '../orderHistory/orderHistory.actions';
import * as CheckoutActions from '../checkout/checkout.actions';
import { Order } from '../../../models/checkout.model';
@Injectable({
  providedIn: 'root',
})
export class CheckoutAppService {
  constructor(private store: Store<AppState>) {}

  loadOrders(request: OrderHistoryRequest) {
    this.store.dispatch(OrderHistoryActions.loadOrders({ request }));
  }

  resetCheckoutMessage() {
    this.store.dispatch(CheckoutActions.resetMessage());
  }

  checkout(order: Order) {
    this.store.dispatch(CheckoutActions.checkOutAction({ order }));
  }

  resetSuccess() {
    this.store.dispatch(CheckoutActions.resetSuccess());
  }
}
