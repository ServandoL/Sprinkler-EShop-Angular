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
      ofType(ProductActions.loadProducts),
      mergeMap(() =>
        this.productService.getControllers$("Controllers").pipe(
          map((products) => ProductActions.loadProductsSuccess({ products })),
          catchError((error) =>
            of(ProductActions.loadProductsFailure({ error }))
          )
        )
      )
    );
  });
}
