import { Order } from '../../../models/checkout.model';
import { Pagination } from '../../../models/pagination.model';

export interface OrderHistoryState {
  user_id: string | undefined;
  orders: Order[] | undefined;
  page: Pagination;
  error: string;
  response: string;
  isLoading: boolean;
}
