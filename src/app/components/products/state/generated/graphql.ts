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

export type MutationMutationVariables = Exact<{
  productName?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<Scalars['Float']>;
  category?: InputMaybe<Scalars['String']>;
  brand?: InputMaybe<Scalars['String']>;
  stock?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['ID']>;
}>;


export type MutationMutation = { __typename?: 'Mutation', addProduct?: { __typename?: 'addProductResponse', message?: string | null | undefined, success?: boolean | null | undefined, product?: { __typename?: 'Product', deleted_by?: string | null | undefined, deleted_date?: string | null | undefined, isDeleted?: boolean | null | undefined, imageUrl?: string | null | undefined, stock: number, brand: string, category: string, price: number, productName: string, _id: string } | null | undefined } | null | undefined, deleteProduct?: { __typename?: 'deleteProductResponse', success?: boolean | null | undefined, message?: string | null | undefined } | null | undefined };

export type QueryQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']>;
}>;


export type QueryQuery = { __typename?: 'Query', products?: Array<{ __typename?: 'Product', _id: string, productName: string, price: number, category: string, brand: string, stock: number, isDeleted?: boolean | null | undefined, imageUrl?: string | null | undefined, deleted_by?: string | null | undefined, deleted_date?: string | null | undefined } | null | undefined> | null | undefined, productById?: { __typename?: 'Product', _id: string, productName: string, price: number, category: string, brand: string, stock: number, imageUrl?: string | null | undefined, isDeleted?: boolean | null | undefined, deleted_by?: string | null | undefined, deleted_date?: string | null | undefined } | null | undefined };

export const MutationDocument = gql`
    mutation Mutation($productName: String, $price: Float, $category: String, $brand: String, $stock: Int, $id: ID) {
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
  deleteProduct(_id: $id) {
    success
    message
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class MutationGQL extends Apollo.Mutation<MutationMutation, MutationMutationVariables> {
    document = MutationDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const QueryDocument = gql`
    query Query($id: ID) {
  products {
    _id
    productName
    price
    category
    brand
    stock
    isDeleted
    imageUrl
    deleted_by
    deleted_date
  }
  productById(_id: $id) {
    _id
    productName
    price
    category
    brand
    stock
    imageUrl
    isDeleted
    deleted_by
    deleted_date
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class QueryGQL extends Apollo.Query<QueryQuery, QueryQueryVariables> {
    document = QueryDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }