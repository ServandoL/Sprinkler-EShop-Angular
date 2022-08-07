import { ICartItem } from '../../../models/cart.model';

export interface CartState {
  userId: string | undefined | null;
  products: ICartItem[];
  currentProduct: ICartItem | undefined;
  error: string;
  response: string;
  isLoading: boolean;
  cartQuantity: number;
  emptyOnLogin: boolean;
  success: boolean;
}
