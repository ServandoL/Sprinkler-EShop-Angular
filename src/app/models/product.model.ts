import { ObjectId } from "mongodb";

export interface IProduct {
  _id: String | ObjectId
  productName: String
  price: Number
  category: String
  brand: String
  stock: Number
  imageUrl?: String
  isDeleted?: Boolean
  deleted_by?: String
  deleted_date?: String
}
