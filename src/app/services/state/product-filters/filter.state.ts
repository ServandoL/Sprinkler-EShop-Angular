import { ICategory, IBrand } from "../../../models/product.model";

export interface FilterState {
  categories: ICategory[];
  brands: IBrand[];
  error: string;
}
