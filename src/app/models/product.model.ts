import { ObjectId } from 'mongodb';

export interface IProduct {
  _id: string | ObjectId | null;
  productName: string;
  price: number;
  category: string;
  brand: string;
  stock: number;
  imageUrl?: string;
  isDeleted?: boolean;
  deleted_by?: string;
  deleted_date?: string;
}

export interface ICategory {
  category: string;
}

export interface IBrand {
  brand: string;
}
