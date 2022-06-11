import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductService } from './product.service';
import * as ProductActions from './product.actions';
import * as FilterActions from './product-filters/filter.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class ProductEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}

  // loadFilters$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(FilterActions.loadProductFilter),
  //     mergeMap(() =>
  //       this.productService.getProductFilters$().pipe(
  //         map((filter) => FilterActions.loadFilterSuccess({ filter })),
  //         catchError((error) => of(FilterActions.loadFilterFailure({ error })))
  //       )
  //     )
  //   );
  // });

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
}
