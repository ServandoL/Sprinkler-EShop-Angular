import { ICartItem } from './cart.model';
import { IFilter, IProduct } from './product.model';
import { IUser } from './user.model';

export interface AppState {
  user: IUser | undefined;
  product: IProduct | undefined;
  filter: IFilter | undefined;
  cart: ICartItem | undefined;
}
