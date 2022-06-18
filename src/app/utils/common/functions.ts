import { Store } from '@ngrx/store';
import { AppState } from '../../models/AppState';
import { ICartItem } from '../../models/cart.model';
import { IProduct } from '../../models/product.model';
import * as CartActions from '../../services/state/cart/cart.actions';

export function addToCartFunction(
  product: IProduct,
  qty: number,
  validated: boolean,
  store: Store<AppState>
) {
  const cartItem: ICartItem = {
    _id: product._id,
    email:
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
