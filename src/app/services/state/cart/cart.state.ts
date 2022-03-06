import { CartGqlResponse, ICartItem } from '../../../models/cart.model';

export interface CartState {
  user_id: string;
  products: ICartItem[];
  currentProduct: ICartItem | null;
  error: string;
  response: CartGqlResponse | null;
  isLoading: boolean;
}
