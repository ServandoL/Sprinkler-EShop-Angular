import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client';
import { Apollo, ApolloBase } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  AddToCartDocument,
  GetCartDocument,
  RemoveFromCartDocument,
  UpdateCartDocument,
} from '../generated/graphql';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apollo: ApolloBase;
  constructor(private apolloProvider: Apollo) {
    this.apollo = this.apolloProvider.use('SprinklerShop');
  }

  getCart$(user_id: string): Observable<any> {
    return this.apollo
      .watchQuery({
        query: GetCartDocument,
        variables: {
          user_id: user_id,
        },
      })
      .valueChanges.pipe(
        map((result: ApolloQueryResult<any>) => {
          if (result?.errors) {
            throw new HttpErrorResponse({
              error: result.errors.map((error) => error.message).join(', '),
            });
          } else {
            return result?.data?.cart;
          }
        })
      );
  }

  addToCart$(
    user_id: string,
    quantity: number,
    productName: string,
    price: number,
    category: string,
    brand: string,
    stock: number,
    imageUrl: string
  ): Observable<any> {
    return this.apollo.mutate({
      mutation: AddToCartDocument,
      variables: {
        user_id: user_id,
        quantity: quantity,
        productName: productName,
        price: price,
        category: category,
        brand: brand,
        stock: stock,
        imageUrl: imageUrl,
      },
    });
  }

  removeFromCart$(user_id: string, productName: string): Observable<any> {
    return this.apollo.mutate({
      mutation: RemoveFromCartDocument,
      variables: {
        user_id: user_id,
        productName: productName,
      },
    });
  }

  updateCartQuantity(
    user_id: string,
    productName: string,
    quantity: number
  ): Observable<any> {
    return this.apollo.mutate({
      mutation: UpdateCartDocument,
      variables: {
        user_id: user_id,
        productName: productName,
        quantity: quantity,
      },
    });
  }
}
