import { Order } from './checkout.model';
export interface OrderHistory {
  orders: Order[];
  email: string;
}
