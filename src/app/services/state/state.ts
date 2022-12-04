import { ActionReducerMap } from '@ngrx/store';
import { cartReducer, InitialCartState } from './cart/cart.reducers';
import { CartState } from './cart/cart.state';
import { checkoutReducer, InitialCheckoutState } from './checkout/checkout.reducers';
import { CheckoutState } from './checkout/checkout.state';
import {
  InitialOrderHistoryState,
  orderHistoryReducer,
} from './orderHistory/orderHistory.reducers';
import { OrderHistoryState } from './orderHistory/orderHistory.state';
import { filterReducer, InitialFilterState } from './product-filters/filter.reducers';
import { FilterState } from './product-filters/filter.state';
import { InitialProductState, productReducer } from './product/product.reducers';
import { ProductState } from './product/product.state';
import { searchCriteriaReducer } from './product/searchCriteria/searchCriteria.reducers';
import {
  InitialSearchCriteriaState,
  SearchCriteriaState,
} from './product/searchCriteria/searchCriteria.state';
import { InitialUserState, userReducer } from './users/users.reducers';
import { UserState } from './users/users.state';

export interface AppState {
  cart: CartState;
  checkout: CheckoutState;
  orderHistory: OrderHistoryState;
  products: ProductState;
  users: UserState;
  productFilters: FilterState;
  searchCriteria: SearchCriteriaState;
}

export const reducers: ActionReducerMap<AppState> = {
  cart: cartReducer,
  checkout: checkoutReducer,
  orderHistory: orderHistoryReducer,
  products: productReducer,
  users: userReducer,
  productFilters: filterReducer,
  searchCriteria: searchCriteriaReducer,
};

export const initialState: AppState = {
  cart: InitialCartState,
  checkout: InitialCheckoutState,
  orderHistory: InitialOrderHistoryState,
  products: InitialProductState,
  users: InitialUserState,
  productFilters: InitialFilterState,
  searchCriteria: InitialSearchCriteriaState,
};
