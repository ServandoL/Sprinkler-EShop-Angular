import { Order } from '../../../models/checkout.model';

export interface CheckoutState {
  user_id: string | null;
  order: Order | undefined;
  error: string | undefined;
  response: string;
  isLoading: boolean;
  success: boolean | undefined;
}
