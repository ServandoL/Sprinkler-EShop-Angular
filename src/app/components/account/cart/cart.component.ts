import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../models/AppState';
import { getCartFeatureState } from '../../../services/state/cart/cart.reducers';
import { getCart } from '../../../services/state/cart/cart.selectors';
import { CartService } from '../../../services/state/cart/cart.service';
import * as CartActions from '../../../services/state/cart/cart.actions';
import { ICartItem } from '../../../models/cart.model';
import { Apollo, ApolloBase, QueryRef } from 'apollo-angular';
import { GetCartDocument } from '../../../services/state/generated/graphql';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
  private apollo: ApolloBase;
  constructor(
    private store: Store<AppState>,
    public cartService: CartService,
    private apolloProvider: Apollo
  ) {
    this.apollo = this.apolloProvider.use('SprinklerShop');
  }

  subscriptions: Subscription[] = [];
  cart$ = this.store.select(getCart);
  cartLoading$ = this.store.select(getCartFeatureState);
  getCartQuery!: QueryRef<any>;
  success!: boolean | undefined;
  tax = 0.0825;
  subtotal!: number;
  length!: number;

  ngOnInit(): void {
    this.store.dispatch(
      CartActions.loadCart({
        user_id:
          sessionStorage.getItem('SessionUser') ||
          sessionStorage.getItem('SessionAdmin'),
      })
    );
    this.getCartQuery = this.apollo.watchQuery({
      query: GetCartDocument,
    });
    this.subscriptions.push(
      this.cart$.subscribe((state) => {
        this.length = state.length;
      })
    );
    this.subscriptions.push(
      this.cartLoading$.subscribe((state) => {
        this.success = state.response?.success;
        if (this.success) {
          this.refresh();
        }
      })
    );
    this.subscriptions.push(
      this.cart$.subscribe((state) => {
        this.subtotal = 0;
        state.forEach((item) => {
          this.subtotal += item.price * item.quantity;
        });
      })
    );
  }

  refresh() {
    this.getCartQuery.refetch({
      userId:
        sessionStorage.getItem('SessionUser') ||
        sessionStorage.getItem('SessionAdmin'),
    });
  }

  updateQuantity(value: number, product: ICartItem) {
    this.store.dispatch(
      CartActions.updateProductQuantity({ product: product, quantity: value })
    );
  }

  onUpdate(qty: number, product: ICartItem) {
    this.subtotal = 0;
    this.store.dispatch(
      CartActions.updateCart({ product: product, quantity: qty })
    );
  }

  onRemove(product: ICartItem) {
    this.subtotal = 0;
    this.store.dispatch(CartActions.deleteFromCart({ product: product }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
