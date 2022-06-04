import { Order } from '../../../models/checkout.model';

export interface CheckoutState {
  user_id: string | null;
  order: Order | undefined;
  error: string;
  response: string;
  isLoading: boolean;
}
