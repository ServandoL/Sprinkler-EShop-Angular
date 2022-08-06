import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Apollo, ApolloBase } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApolloQueryResult } from '@apollo/client/core';
import {
  AddProductMutation,
  DeleteProductMutation,
  GetProductFiltersQuery,
  GetProductsQuery,
  UpdateProductMutation,
} from './product.schema';
import {
  AddProductRequest,
  DeleteProductRequest,
  ProductRequest,
  ProductResponse,
  UpdateProductRequest,
} from '../../../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private apollo: ApolloBase;
  constructor(private apolloProvider: Apollo) {
    this.apollo = this.apolloProvider.use('SprinklerShop');
  }

  getProductsByCategory$(request: ProductRequest): Observable<ProductResponse> {
    return this.apollo
      .watchQuery({
        query: GetProductsQuery,
        variables: {
          productRequest: { category: request.category, page: request.page },
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
            return result?.data?.products;
          }
        })
      );
  }

  deleteProduct$(request: DeleteProductRequest): Observable<any> {
    return this.apollo.mutate({
      mutation: DeleteProductMutation,
      variables: {
        deleteRequest: request,
      },
    });
  }

  addProduct$(request: AddProductRequest): Observable<any> {
    return this.apollo.mutate({
      mutation: AddProductMutation,
      variables: {
        addProductRequest: request,
      },
    });
  }

  updateProduct$(request: UpdateProductRequest): Observable<any> {
    return this.apollo.mutate({
      mutation: UpdateProductMutation,
      variables: {
        updateRequest: request,
      },
    });
  }

  getProductFilters$(request: string[]): Observable<any> {
    return this.apollo.mutate({
      mutation: GetProductFiltersQuery,
      variables: {
        filterRequest: {
          filters: request,
        },
      },
    });
  }
}
