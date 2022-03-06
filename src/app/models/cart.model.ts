import { ObjectId } from 'mongodb';

export interface ICartItem {
  user_id: string | null;
  productName: string;
  price: number;
  category: string;
  brand: string;
  stock: number;
  imageUrl: string | undefined;
  quantity: number;
}

export interface CartGqlResponse {
  message: string;
  success: false;
}
