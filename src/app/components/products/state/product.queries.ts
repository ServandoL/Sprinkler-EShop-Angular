import gql from 'graphql-tag';

export const getControllersQuery = gql`
query Query($category: String) {
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

export const getProductsQuery = gql`
  query Query {
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
  }
`;

export const getProductByIdQuery = gql`
  query Query($id: ID) {
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

export const addProductMutation = gql`
  mutation Mutation(
    $productName: String
    $price: Float
    $category: String
    $brand: String
    $stock: Int
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
  }
`;

export const deleteProductMutation = gql`
  mutation Mutation($id: ID) {
    deleteProduct(_id: $id) {
      message
      success
    }
  }
`;
