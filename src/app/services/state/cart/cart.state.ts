import { CartGqlResponse, ICartItem } from '../../../models/cart.model';

export interface CartState {
  user_id: string | null;
  products: ICartItem[];
  currentProduct: ICartItem | null;
  error: string;
  response: CartGqlResponse | null;
  isLoading: boolean;
  cartQuantity: number;
}
