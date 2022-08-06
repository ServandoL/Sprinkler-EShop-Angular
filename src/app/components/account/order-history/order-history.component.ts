import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppState } from '../../../models/AppState';
import { Order } from '../../../models/checkout.model';
import { OrderHistoryRequest } from '../../../models/orderHistory.model';
import { Pagination } from '../../../models/pagination.model';
import {
  getHistoryLoading,
  getHistoryResponse,
  getHistoryError,
  getOrders,
  getOrderPagination,
} from '../../../services/state/orderHistory/orderHistory.selectors';
import { CheckoutAppService } from '../../../services/state/services/checkout.service';
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
  pagination$!: Observable<Pagination>;
  paging!: Pagination;
  request!: OrderHistoryRequest;

  constructor(private store: Store<AppState>, private checkoutService: CheckoutAppService) {
    this.pagination$ = this.store.select(getOrderPagination);
    this.isLoading$ = this.store.select(getHistoryLoading);
    this.message$ = this.store.select(getHistoryResponse);
    this.error$ = this.store.select(getHistoryError);
    this.orders$ = this.store.select(getOrders);
    this.user =
      sessionStorage.getItem('SessionUser') || sessionStorage.getItem('SessionAdmin') || '';
    this.request = {
      email: this.user,
      page: {
        pageNumber: 1,
        pageSize: 2,
      },
    };
  }

  ngOnInit(): void {
    this.checkoutService.loadOrders(this.request);
    this.subscriptions.push(this.pagination$.subscribe((page) => (this.paging = page)));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  onGoTo(page: number): void {
    this.request = {
      email: this.user,
      page: {
        pageNumber: page,
        pageSize: 2,
      },
    };
    this.checkoutService.loadOrders(this.request);
  }

  onNext(page: number): void {
    this.request = {
      email: this.user,
      page: {
        pageNumber: page + 1,
        pageSize: 2,
      },
    };
    this.checkoutService.loadOrders(this.request);
  }

  onPrevious(page: number): void {
    this.request = {
      email: this.user,
      page: {
        pageNumber: page - 1,
        pageSize: 2,
      },
    };
    this.checkoutService.loadOrders(this.request);
  }
}
