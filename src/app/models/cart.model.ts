import { ObjectId } from 'mongodb';
import { IProduct } from './product.model';

export interface ICart {
  _id: ObjectId;
  user_id: string;
  quantity: number;
  products: IProduct[];
}
