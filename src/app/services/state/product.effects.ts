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
  ) {
  }

  loadFilters$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FilterActions.loadProductFilter),
      mergeMap(() =>
        this.productService.getProductFilters$().pipe(
          map((filter) => FilterActions.loadFilterSuccess({ filter })),
          catchError((error) => of(FilterActions.loadFilterFailure({ error })))
        )
      )
    );
  });

  loadControllers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.loadControllers),
      mergeMap(() =>
        this.productService.getProductsByCategory$('Controllers').pipe(
          map((products) => ProductActions.loadProductsSuccess({ products })),
          catchError((error) =>
            of(ProductActions.loadProductsFailure({ error }))
          )
        )
      )
    );
  });

  loadRotors$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.loadRotors),
      mergeMap(() =>
        this.productService.getProductsByCategory$('Rotors').pipe(
          map((products) => ProductActions.loadProductsSuccess({ products })),
          catchError((error) =>
            of(ProductActions.loadProductsFailure({ error }))
          )
        )
      )
    );
  });

  loadNozzles$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.loadSprinklerNozzles),
      mergeMap(() =>
        this.productService.getProductsByCategory$('Nozzles').pipe(
          map((products) => ProductActions.loadProductsSuccess({ products })),
          catchError((error) =>
            of(ProductActions.loadProductsFailure({ error }))
          )
        )
      )
    );
  });

  loadSprinklers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.loadSprinklerBodies),
      mergeMap(() =>
        this.productService.getProductsByCategory$('Sprinklers').pipe(
          map((products) => ProductActions.loadProductsSuccess({ products })),
          catchError((error) =>
            of(ProductActions.loadProductsFailure({ error }))
          )
        )
      )
    );
  });

  loadValves$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.loadValves),
      mergeMap(() =>
        this.productService.getProductsByCategory$('Valves').pipe(
          map((products) => ProductActions.loadProductsSuccess({ products })),
          catchError((error) =>
            of(ProductActions.loadProductsFailure({ error }))
          )
        )
      )
    );
  });

  loadAllProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.loadProducts),
      mergeMap(() =>
        this.productService.getAllProducts$().pipe(
          map((products) => ProductActions.loadProductsSuccess({ products })),
          catchError((error) =>
            of(ProductActions.loadProductsFailure({ error }))
          )
        )
      )
    );
  });
}
