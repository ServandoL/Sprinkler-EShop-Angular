import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Apollo, ApolloBase } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApolloQueryResult, FetchResult } from '@apollo/client/core';
import {
  AddProductMutation,
  DeleteProductMutation,
  FilteredProductsQuery,
  GetProductFiltersQuery,
  GetProductsQuery,
  ReviewProductMutation,
  UpdateProductMutation,
} from './product.schema';
import {
  AddProductRequest,
  DeleteProductRequest,
  ProductRequest,
  ProductResponse,
  ReviewRequest,
  UpdateProductRequest,
} from '../../../models/product.model';
import { Mutation } from './__generated__/Mutation';
import { FindProductInput } from '../__generated__/globalTypes';
import {
  GetFilteredProductQuery,
  GetFilteredProductQueryVariables,
} from './__generated__/GetFilteredProductQuery';
import { FilteredProductUIMapper } from './product.mapper';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private apollo: ApolloBase;
  constructor(private apolloProvider: Apollo) {
    this.apollo = this.apolloProvider.use('SprinklerShop');
  }

  getProductsByCategory$(request: ProductRequest): Observable<ProductResponse> {
    return this.apollo
      .query({
        query: GetProductsQuery,
        variables: {
          productRequest: { category: request.category, page: request.page },
        },
        fetchPolicy: 'no-cache',
      })
      .pipe(
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

  getFilteredProduct$(request: GetFilteredProductQueryVariables): Observable<ProductResponse> {
    return this.apollo
      .query<GetFilteredProductQuery>({
        query: FilteredProductsQuery,
        variables: request,
      })
      .pipe(
        map((result: ApolloQueryResult<GetFilteredProductQuery>) => {
          if (result.errors) {
            throw new HttpErrorResponse({
              error: result.errors.map((error) => error.message).join(', '),
            });
          } else {
            return FilteredProductUIMapper(result.data.findProducts);
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

  reviewProduct$(request: ReviewRequest): Observable<FetchResult<Mutation>> {
    return this.apollo.mutate({
      mutation: ReviewProductMutation,
      variables: {
        reviewRequest: request,
      },
    });
  }
}
