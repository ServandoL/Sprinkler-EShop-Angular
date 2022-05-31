import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';
import { Apollo, ApolloBase, QueryRef } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GetCartResponse, ICartItem } from '../../../models/cart.model';
import {
  AddToCartDocument,
  GetCartDocument,
  RemoveFromCartDocument,
  SaveCartDocument,
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

  getCart$(user_id: string | null): Observable<GetCartResponse> {
    return this.apollo
      .watchQuery({
        query: GetCartDocument,
        variables: {
          userId: user_id,
        },
      })
      .valueChanges.pipe(
        map((result: ApolloQueryResult<any>) => {
          if (result?.errors) {
            throw new HttpErrorResponse({
              error: result.errors.map((error) => error.message).join(', '),
            });
          } else {
            return result?.data?.cart as GetCartResponse;
          }
        })
      );
  }

  addToCart$(product: ICartItem): Observable<any> {
    return this.apollo.mutate({
      mutation: AddToCartDocument,
      variables: {
        userId: product.user_id,
        quantity: product.quantity,
        productName: product.productName,
        price: product.price,
        category: product.category,
        brand: product.brand,
        stock: product.stock,
        imageUrl: product.imageUrl,
      },
    });
  }

  saveCart$(cart: ICartItem[], email: string): Observable<any> {
    return this.apollo.mutate({
      mutation: SaveCartDocument,
      variables: {
        cart: {
          cart: cart,
          user_id: email,
        },
      },
    });
  }

  removeFromCart$(
    user_id: string | null,
    productName: string
  ): Observable<any> {
    return this.apollo.mutate({
      mutation: RemoveFromCartDocument,
      variables: {
        userId: user_id,
        productName: productName,
      },
    });
  }

  updateCartQuantity(
    user_id: string | null,
    productName: string,
    quantity: number
  ): Observable<any> {
    return this.apollo.mutate({
      mutation: UpdateCartDocument,
      variables: {
        userId: user_id,
        productName: productName,
        quantity: quantity,
      },
    });
  }
}
