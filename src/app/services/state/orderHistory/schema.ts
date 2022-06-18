import { gql } from 'apollo-angular';

export const GetOrderHistoryQuery = gql`
  query getOrderHistory($orderHistoryRequest: OrderHistoryRequest) {
    orders(orderHistoryRequest: $orderHistoryRequest) {
      data {
        _id
        order {
          _id
          productName
          price
          category
          brand
          stock
          imageUrl
          quantity
          email
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
      pagination {
        totalDocs
        limit
        hasPrevPage
        hasNextPage
        page
        totalPages
        offset
        prevPage
        nextPage
        pagingCounter
      }
    }
  }
`;

export const CreateOrderMutation = gql`
  mutation createOrder($request: OrderInput) {
    createOrder(request: $request) {
      message
      success
    }
  }
`;
