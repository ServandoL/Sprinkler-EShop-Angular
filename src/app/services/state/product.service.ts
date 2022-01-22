import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Apollo, ApolloBase } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { IFilter, IProduct } from '../../models/product.model';
import { Observable } from 'rxjs';
import { ApolloQueryResult } from '@apollo/client/core';
import {
  GetProductByCategoryDocument,
  GetAllProductsDocument,
  GetFiltersDocument,
} from './generated/graphql';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private apollo: ApolloBase;
  constructor(private apolloProvider: Apollo) {
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

  getAllProducts$(): Observable<IProduct[]> {
    return this.apollo
      .watchQuery({
        query: GetAllProductsDocument,
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

  getProductFilters$(): Observable<IFilter> {
    return this.apollo
      .watchQuery({
        query: GetFiltersDocument,
      })
      .valueChanges.pipe(
        map((result: ApolloQueryResult<any>) => {
          if (result?.errors) {
            throw new HttpErrorResponse({
              error: result.errors.map((error) => error.message).join(', '),
            });
          } else {
            const categories = result?.data?.products
              .map((element: any) => element.category)
              .filter(
                (element: any, index: any, array: any) =>
                  array.indexOf(element) === index
              );
            const brands = result?.data?.products
              .map((element: any) => element.brand)
              .filter(
                (element: any, index: any, array: any) =>
                  array.indexOf(element) === index
              );
            const filtered: IFilter = {
              categories: categories,
              brands: brands,
            };
            return filtered;
          }
        })
      );
  }
}
