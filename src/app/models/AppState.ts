import { CartState } from '../services/state/cart/cart.state';
import { CheckoutState } from '../services/state/checkout/checkout.state';
import { OrderHistoryState } from '../services/state/orderHistory/orderHistory.state';
import { ProductState } from '../services/state/product/product.state';
import { UserState } from '../services/state/users/users.state';

export interface AppState {
  cart: CartState | undefined;
  checkOut: CheckoutState | undefined;
  orderHistory: OrderHistoryState | undefined;
  product: ProductState | undefined;
  user: UserState | undefined;
}

export interface GenericResponse {
  message: string;
  success: boolean;
}
