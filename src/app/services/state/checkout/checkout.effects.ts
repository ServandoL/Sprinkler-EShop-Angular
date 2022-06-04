import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { GetCartResponse } from '../../../models/cart.model';
import { CartGqlResponse } from '../../../models/cart.model';
import { CartService } from '../cart/cart.service';
import {
  checkOutAction,
  checkOutFailure,
  checkOutSuccess,
} from './checkout.actions';

@Injectable({
  providedIn: 'root',
})
export class CheckoutEffects {
  constructor(private actions$: Actions, private cartService: CartService) {}

  checkout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(checkOutAction),
      mergeMap((action) =>
        this.cartService.checkout$(action.order).pipe(
          map((response) =>
            checkOutSuccess({ response: response.data.checkout.message })
          ),
          catchError((error) => of(checkOutFailure({ error })))
        )
      )
    );
  });
}
