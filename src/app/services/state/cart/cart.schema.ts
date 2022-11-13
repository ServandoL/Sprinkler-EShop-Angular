import { gql } from 'apollo-angular';

export const GetCartQuery = gql`
  query Query($userId: String) {
    getCart(userId: $userId) {
      cart {
        _id
        email
        productName
        price
        category
        brand
        stock
        imageUrl
        quantity
      }
      email
    }
  }
`;

export const SaveCartMutation = gql`
  mutation saveCart($request: SaveCartRequest) {
    saveCart(request: $request) {
      message
      success
    }
  }
`;

export const AddToCartMutation = gql`
  mutation addToCart($request: AddToCartInput) {
    addToCart(request: $request) {
      message
      success
    }
  }
`;

export const ClearCartMutation = gql`
  mutation clearCart($userId: String) {
    clearCart(userId: $userId) {
      message
      success
    }
  }
`;

export const UpdateCartQuantityMutation = gql`
  mutation updateQuantity($request: CartInput) {
    updateCart(request: $request) {
      message
      success
    }
  }
`;
