import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppState } from '../../../models/AppState';
import { Order } from '../../../models/checkout.model';
import { loadOrders } from '../../../services/state/orderHistory/orderHistory.actions';
import {
  getHistoryError,
  getHistoryLoading,
  getHistoryResponse,
  getOrders,
} from '../../../services/state/orderHistory/orderHistory.reducers';
import { SALES_TAX } from '../../../utils/common/constants';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css'],
})
export class OrderHistoryComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  user!: string;
  orders$!: Observable<Order[] | undefined>;
  isLoading$!: Observable<boolean>;
  message$!: Observable<string>;
  error$!: Observable<string>;
  tax = SALES_TAX;
  orders: Order[] = [];

  constructor(private store: Store<AppState>) {
    this.isLoading$ = this.store.select(getHistoryLoading);
    this.message$ = this.store.select(getHistoryResponse);
    this.error$ = this.store.select(getHistoryError);
    this.orders$ = this.store.select(getOrders);
    this.user =
      sessionStorage.getItem('SessionUser') ||
      sessionStorage.getItem('SessionAdmin') ||
      '';
  }

  ngOnInit(): void {
    this.store.dispatch(loadOrders({ email: this.user }));
    // this.subscriptions.push(
    //   this.orders$.subscribe((orders) => {
    //     if (orders?.length) {
    //       this.orders = [...orders];
    //       this.orders.forEach(
    //         (order) => (order.orderedDate = new Date(order.orderedDate))
    //       );
    //     }
    //   })
    // );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
