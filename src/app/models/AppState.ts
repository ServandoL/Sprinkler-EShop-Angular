import { ICartItem } from './cart.model';
import { IFilter, IProduct } from './product.model';
import { IUser } from './user.model';

export interface AppState {
  user: IUser;
  product: IProduct;
  filter: IFilter;
  cart: ICartItem;
}
