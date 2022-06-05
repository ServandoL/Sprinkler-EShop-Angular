import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Cart = {
  __typename?: 'Cart';
  _id?: Maybe<Scalars['ID']>;
  brand?: Maybe<Scalars['String']>;
  category?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Float']>;
  productName?: Maybe<Scalars['String']>;
  quantity?: Maybe<Scalars['Int']>;
  stock?: Maybe<Scalars['Int']>;
  user_id?: Maybe<Scalars['String']>;
};

export type CartInput = {
  brand?: InputMaybe<Scalars['String']>;
  category?: InputMaybe<Scalars['String']>;
  imageUrl?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<Scalars['Float']>;
  productName?: InputMaybe<Scalars['String']>;
  quantity?: InputMaybe<Scalars['Int']>;
  stock?: InputMaybe<Scalars['Int']>;
  user_id?: InputMaybe<Scalars['String']>;
};

export type CheckoutRequest = {
  order?: InputMaybe<Order>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addProduct?: Maybe<AddProductResponse>;
  addToCart?: Maybe<AddToCartResponse>;
  addUser?: Maybe<AddUserResponse>;
  checkout?: Maybe<CheckoutResponse>;
  clearCart?: Maybe<RemoveFromCartResponse>;
  deleteProduct?: Maybe<DeleteProductResponse>;
  deleteUser?: Maybe<DeleteUserResponse>;
  saveCart?: Maybe<SaveCartResponse>;
  updateCartQuantity?: Maybe<UpdateCartQuantityResponse>;
};


export type MutationAddProductArgs = {
  brand?: InputMaybe<Scalars['String']>;
  category?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<Scalars['Float']>;
  productName?: InputMaybe<Scalars['String']>;
  stock?: InputMaybe<Scalars['Int']>;
};


export type MutationAddToCartArgs = {
  brand?: InputMaybe<Scalars['String']>;
  category?: InputMaybe<Scalars['String']>;
  imageUrl?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<Scalars['Float']>;
  productName?: InputMaybe<Scalars['String']>;
  quantity?: InputMaybe<Scalars['Int']>;
  stock?: InputMaybe<Scalars['Int']>;
  user_id?: InputMaybe<Scalars['String']>;
};


export type MutationAddUserArgs = {
  email?: InputMaybe<Scalars['String']>;
  fname?: InputMaybe<Scalars['String']>;
  isAdmin?: InputMaybe<Scalars['Boolean']>;
  lname?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
};


export type MutationCheckoutArgs = {
  checkoutRequest?: InputMaybe<Order>;
};


export type MutationClearCartArgs = {
  user_id?: InputMaybe<Scalars['String']>;
};


export type MutationDeleteProductArgs = {
  _id?: InputMaybe<Scalars['ID']>;
};


export type MutationDeleteUserArgs = {
  email?: InputMaybe<Scalars['String']>;
};


export type MutationSaveCartArgs = {
  cart?: InputMaybe<SaveCartRequest>;
};


export type MutationUpdateCartQuantityArgs = {
  productName?: InputMaybe<Scalars['String']>;
  quantity?: InputMaybe<Scalars['Int']>;
  user_id?: InputMaybe<Scalars['String']>;
};

export type Order = {
  email?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<CartInput>>>;
  orderId?: InputMaybe<Scalars['String']>;
  orderedDate?: InputMaybe<Scalars['String']>;
  payment?: InputMaybe<Payment>;
  shipping?: InputMaybe<Shipping>;
  total?: InputMaybe<Scalars['Float']>;
};

export type OrderType = {
  __typename?: 'OrderType';
  _id?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  order?: Maybe<Array<Maybe<Cart>>>;
  orderId?: Maybe<Scalars['String']>;
  orderedDate?: Maybe<Scalars['String']>;
  payment?: Maybe<PaymentType>;
  shipping?: Maybe<ShippingType>;
  total?: Maybe<Scalars['Float']>;
};

export type Payment = {
  cardNumber?: InputMaybe<Scalars['String']>;
  cvv?: InputMaybe<Scalars['String']>;
  month?: InputMaybe<Scalars['String']>;
  year?: InputMaybe<Scalars['String']>;
};

export type PaymentType = {
  __typename?: 'PaymentType';
  cardNumber?: Maybe<Scalars['String']>;
  cvv?: Maybe<Scalars['String']>;
  month?: Maybe<Scalars['String']>;
  year?: Maybe<Scalars['String']>;
};

export type Product = {
  __typename?: 'Product';
  _id: Scalars['ID'];
  brand: Scalars['String'];
  category: Scalars['String'];
  deleted_by?: Maybe<Scalars['String']>;
  deleted_date?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Scalars['String']>;
  isDeleted?: Maybe<Scalars['Boolean']>;
  price: Scalars['Float'];
  productName: Scalars['String'];
  stock: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  cart?: Maybe<GetCartResponse>;
  orders?: Maybe<Array<Maybe<OrderType>>>;
  productById?: Maybe<Product>;
  products?: Maybe<Array<Maybe<Product>>>;
  userById?: Maybe<User>;
  users?: Maybe<Array<Maybe<User>>>;
};


export type QueryCartArgs = {
  user_id?: InputMaybe<Scalars['String']>;
};


export type QueryOrdersArgs = {
  email?: InputMaybe<Scalars['String']>;
};


export type QueryProductByIdArgs = {
  _id?: InputMaybe<Scalars['ID']>;
};


export type QueryProductsArgs = {
  _id?: InputMaybe<Scalars['ID']>;
  brand?: InputMaybe<Scalars['String']>;
  category?: InputMaybe<Scalars['String']>;
  deleted_by?: InputMaybe<Scalars['String']>;
  deleted_date?: InputMaybe<Scalars['String']>;
  isDeleted?: InputMaybe<Scalars['Boolean']>;
  price?: InputMaybe<Scalars['Float']>;
  productName?: InputMaybe<Scalars['String']>;
  stock?: InputMaybe<Scalars['Int']>;
};


export type QueryUserByIdArgs = {
  _id?: InputMaybe<Scalars['ID']>;
};


export type QueryUsersArgs = {
  _id?: InputMaybe<Scalars['ID']>;
  email?: InputMaybe<Scalars['String']>;
  isAdmin?: InputMaybe<Scalars['Boolean']>;
  password?: InputMaybe<Scalars['String']>;
};

export type SaveCartRequest = {
  cart?: InputMaybe<Array<InputMaybe<CartInput>>>;
  user_id?: InputMaybe<Scalars['String']>;
};

export type Shipping = {
  address?: InputMaybe<Scalars['String']>;
  address2?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  state?: InputMaybe<Scalars['String']>;
  zipCode?: InputMaybe<Scalars['String']>;
};

export type ShippingType = {
  __typename?: 'ShippingType';
  address?: Maybe<Scalars['String']>;
  address2?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  zipCode?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID'];
  email: Scalars['String'];
  fname: Scalars['String'];
  isAdmin: Scalars['Boolean'];
  lname: Scalars['String'];
  password: Scalars['String'];
};

export type AddProductResponse = {
  __typename?: 'addProductResponse';
  message?: Maybe<Scalars['String']>;
  product?: Maybe<Product>;
  success?: Maybe<Scalars['Boolean']>;
};

export type AddToCartResponse = {
  __typename?: 'addToCartResponse';
  message?: Maybe<Scalars['String']>;
  product?: Maybe<Cart>;
  success?: Maybe<Scalars['Boolean']>;
};

export type AddUserResponse = {
  __typename?: 'addUserResponse';
  details?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
  user?: Maybe<User>;
};

export type CheckoutResponse = {
  __typename?: 'checkoutResponse';
  message?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type DeleteProductResponse = {
  __typename?: 'deleteProductResponse';
  message?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type DeleteUserResponse = {
  __typename?: 'deleteUserResponse';
  message?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type GetCartResponse = {
  __typename?: 'getCartResponse';
  cart?: Maybe<Array<Maybe<Cart>>>;
  createdDate?: Maybe<Scalars['String']>;
  user_id?: Maybe<Scalars['String']>;
};

export type RemoveFromCartResponse = {
  __typename?: 'removeFromCartResponse';
  message?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type SaveCartResponse = {
  __typename?: 'saveCartResponse';
  message?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type UpdateCartQuantityResponse = {
  __typename?: 'updateCartQuantityResponse';
  message?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type CreateProductMutationVariables = Exact<{
  productName?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<Scalars['Float']>;
  category?: InputMaybe<Scalars['String']>;
  brand?: InputMaybe<Scalars['String']>;
  stock?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['ID']>;
}>;


export type CreateProductMutation = { __typename?: 'Mutation', addProduct?: { __typename?: 'addProductResponse', message?: string | null | undefined, success?: boolean | null | undefined, product?: { __typename?: 'Product', deleted_by?: string | null | undefined, deleted_date?: string | null | undefined, isDeleted?: boolean | null | undefined, imageUrl?: string | null | undefined, stock: number, brand: string, category: string, price: number, productName: string, _id: string } | null | undefined } | null | undefined };

export type DeleteProductMutationVariables = Exact<{
  id?: InputMaybe<Scalars['ID']>;
}>;


export type DeleteProductMutation = { __typename?: 'Mutation', deleteProduct?: { __typename?: 'deleteProductResponse', message?: string | null | undefined, success?: boolean | null | undefined } | null | undefined };

export type GetProductByBrandQueryVariables = Exact<{
  brand?: InputMaybe<Scalars['String']>;
}>;


export type GetProductByBrandQuery = { __typename?: 'Query', products?: Array<{ __typename?: 'Product', _id: string, productName: string, deleted_date?: string | null | undefined, deleted_by?: string | null | undefined, isDeleted?: boolean | null | undefined, imageUrl?: string | null | undefined, stock: number, brand: string, category: string, price: number } | null | undefined> | null | undefined };

export type GetProductByCategoryQueryVariables = Exact<{
  category?: InputMaybe<Scalars['String']>;
}>;


export type GetProductByCategoryQuery = { __typename?: 'Query', products?: Array<{ __typename?: 'Product', _id: string, productName: string, deleted_date?: string | null | undefined, deleted_by?: string | null | undefined, isDeleted?: boolean | null | undefined, imageUrl?: string | null | undefined, stock: number, brand: string, category: string, price: number } | null | undefined> | null | undefined };

export type GetProductByIdQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']>;
}>;


export type GetProductByIdQuery = { __typename?: 'Query', products?: Array<{ __typename?: 'Product', _id: string, productName: string, deleted_date?: string | null | undefined, deleted_by?: string | null | undefined, isDeleted?: boolean | null | undefined, imageUrl?: string | null | undefined, stock: number, brand: string, category: string, price: number } | null | undefined> | null | undefined };

export type GetAllProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllProductsQuery = { __typename?: 'Query', products?: Array<{ __typename?: 'Product', _id: string, productName: string, deleted_date?: string | null | undefined, deleted_by?: string | null | undefined, isDeleted?: boolean | null | undefined, imageUrl?: string | null | undefined, stock: number, brand: string, category: string, price: number } | null | undefined> | null | undefined };

export type GetFiltersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFiltersQuery = { __typename?: 'Query', products?: Array<{ __typename?: 'Product', category: string, brand: string } | null | undefined> | null | undefined };

export type GetUserQueryVariables = Exact<{
  email?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
}>;


export type GetUserQuery = { __typename?: 'Query', users?: Array<{ __typename?: 'User', fname: string, lname: string, email: string, isAdmin: boolean } | null | undefined> | null | undefined };

export type CreateUserMutationVariables = Exact<{
  fname?: InputMaybe<Scalars['String']>;
  lname?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  isAdmin?: InputMaybe<Scalars['Boolean']>;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', addUser?: { __typename?: 'addUserResponse', message?: string | null | undefined, success?: boolean | null | undefined, details?: string | null | undefined, user?: { __typename?: 'User', fname: string, lname: string, email: string, password: string, isAdmin: boolean } | null | undefined } | null | undefined };

export type DeleteUserMutationVariables = Exact<{
  email?: InputMaybe<Scalars['String']>;
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser?: { __typename?: 'deleteUserResponse', message?: string | null | undefined, success?: boolean | null | undefined } | null | undefined };

export type AddToCartMutationVariables = Exact<{
  userId?: InputMaybe<Scalars['String']>;
  quantity?: InputMaybe<Scalars['Int']>;
  productName?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<Scalars['Float']>;
  category?: InputMaybe<Scalars['String']>;
  brand?: InputMaybe<Scalars['String']>;
  stock?: InputMaybe<Scalars['Int']>;
  imageUrl?: InputMaybe<Scalars['String']>;
}>;


export type AddToCartMutation = { __typename?: 'Mutation', addToCart?: { __typename?: 'addToCartResponse', message?: string | null | undefined, success?: boolean | null | undefined, product?: { __typename?: 'Cart', user_id?: string | null | undefined, productName?: string | null | undefined, price?: number | null | undefined, category?: string | null | undefined, brand?: string | null | undefined, stock?: number | null | undefined, imageUrl?: string | null | undefined, quantity?: number | null | undefined } | null | undefined } | null | undefined };

export type UpdateCartMutationVariables = Exact<{
  userId?: InputMaybe<Scalars['String']>;
  productName?: InputMaybe<Scalars['String']>;
  quantity?: InputMaybe<Scalars['Int']>;
}>;


export type UpdateCartMutation = { __typename?: 'Mutation', updateCartQuantity?: { __typename?: 'updateCartQuantityResponse', message?: string | null | undefined, success?: boolean | null | undefined } | null | undefined };

export type SaveCartMutationVariables = Exact<{
  cart?: InputMaybe<SaveCartRequest>;
}>;


export type SaveCartMutation = { __typename?: 'Mutation', saveCart?: { __typename?: 'saveCartResponse', message?: string | null | undefined, success?: boolean | null | undefined } | null | undefined };

export type GetCartQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['String']>;
}>;


export type GetCartQuery = { __typename?: 'Query', cart?: { __typename?: 'getCartResponse', user_id?: string | null | undefined, createdDate?: string | null | undefined, cart?: Array<{ __typename?: 'Cart', user_id?: string | null | undefined, productName?: string | null | undefined, price?: number | null | undefined, category?: string | null | undefined, brand?: string | null | undefined, stock?: number | null | undefined, imageUrl?: string | null | undefined, quantity?: number | null | undefined } | null | undefined> | null | undefined } | null | undefined };

export type ClearCartMutationVariables = Exact<{
  userId?: InputMaybe<Scalars['String']>;
}>;


export type ClearCartMutation = { __typename?: 'Mutation', clearCart?: { __typename?: 'removeFromCartResponse', message?: string | null | undefined, success?: boolean | null | undefined } | null | undefined };

export type CheckoutMutationVariables = Exact<{
  checkoutRequest?: InputMaybe<Order>;
}>;


export type CheckoutMutation = { __typename?: 'Mutation', checkout?: { __typename?: 'checkoutResponse', success?: boolean | null | undefined, message?: string | null | undefined } | null | undefined };

export type OrdersQueryVariables = Exact<{
  email?: InputMaybe<Scalars['String']>;
}>;


export type OrdersQuery = { __typename?: 'Query', orders?: Array<{ __typename?: 'OrderType', _id?: string | null | undefined, email?: string | null | undefined, orderedDate?: string | null | undefined, total?: number | null | undefined, orderId?: string | null | undefined, order?: Array<{ __typename?: 'Cart', user_id?: string | null | undefined, productName?: string | null | undefined, price?: number | null | undefined, category?: string | null | undefined, brand?: string | null | undefined, stock?: number | null | undefined, imageUrl?: string | null | undefined, quantity?: number | null | undefined } | null | undefined> | null | undefined, shipping?: { __typename?: 'ShippingType', address?: string | null | undefined, address2?: string | null | undefined, city?: string | null | undefined, state?: string | null | undefined, zipCode?: string | null | undefined } | null | undefined, payment?: { __typename?: 'PaymentType', cardNumber?: string | null | undefined, month?: string | null | undefined, year?: string | null | undefined, cvv?: string | null | undefined } | null | undefined } | null | undefined> | null | undefined };

export const CreateProductDocument = gql`
    mutation createProduct($productName: String, $price: Float, $category: String, $brand: String, $stock: Int, $id: ID) {
  addProduct(
    productName: $productName
    price: $price
    category: $category
    brand: $brand
    stock: $stock
  ) {
    message
    success
    product {
      deleted_by
      deleted_date
      isDeleted
      imageUrl
      stock
      brand
      category
      price
      productName
      _id
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateProductGQL extends Apollo.Mutation<CreateProductMutation, CreateProductMutationVariables> {
    document = CreateProductDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteProductDocument = gql`
    mutation deleteProduct($id: ID) {
  deleteProduct(_id: $id) {
    message
    success
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteProductGQL extends Apollo.Mutation<DeleteProductMutation, DeleteProductMutationVariables> {
    document = DeleteProductDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetProductByBrandDocument = gql`
    query getProductByBrand($brand: String) {
  products(brand: $brand) {
    _id
    productName
    deleted_date
    deleted_by
    isDeleted
    imageUrl
    stock
    brand
    category
    price
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetProductByBrandGQL extends Apollo.Query<GetProductByBrandQuery, GetProductByBrandQueryVariables> {
    document = GetProductByBrandDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetProductByCategoryDocument = gql`
    query getProductByCategory($category: String) {
  products(category: $category) {
    _id
    productName
    deleted_date
    deleted_by
    isDeleted
    imageUrl
    stock
    brand
    category
    price
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetProductByCategoryGQL extends Apollo.Query<GetProductByCategoryQuery, GetProductByCategoryQueryVariables> {
    document = GetProductByCategoryDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetProductByIdDocument = gql`
    query getProductById($id: ID) {
  products(_id: $id) {
    _id
    productName
    deleted_date
    deleted_by
    isDeleted
    imageUrl
    stock
    brand
    category
    price
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetProductByIdGQL extends Apollo.Query<GetProductByIdQuery, GetProductByIdQueryVariables> {
    document = GetProductByIdDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetAllProductsDocument = gql`
    query getAllProducts {
  products {
    _id
    productName
    deleted_date
    deleted_by
    isDeleted
    imageUrl
    stock
    brand
    category
    price
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetAllProductsGQL extends Apollo.Query<GetAllProductsQuery, GetAllProductsQueryVariables> {
    document = GetAllProductsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetFiltersDocument = gql`
    query getFilters {
  products {
    category
    brand
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetFiltersGQL extends Apollo.Query<GetFiltersQuery, GetFiltersQueryVariables> {
    document = GetFiltersDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetUserDocument = gql`
    query getUser($email: String, $password: String) {
  users(email: $email, password: $password) {
    fname
    lname
    email
    isAdmin
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetUserGQL extends Apollo.Query<GetUserQuery, GetUserQueryVariables> {
    document = GetUserDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateUserDocument = gql`
    mutation createUser($fname: String, $lname: String, $email: String, $password: String, $isAdmin: Boolean) {
  addUser(
    fname: $fname
    lname: $lname
    email: $email
    password: $password
    isAdmin: $isAdmin
  ) {
    message
    success
    user {
      fname
      lname
      email
      password
      isAdmin
    }
    details
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateUserGQL extends Apollo.Mutation<CreateUserMutation, CreateUserMutationVariables> {
    document = CreateUserDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteUserDocument = gql`
    mutation deleteUser($email: String) {
  deleteUser(email: $email) {
    message
    success
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteUserGQL extends Apollo.Mutation<DeleteUserMutation, DeleteUserMutationVariables> {
    document = DeleteUserDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const AddToCartDocument = gql`
    mutation addToCart($userId: String, $quantity: Int, $productName: String, $price: Float, $category: String, $brand: String, $stock: Int, $imageUrl: String) {
  addToCart(
    user_id: $userId
    quantity: $quantity
    productName: $productName
    price: $price
    category: $category
    brand: $brand
    stock: $stock
    imageUrl: $imageUrl
  ) {
    message
    success
    product {
      user_id
      productName
      price
      category
      brand
      stock
      imageUrl
      quantity
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class AddToCartGQL extends Apollo.Mutation<AddToCartMutation, AddToCartMutationVariables> {
    document = AddToCartDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateCartDocument = gql`
    mutation updateCart($userId: String, $productName: String, $quantity: Int) {
  updateCartQuantity(
    user_id: $userId
    productName: $productName
    quantity: $quantity
  ) {
    message
    success
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateCartGQL extends Apollo.Mutation<UpdateCartMutation, UpdateCartMutationVariables> {
    document = UpdateCartDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const SaveCartDocument = gql`
    mutation saveCart($cart: SaveCartRequest) {
  saveCart(cart: $cart) {
    message
    success
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SaveCartGQL extends Apollo.Mutation<SaveCartMutation, SaveCartMutationVariables> {
    document = SaveCartDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetCartDocument = gql`
    query getCart($userId: String) {
  cart(user_id: $userId) {
    cart {
      user_id
      productName
      price
      category
      brand
      stock
      imageUrl
      quantity
    }
    user_id
    createdDate
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetCartGQL extends Apollo.Query<GetCartQuery, GetCartQueryVariables> {
    document = GetCartDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ClearCartDocument = gql`
    mutation clearCart($userId: String) {
  clearCart(user_id: $userId) {
    message
    success
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ClearCartGQL extends Apollo.Mutation<ClearCartMutation, ClearCartMutationVariables> {
    document = ClearCartDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CheckoutDocument = gql`
    mutation checkout($checkoutRequest: Order) {
  checkout(checkoutRequest: $checkoutRequest) {
    success
    message
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CheckoutGQL extends Apollo.Mutation<CheckoutMutation, CheckoutMutationVariables> {
    document = CheckoutDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const OrdersDocument = gql`
    query orders($email: String) {
  orders(email: $email) {
    _id
    order {
      user_id
      productName
      price
      category
      brand
      stock
      imageUrl
      quantity
    }
    shipping {
      address
      address2
      city
      state
      zipCode
    }
    payment {
      cardNumber
      month
      year
      cvv
    }
    email
    orderedDate
    total
    orderId
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class OrdersGQL extends Apollo.Query<OrdersQuery, OrdersQueryVariables> {
    document = OrdersDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }