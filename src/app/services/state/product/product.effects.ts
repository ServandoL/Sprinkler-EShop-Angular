import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ProductActions from './product.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ProductService } from './product.service';

@Injectable()
export class ProductEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}

  loadProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.loadProducts),
      mergeMap((action) =>
        this.productService.getProductsByCategory$(action.request).pipe(
          map((response) => ProductActions.loadProductsSuccess({ response })),
          catchError((error) =>
            of(ProductActions.loadProductsFailure({ error }))
          )
        )
      )
    );
  });

  deleteProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.deleteProduct),
      mergeMap((action) =>
        this.productService.deleteProduct$(action.request).pipe(
          map(
            (response) =>
              ProductActions.deleteProductSuccess({
                response: response.data.deleteProduct,
              }),
            catchError((error) =>
              of(ProductActions.deleteProductFailure({ error }))
            )
          )
        )
      )
    );
  });

  addProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.addNewProduct),
      mergeMap((action) =>
        this.productService.addProduct$(action.request).pipe(
          map((response) =>
            ProductActions.addNewProductSuccess({
              response: response.data.addProduct,
            })
          ),
          catchError((error) =>
            of(ProductActions.addNewProductFailure({ error }))
          )
        )
      )
    );
  });

  updateProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.updateProduct),
      mergeMap((action) =>
        this.productService.updateProduct$(action.request).pipe(
          map(
            (response) =>
              ProductActions.updateProductSuccess({
                response: response.data.updateProduct,
              }),
            catchError((error) =>
              of(ProductActions.updateProductFailure({ error }))
            )
          )
        )
      )
    );
  });
}
