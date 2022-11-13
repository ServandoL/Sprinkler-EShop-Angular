/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrderHistoryRequest } from '../../__generated__/globalTypes';

// ====================================================
// GraphQL query operation: getOrderHistory
// ====================================================

export interface getOrderHistory_orders_data_order {
  __typename: 'Cart';
  _id: string | null;
  productName: string | null;
  price: number | null;
  category: string | null;
  brand: string | null;
  stock: number | null;
  imageUrl: string | null;
  quantity: number | null;
  email: string | null;
}

export interface getOrderHistory_orders_data_shipping {
  __typename: 'ShippingType';
  address: string | null;
  address2: string | null;
  city: string | null;
  state: string | null;
  zipCode: string | null;
}

export interface getOrderHistory_orders_data_payment {
  __typename: 'PaymentType';
  cardNumber: string | null;
  month: string | null;
  year: string | null;
  cvv: string | null;
}

export interface getOrderHistory_orders_data {
  __typename: 'OrderType';
  _id: string | null;
  order: (getOrderHistory_orders_data_order | null)[] | null;
  shipping: getOrderHistory_orders_data_shipping | null;
  payment: getOrderHistory_orders_data_payment | null;
  email: string | null;
  orderedDate: string | null;
  total: number | null;
  orderId: string | null;
}

export interface getOrderHistory_orders_pagination {
  __typename: 'Pagination';
  totalDocs: number | null;
  limit: number | null;
  hasPrevPage: boolean | null;
  hasNextPage: boolean | null;
  page: number | null;
  totalPages: number | null;
  offset: number | null;
  prevPage: number | null;
  nextPage: number | null;
  pagingCounter: number | null;
}

export interface getOrderHistory_orders {
  __typename: 'getOrderResponse';
  data: (getOrderHistory_orders_data | null)[] | null;
  pagination: getOrderHistory_orders_pagination | null;
}

export interface getOrderHistory {
  orders: getOrderHistory_orders | null;
}

export interface getOrderHistoryVariables {
  orderHistoryRequest?: OrderHistoryRequest | null;
}
