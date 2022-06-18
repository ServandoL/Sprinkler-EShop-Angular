export interface ICartItem {
  _id: string;
  email: string | undefined | null;
  productName: string;
  price: number;
  category: string;
  brand: string;
  stock: number;
  imageUrl: string | undefined;
  quantity: number;
  __typename?: string;
}

export interface CartGqlResponse {
  message: string;
  success: false;
}

export interface GetCartResponse {
  cart: ICartItem[];
  user_id: string;
  createdDate: Date;
}
