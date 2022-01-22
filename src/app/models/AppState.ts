import { IFilter, IProduct } from "./product.model";
import { IUser } from "./user.model";

export interface State {
  user: IUser,
  product: IProduct,
  filter: IFilter
}
