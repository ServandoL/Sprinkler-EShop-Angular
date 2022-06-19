import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import * as FilterActions from './filter.actions';
import { FilterService } from './filter.service';

@Injectable()
export class FilterEffects {
  constructor(
    private actions$: Actions,
    private filterService: FilterService
  ) {}
  loadFilters$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FilterActions.loadProductFilters),
      mergeMap((action) =>
        this.filterService.getFilters$(action.request).pipe(
          map(
            (response) =>
              FilterActions.loadProductFiltersSuccess({
                response: response,
              }),
            catchError((error) =>
              of(FilterActions.loadProductFiltersFailure({ error }))
            )
          )
        )
      )
    );
  });
}
