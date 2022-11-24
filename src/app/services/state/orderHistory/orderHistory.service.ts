import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';
import { Apollo, ApolloBase } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrderHistoryRequest, OrderHistoryResponse } from '../../../models/orderHistory.model';
import { GetOrderHistoryQuery } from './schema';

@Injectable({
  providedIn: 'root',
})
export class OrderHistoryService {
  private apollo: ApolloBase;
  constructor(private apolloProvider: Apollo) {
    this.apollo = this.apolloProvider.use('SprinklerShop');
  }

  getOrders$(request: OrderHistoryRequest): Observable<OrderHistoryResponse> {
    return this.apollo
      .query({
        query: GetOrderHistoryQuery,
        variables: {
          orderHistoryRequest: {
            userId: request.userId,
            page: request.page,
          },
          fetchPolicy: 'no-cache',
        },
      })
      .pipe(
        map((result: ApolloQueryResult<any>) => {
          if (result?.errors) {
            throw new HttpErrorResponse({
              error: result.errors.map((error) => error.message).join(', '),
            });
          } else {
            return result?.data?.orders as OrderHistoryResponse;
          }
        })
      );
  }
}
