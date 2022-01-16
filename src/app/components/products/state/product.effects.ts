import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductService } from './product.service';
import * as ProductActions from './product.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Apollo, ApolloBase } from 'apollo-angular';

@Injectable()
export class ProductEffects {
  private apollo: ApolloBase;
  constructor(
    private actions$: Actions,
    private productService: ProductService,
    private apolloProvider: Apollo
  ) {
    this.apollo = this.apolloProvider.use('SprinklerShop');
  }

  loadControllers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.loadControllers),
      mergeMap(() =>
        this.productService.getProductsByCategory$("Controllers").pipe(
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
        this.productService.getProductsByCategory$("Rotors").pipe(
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
        this.productService.getProductsByCategory$("Nozzles").pipe(
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
        this.productService.getProductsByCategory$("Sprinklers").pipe(
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
        this.productService.getProductsByCategory$("Valves").pipe(
          map((products) => ProductActions.loadProductsSuccess({ products })),
          catchError((error) =>
            of(ProductActions.loadProductsFailure({ error }))
          )
        )
      )
    );
  });
}
