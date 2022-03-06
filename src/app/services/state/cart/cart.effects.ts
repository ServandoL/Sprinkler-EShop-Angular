import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CartService } from './cart.service';
import * as CartActions from './cart.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { CartGqlResponse, ICartItem } from '../../../models/cart.model';

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
          map((products: ICartItem[]) =>
            CartActions.loadCartSuccess({ products })
          ),
          catchError((error) => of(CartActions.loadCartFailure({ error })))
        )
      )
    );
  });

  addToCart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CartActions.addToCart),
      mergeMap((action) =>
        this.cartService.addToCart$(action.product).pipe(
          map((result: any) => {
            console.log('the action:', action.product);
            const response: CartGqlResponse = result?.data?.addToCart;
            return CartActions.addToCartSuccess({ response });
          })
        )
      )
    );
  });

  updateCart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CartActions.updateCart),
      mergeMap((action) =>
        this.cartService
          .updateCartQuantity(
            action.product.user_id,
            action.product.productName,
            action.product.quantity
          )
          .pipe(
            map((result: any) => {
              const response: CartGqlResponse =
                result?.data?.updateCartQuantity;
              return CartActions.updateCartSuccess({ response });
            })
          )
      )
    );
  });

  deleteFromCart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CartActions.deleteFromCart),
      mergeMap((action) =>
        this.cartService
          .removeFromCart$(action.product.user_id, action.product.productName)
          .pipe(
            map((result: any) => {
              const response: CartGqlResponse = result?.data?.removeFromCart;
              return CartActions.deleteFromCartSuccess({ response });
            }),
            catchError((error) =>
              of(CartActions.deleteFromCartFailure({ error }))
            )
          )
      )
    );
  });
}
