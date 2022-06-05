import { Order } from '../../../models/checkout.model';
import { OrderHistory } from '../../../models/orderHistory.model';

export interface OrderHistoryState {
  user_id: string | undefined;
  orders: Order[] | undefined;
  error: string;
  response: string;
  isLoading: boolean;
}
