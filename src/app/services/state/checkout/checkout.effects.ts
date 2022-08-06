import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { CartService } from '../cart/cart.service';
import { checkOutAction, checkOutFailure, checkOutSuccess } from './checkout.actions';
import { clearCart } from '../cart/cart.actions';

@Injectable({
  providedIn: 'root',
})
export class CheckoutEffects {
  constructor(private actions$: Actions, private cartService: CartService) {}

  checkout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(checkOutAction),
      switchMap((action) => this.cartService.checkout$(action.order)),
      switchMap((response) => [
        checkOutSuccess({ response: response.data.createOrder.message }),
        clearCart(),
      ]),
      catchError((error) => of(checkOutFailure({ error })))
    );
  });
}
