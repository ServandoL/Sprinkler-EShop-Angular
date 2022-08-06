import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CartService } from './cart.service';
import * as CartActions from './cart.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { GetCartResponse } from '../../../models/cart.model';
import { CartGqlResponse } from '../../../models/cart.model';

@Injectable({
  providedIn: 'root',
})
export class CartEffects {
  constructor(private actions$: Actions, private cartService: CartService) {}

  loadCart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CartActions.loadCart),
      mergeMap((action) =>
        this.cartService.getCart$(action.user_id).pipe(
          map((response: GetCartResponse) => {
            return CartActions.loadCartSuccess({ response: response });
          }),
          catchError((error) => of(CartActions.loadCartFailure({ error })))
        )
      )
    );
  });

  clearCart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CartActions.clearCartApi),
      mergeMap((action) =>
        this.cartService.clearCart$(action.email).pipe(
          map((response: any) => {
            return CartActions.clearCartSuccess({
              response: response?.data?.clearCart,
            });
          }),
          catchError((error: any) => of(CartActions.clearCartFailure({ error: error.message })))
        )
      )
    );
  });

  saveCart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CartActions.saveCart),
      mergeMap((action) =>
        this.cartService.saveCart$(action.products, action.email).pipe(
          map((result: any) => {
            const response = result?.data?.saveCart;
            return CartActions.saveCartSuccess({
              response: response.message,
              success: response.success,
            });
          }),
          catchError((error: any) => of(CartActions.saveCartFailure({ error: error.message })))
        )
      )
    );
  });

  // addToCart$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(CartActions.addToCart),
  //     mergeMap((action) =>
  //       this.cartService.addToCart$(action.product).pipe(
  //         map((result: any) => {
  //           const response: CartGqlResponse = result?.data?.addToCart;
  //           return CartActions.addToCartSuccess({
  //             response: response,
  //             product: action.product,
  //           });
  //         }),
  //         catchError((error) => of(CartActions.addToCartFailure({ error })))
  //       )
  //     )
  //   );
  // });
}
