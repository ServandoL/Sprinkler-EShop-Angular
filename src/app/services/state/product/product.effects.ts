import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import * as ProductActions from './product.actions';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { ProductService } from './product.service';
import { Store } from '@ngrx/store';
import { ProductRequest } from '../../../models/product.model';
import { FindProductInput } from '../__generated__/globalTypes';
import { AppState } from '../state';

@Injectable()
export class ProductEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductService,
    private store: Store<AppState>
  ) {}

  loadProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.loadProducts),
      concatLatestFrom(() => this.store),
      mergeMap(([action, latest]) => {
        const { __typename, ...filters } = latest.searchCriteria.criteria;
        const request: FindProductInput = { ...filters };
        return this.productService.getFilteredProduct$({ filterRequest: request }).pipe(
          map((response) => ProductActions.loadProductsSuccess({ response })),
          catchError((error) => of(ProductActions.loadProductsFailure({ error })))
        );
      })
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
            catchError((error) => of(ProductActions.deleteProductFailure({ error })))
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
          catchError((error) => of(ProductActions.addNewProductFailure({ error })))
        )
      )
    );
  });

  updateProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.updateProduct),
      mergeMap((action) =>
        this.productService.updateProduct$(action.request).pipe(
          map((response) =>
            ProductActions.updateProductSuccess({
              response: response.data.updateProduct,
            })
          ),
          catchError((error) => {
            return of(ProductActions.updateProductFailure({ error: JSON.stringify(error) }));
          })
        )
      )
    );
  });

  reviewProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.submitReview),
      mergeMap((action) =>
        this.productService.reviewProduct$(action.review).pipe(
          map((response) => {
            if (response.data?.reviewProduct) {
              return ProductActions.submitReviewSuccess({ response: response.data.reviewProduct });
            } else {
              return ProductActions.submitReviewFailure({ error: response.errors });
            }
          }),
          catchError((error) =>
            of(ProductActions.submitReviewFailure({ error: JSON.stringify(error) }))
          )
        )
      )
    );
  });
}
