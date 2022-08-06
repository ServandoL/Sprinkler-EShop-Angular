import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { OrderHistoryResponse } from '../../../models/orderHistory.model';
import { loadOrders, loadOrdersFailure, loadOrdersSuccess } from './orderHistory.actions';
import { OrderHistoryService } from './orderHistory.service';

@Injectable({
  providedIn: 'root',
})
export class OrderHistoryEffects {
  constructor(private actions$: Actions, private orderHistoryService: OrderHistoryService) {}

  getOrders$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadOrders),
      mergeMap((action) =>
        this.orderHistoryService.getOrders$(action.request).pipe(
          map((response: OrderHistoryResponse) => loadOrdersSuccess({ response })),
          catchError((error) => of(loadOrdersFailure({ error })))
        )
      )
    );
  });
}
