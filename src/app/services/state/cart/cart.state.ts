import { CartGqlResponse, ICartItem } from '../../../models/cart.model';

export interface CartState {
  email: string | undefined | null;
  products: ICartItem[];
  currentProduct: ICartItem | undefined;
  error: string;
  response: string;
  isLoading: boolean;
  cartQuantity: number;
  emptyOnLogin: boolean;
}
