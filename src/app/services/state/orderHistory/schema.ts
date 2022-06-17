import { gql } from 'apollo-angular';

export const GetOrderHistoryQuery = gql`
  query getOrders($email: String) {
    orders(email: $email) {
      orders {
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
