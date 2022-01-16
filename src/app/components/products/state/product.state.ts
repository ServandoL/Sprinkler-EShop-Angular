import { ObjectId } from "mongodb";
import { IProduct } from "../../../models/product.model";

export interface ProductState {
  products: IProduct[];
  currentProductId: string | ObjectId | null;
  error: string;
  isLoading: boolean;
}
