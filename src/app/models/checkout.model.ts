import { ICartItem } from './cart.model';

export interface Shipping {
  address: string;
  address2?: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface CreditCard {
  cardNumber: string;
  month: string;
  year: string;
  cvv: string;
}

export interface Order {
  order: ICartItem[];
  shipping: Shipping;
  payment: CreditCard;
  email: string;
  total: number;
  orderId?: string;
  orderedDate?: string;
}
