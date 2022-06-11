import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Apollo, ApolloBase } from 'apollo-angular';
import { map } from 'rxjs/operators';
import {
  IFilter,
  IProduct,
  ProductRequest,
  ProductResponse,
} from '../../models/product.model';
import { Observable } from 'rxjs';
import { ApolloQueryResult } from '@apollo/client/core';
import { GetProductsDocument } from './generated/graphql';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private apollo: ApolloBase;
  constructor(private apolloProvider: Apollo) {
    this.apollo = this.apolloProvider.use('SprinklerShop');
  }

  getProductsByCategory$(request: ProductRequest): Observable<ProductResponse> {
    return this.apollo
      .watchQuery({
        query: GetProductsDocument,
        variables: {
          productRequest: { category: request.category, page: request.page },
        },
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

  // getProductFilters$(): Observable<IFilter> {
  //   return this.apollo
  //     .watchQuery({
  //       query: GetFiltersDocument,
  //     })
  //     .valueChanges.pipe(
  //       map((result: ApolloQueryResult<any>) => {
  //         if (result?.errors) {
  //           throw new HttpErrorResponse({
  //             error: result.errors.map((error) => error.message).join(', '),
  //           });
  //         } else {
  //           const categories = result?.data?.products
  //             .map((element: any) => element.category)
  //             .filter(
  //               (element: any, index: any, array: any) =>
  //                 array.indexOf(element) === index
  //             );
  //           const brands = result?.data?.products
  //             .map((element: any) => element.brand)
  //             .filter(
  //               (element: any, index: any, array: any) =>
  //                 array.indexOf(element) === index
  //             );
  //           const filtered: IFilter = {
  //             categories: categories,
  //             brands: brands,
  //           };
  //           return filtered;
  //         }
  //       })
  //     );
  // }
}
