import { CartState } from '../services/state/cart/cart.state';
import { CheckoutState } from '../services/state/checkout/checkout.state';
import { OrderHistoryState } from '../services/state/orderHistory/orderHistory.state';
import { ProductState } from '../services/state/product/product.state';
import { UserState } from '../services/state/users/users.state';
import { FilterState } from '../services/state/product-filters/filter.state';
export interface AppState {
  cart: CartState | undefined;
  checkout: CheckoutState | undefined;
  orderHistory: OrderHistoryState | undefined;
  products: ProductState | undefined;
  users: UserState | undefined;
  productFilters: FilterState | undefined;
}

export interface GenericResponse {
  message: string;
  success: boolean;
}
