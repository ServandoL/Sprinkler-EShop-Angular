import { CartState } from '../services/state/cart/cart.state';
import { CheckoutState } from '../services/state/checkout/checkout.state';
import { OrderHistoryState } from '../services/state/orderHistory/orderHistory.state';
import { ProductState } from '../services/state/product/product.state';
import { UserState } from '../services/state/users/users.state';

// export interface AppState {
//   user: IUser | undefined;
//   product: IProduct | undefined;
//   filter: IFilter | undefined;
//   cart: ICartItem | undefined;
//   order: Order | undefined;
//   orderHistory: OrderHistory | undefined;
// }

export interface AppState {
  cart: CartState;
  checkOut: CheckoutState;
  orderHistory: OrderHistoryState;
  product: ProductState;
  user: UserState;
}

export interface GenericResponse {
  message: string;
  success: boolean;
}
