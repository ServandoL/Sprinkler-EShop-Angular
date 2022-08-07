import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';
import { Apollo, ApolloBase } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GetCartResponse, ICartItem } from '../../../models/cart.model';
import { Order } from '../../../models/checkout.model';
import { CreateOrderMutation } from '../orderHistory/schema';
import {
  AddToCartMutation,
  ClearCartMutation,
  GetCartQuery,
  SaveCartMutation,
  UpdateCartQuantityMutation,
} from './cart.schema';

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
        query: GetCartQuery,
        variables: {
          email: user_id,
        },
      })
      .valueChanges.pipe(
        map((result: ApolloQueryResult<any>) => {
          if (result?.errors) {
            throw new HttpErrorResponse({
              error: result.errors.map((error) => error.message).join(', '),
            });
          } else {
            return result?.data?.getCart as GetCartResponse;
          }
        })
      );
  }

  addToCart$(product: ICartItem): Observable<any> {
    return this.apollo.mutate({
      mutation: AddToCartMutation,
      variables: {
        _id: product._id,
        userId: product.userId,
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

  clearCart$(userId: string): Observable<any> {
    return this.apollo.mutate({
      mutation: ClearCartMutation,
      variables: {
        userId: userId,
      },
    });
  }

  saveCart$(cart: ICartItem[], userId: string): Observable<any> {
    return this.apollo.mutate({
      mutation: SaveCartMutation,
      variables: {
        request: {
          cart: cart,
          userId: userId,
        },
      },
    });
  }

  updateCartQuantity(user_id: string | null, _id: string, quantity: number): Observable<any> {
    return this.apollo.mutate({
      mutation: UpdateCartQuantityMutation,
      variables: {
        _id: _id,
        userId: user_id,
        quantity: quantity,
      },
    });
  }

  checkout$(order: Order): Observable<any> {
    return this.apollo.mutate({
      mutation: CreateOrderMutation,
      variables: {
        request: { ...order },
      },
    });
  }
}
