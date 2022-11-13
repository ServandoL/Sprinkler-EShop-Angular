/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface AddProductRequest {
  productName: string;
  price: number;
  category: string;
  brand: string;
  stock: number;
  imageUrl?: string | null;
  createdBy: string;
}

export interface AddToCartInput {
  _id?: string | null;
  userId?: string | null;
  quantity?: number | null;
  productName?: string | null;
  price?: number | null;
  category?: string | null;
  brand?: string | null;
  stock?: number | null;
  imageUrl?: string | null;
}

export interface AddUserInput {
  fname?: string | null;
  lname?: string | null;
  email?: string | null;
  password?: string | null;
  isAdmin?: boolean | null;
}

export interface CartInput {
  _id?: string | null;
  email?: string | null;
  productName?: string | null;
  price?: number | null;
  category?: string | null;
  brand?: string | null;
  stock?: number | null;
  imageUrl?: string | null;
  quantity?: number | null;
  userId?: string | null;
}

export interface DeleteProductItem {
  _id: string;
  productName?: string | null;
  price?: number | null;
  category?: string | null;
  brand?: string | null;
  stock?: number | null;
  imageUrl?: string | null;
}

export interface DeleteRequest {
  product?: DeleteProductItem | null;
  email?: string | null;
}

export interface FilterInput {
  filters?: (string | null)[] | null;
}

export interface OrderHistoryRequest {
  userId?: string | null;
  page?: Page | null;
}

export interface OrderInput {
  userId?: string | null;
  email?: string | null;
  order?: (CartInput | null)[] | null;
  shipping?: ShippingInput | null;
  payment?: PaymentInput | null;
  total?: number | null;
}

export interface Page {
  pageSize?: number | null;
  pageNumber?: number | null;
}

export interface PaymentInput {
  cardNumber?: string | null;
  month?: string | null;
  year?: string | null;
  cvv?: string | null;
}

export interface ProductInput {
  productName?: string | null;
  price?: number | null;
  category?: string | null;
  brand?: string | null;
  stock?: number | null;
  isDeleted?: boolean | null;
  deleted_by?: string | null;
  deleted_date?: string | null;
  page?: Page | null;
}

export interface ReviewRequest {
  productId: string;
  name?: string | null;
  review?: string | null;
  headLine?: string | null;
  rate?: number | null;
  createdDate?: string | null;
}

export interface SaveCartRequest {
  cart?: (CartInput | null)[] | null;
  userId?: string | null;
}

export interface ShippingInput {
  address?: string | null;
  address2?: string | null;
  city?: string | null;
  state?: string | null;
  zipCode?: string | null;
}

export interface UpdateProductRequest {
  productId?: string | null;
  modifiedBy?: string | null;
  modifiedDate?: string | null;
  productName?: string | null;
  price?: number | null;
  stock?: number | null;
  imageUrl?: string | null;
}

export interface UpdateUserInput {
  _id: string;
  currentPassword: string;
  email?: string | null;
  newPassword?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
