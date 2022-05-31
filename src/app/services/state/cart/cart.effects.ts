import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CartService } from './cart.service';
import * as CartActions from './cart.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  CartGqlResponse,
  GetCartResponse,
  ICartItem,
} from '../../../models/cart.model';
import { AppState } from '../../../models/AppState';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class CartEffects {
  constructor(
    private actions$: Actions,
    private cartService: CartService,
    private store: Store<AppState>
  ) {}

  loadCart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CartActions.loadCart),
      mergeMap((action) =>
        this.cartService.getCart$(action.user_id).pipe(
          map((response: GetCartResponse) => {
            console.log('effects', response);
            return CartActions.loadCartSuccess({ response: response });
          }),
          catchError((error) => of(CartActions.loadCartFailure({ error })))
        )
      )
    );
  });

  saveCart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CartActions.saveCart),
      mergeMap((action) =>
        this.cartService.saveCart$(action.products, action.user_id).pipe(
          map((result: any) => {
            const response = result?.data?.saveCart;
            return CartActions.saveCartSuccess({
              response: response.message,
              success: response.success,
            });
          }),
          catchError((error: unknown) =>
            of(CartActions.saveCartFailure({ error }))
          )
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
