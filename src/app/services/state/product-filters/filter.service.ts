import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';
import { Apollo, ApolloBase } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FilterResponse } from '../../../models/product.model';
import { GetProductFiltersQuery } from '../product/product.schema';

@Injectable({ providedIn: 'root' })
export class FilterService {
  private apollo: ApolloBase;
  constructor(private provider: Apollo) {
    this.apollo = this.provider.use('SprinklerShop');
  }

  getFilters$(request: string[]): Observable<FilterResponse> {
    return this.apollo
      .watchQuery({
        query: GetProductFiltersQuery,
        variables: {
          filterRequest: {
            filters: request,
          },
        },
        fetchPolicy: 'no-cache',
      })
      .valueChanges.pipe(
        map((result: ApolloQueryResult<any>) => {
          if (result?.errors) {
            throw new HttpErrorResponse({
              error: result.errors.map((error) => error.message).join(', '),
            });
          } else {
            return result?.data.getFilters as FilterResponse;
          }
        })
      );
  }
}
