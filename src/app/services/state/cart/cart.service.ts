import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';
import { Apollo, ApolloBase } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ICartItem } from '../../../models/cart.model';
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

  getCart$(user_id: string): Observable<ICartItem[]> {
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

  addToCart$(product: ICartItem): Observable<any> {
    console.log('the product: ', product);
    console.log('the user:', product.user_id);
    return this.apollo.mutate({
      mutation: AddToCartDocument,
      variables: {
        user_id: product.user_id,
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

  removeFromCart$(
    user_id: string | null,
    productName: string
  ): Observable<any> {
    return this.apollo.mutate({
      mutation: RemoveFromCartDocument,
      variables: {
        user_id: user_id,
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
        user_id: user_id,
        productName: productName,
        quantity: quantity,
      },
    });
  }
}
