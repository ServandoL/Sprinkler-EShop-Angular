import { Store } from '@ngrx/store';
import { State } from '../../models/AppState';
import { ICartItem } from '../../models/cart.model';
import { IProduct } from '../../models/product.model';
import * as CartActions from '../../services/state/cart/cart.actions';

export function addToCartFunction(
  product: IProduct,
  qty: number,
  validated: boolean,
  store: Store<State>
) {
  const cartItem: ICartItem = {
    user_id:
      sessionStorage.getItem('SessionUser') ||
      sessionStorage.getItem('SessionAdmin'),
    productName: product.productName,
    stock: product.stock,
    quantity: qty,
    price: product.price,
    brand: product.brand,
    category: product.category,
    imageUrl: product.imageUrl,
  };
  if (validated) {
    store.dispatch(CartActions.addToCart({ product: cartItem }));
  }
}
