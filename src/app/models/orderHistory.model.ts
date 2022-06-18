import { Order } from './checkout.model';
import { Pagination } from './pagination.model';
export interface OrderHistory {
  orders: Order[];
  email: string;
}

export interface OrderHistoryRequest {
  email: string;
  page: {
    pageSize: number;
    pageNumber: number;
  };
}

export interface OrderHistoryResponse {
  data: Order[];
  pagination: Pagination;
}
