import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import {
  loadOrders,
  loadOrdersFailure,
  loadOrdersSuccess,
} from './orderHistory.actions';
import { OrderHistoryService } from './orderHistory.service';

@Injectable({
  providedIn: 'root',
})
export class OrderHistoryEffects {
  constructor(
    private actions$: Actions,
    private orderHistoryService: OrderHistoryService
  ) {}

  getOrders$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadOrders),
      mergeMap((action) =>
        this.orderHistoryService.getOrders$(action.email).pipe(
          map((response) => {
            const message = 'Successfully retrieved your orders.';
            return loadOrdersSuccess({
              response: message,
              orders: response,
            });
          }),
          catchError((error) => of(loadOrdersFailure({ error })))
        )
      )
    );
  });
}
