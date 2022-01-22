import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Mutation = {
  __typename?: 'Mutation';
  addProduct?: Maybe<AddProductResponse>;
  addUser?: Maybe<AddUserResponse>;
  deleteProduct?: Maybe<DeleteProductResponse>;
  deleteUser?: Maybe<DeleteUserResponse>;
};

export type MutationAddProductArgs = {
  brand?: InputMaybe<Scalars['String']>;
  category?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<Scalars['Float']>;
  productName?: InputMaybe<Scalars['String']>;
  stock?: InputMaybe<Scalars['Int']>;
};

export type MutationAddUserArgs = {
  email?: InputMaybe<Scalars['String']>;
  fname?: InputMaybe<Scalars['String']>;
  isAdmin?: InputMaybe<Scalars['Boolean']>;
  lname?: InputMaybe<Scalars['String']>;
};

export type MutationDeleteProductArgs = {
  _id?: InputMaybe<Scalars['ID']>;
};

export type MutationDeleteUserArgs = {
  _id?: InputMaybe<Scalars['ID']>;
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
  productById?: Maybe<Product>;
  products?: Maybe<Array<Maybe<Product>>>;
  userById?: Maybe<User>;
  users?: Maybe<Array<Maybe<User>>>;
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
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID'];
  email: Scalars['String'];
  fname: Scalars['String'];
  isAdmin: Scalars['Boolean'];
  lname: Scalars['String'];
};

export type AddProductResponse = {
  __typename?: 'addProductResponse';
  message?: Maybe<Scalars['String']>;
  product?: Maybe<Product>;
  success?: Maybe<Scalars['Boolean']>;
};

export type AddUserResponse = {
  __typename?: 'addUserResponse';
  message?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
  user?: Maybe<User>;
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

export type CreateProductMutationVariables = Exact<{
  productName?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<Scalars['Float']>;
  category?: InputMaybe<Scalars['String']>;
  brand?: InputMaybe<Scalars['String']>;
  stock?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['ID']>;
}>;

export type CreateProductMutation = {
  __typename?: 'Mutation';
  addProduct?:
    | {
        __typename?: 'addProductResponse';
        message?: string | null | undefined;
        success?: boolean | null | undefined;
        product?:
          | {
              __typename?: 'Product';
              deleted_by?: string | null | undefined;
              deleted_date?: string | null | undefined;
              isDeleted?: boolean | null | undefined;
              imageUrl?: string | null | undefined;
              stock: number;
              brand: string;
              category: string;
              price: number;
              productName: string;
              _id: string;
            }
          | null
          | undefined;
      }
    | null
    | undefined;
};

export type DeleteProductMutationVariables = Exact<{
  id?: InputMaybe<Scalars['ID']>;
}>;

export type DeleteProductMutation = {
  __typename?: 'Mutation';
  deleteProduct?:
    | {
        __typename?: 'deleteProductResponse';
        message?: string | null | undefined;
        success?: boolean | null | undefined;
      }
    | null
    | undefined;
};

export type GetProductByBrandQueryVariables = Exact<{
  brand?: InputMaybe<Scalars['String']>;
}>;

export type GetProductByBrandQuery = {
  __typename?: 'Query';
  products?:
    | Array<
        | {
            __typename?: 'Product';
            _id: string;
            productName: string;
            deleted_date?: string | null | undefined;
            deleted_by?: string | null | undefined;
            isDeleted?: boolean | null | undefined;
            imageUrl?: string | null | undefined;
            stock: number;
            brand: string;
            category: string;
            price: number;
          }
        | null
        | undefined
      >
    | null
    | undefined;
};

export type GetProductByCategoryQueryVariables = Exact<{
  category?: InputMaybe<Scalars['String']>;
}>;

export type GetProductByCategoryQuery = {
  __typename?: 'Query';
  products?:
    | Array<
        | {
            __typename?: 'Product';
            _id: string;
            productName: string;
            deleted_date?: string | null | undefined;
            deleted_by?: string | null | undefined;
            isDeleted?: boolean | null | undefined;
            imageUrl?: string | null | undefined;
            stock: number;
            brand: string;
            category: string;
            price: number;
          }
        | null
        | undefined
      >
    | null
    | undefined;
};

export type GetProductByIdQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']>;
}>;

export type GetProductByIdQuery = {
  __typename?: 'Query';
  products?:
    | Array<
        | {
            __typename?: 'Product';
            _id: string;
            productName: string;
            deleted_date?: string | null | undefined;
            deleted_by?: string | null | undefined;
            isDeleted?: boolean | null | undefined;
            imageUrl?: string | null | undefined;
            stock: number;
            brand: string;
            category: string;
            price: number;
          }
        | null
        | undefined
      >
    | null
    | undefined;
};

export type GetAllProductsQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllProductsQuery = {
  __typename?: 'Query';
  products?:
    | Array<
        | {
            __typename?: 'Product';
            _id: string;
            productName: string;
            deleted_date?: string | null | undefined;
            deleted_by?: string | null | undefined;
            isDeleted?: boolean | null | undefined;
            imageUrl?: string | null | undefined;
            stock: number;
            brand: string;
            category: string;
            price: number;
          }
        | null
        | undefined
      >
    | null
    | undefined;
};

export type GetFiltersQueryVariables = Exact<{ [key: string]: never }>;

export type GetFiltersQuery = {
  __typename?: 'Query';
  products?:
    | Array<
        | { __typename?: 'Product'; category: string; brand: string }
        | null
        | undefined
      >
    | null
    | undefined;
};

export const CreateProductDocument = gql`
  mutation createProduct(
    $productName: String
    $price: Float
    $category: String
    $brand: String
    $stock: Int
    $id: ID
  ) {
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
  providedIn: 'root',
})
export class CreateProductGQL extends Apollo.Mutation<
  CreateProductMutation,
  CreateProductMutationVariables
> {
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
  providedIn: 'root',
})
export class DeleteProductGQL extends Apollo.Mutation<
  DeleteProductMutation,
  DeleteProductMutationVariables
> {
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
  providedIn: 'root',
})
export class GetProductByBrandGQL extends Apollo.Query<
  GetProductByBrandQuery,
  GetProductByBrandQueryVariables
> {
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
  providedIn: 'root',
})
export class GetProductByCategoryGQL extends Apollo.Query<
  GetProductByCategoryQuery,
  GetProductByCategoryQueryVariables
> {
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
  providedIn: 'root',
})
export class GetProductByIdGQL extends Apollo.Query<
  GetProductByIdQuery,
  GetProductByIdQueryVariables
> {
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
  providedIn: 'root',
})
export class GetAllProductsGQL extends Apollo.Query<
  GetAllProductsQuery,
  GetAllProductsQueryVariables
> {
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
  providedIn: 'root',
})
export class GetFiltersGQL extends Apollo.Query<
  GetFiltersQuery,
  GetFiltersQueryVariables
> {
  document = GetFiltersDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
