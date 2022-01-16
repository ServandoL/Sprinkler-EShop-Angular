import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Apollo, ApolloBase } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { IProduct } from '../../../models/product.model';
import { Observable } from 'rxjs';
import {
  GetProductByCategoryDocument,
  GetProductByCategoryQuery,
} from './generated/graphql';
import { ApolloQueryResult } from '@apollo/client/core';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private apollo: ApolloBase;
  constructor(private httpClient: HttpClient, private apolloProvider: Apollo) {
    this.apollo = this.apolloProvider.use('SprinklerShop');
  }

  getProductsByCategory$(category: string): Observable<IProduct[]> {
    return this.apollo
      .watchQuery({
        query: GetProductByCategoryDocument,
        variables: { category: category },
      })
      .valueChanges.pipe(
        map((result: ApolloQueryResult<any>) => {
          if (result?.errors) {
            throw new HttpErrorResponse({
              error: result.errors.map((error) => error.message).join(', '),
            });
          } else {
            return result?.data?.products;
          }
        })
      );
  }

}
