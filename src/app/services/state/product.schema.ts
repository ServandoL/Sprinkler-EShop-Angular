import { gql } from 'apollo-angular';

export const GetAllProductsQuery = gql`
  query getAllProducts($productRequest: ProductInput) {
    allProducts(productRequest: $productRequest) {
      data {
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

export const GetProductsQuery = gql`
  query products($productRequest: ProductInput) {
    products(productRequest: $productRequest) {
      data {
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

export const DeleteProductMutation = gql`
  mutation deleteProduct($deleteRequest: DeleteRequest) {
    deleteProduct(deleteRequest: $deleteRequest) {
      message
      success
    }
  }
`;

export const AddProductMutation = gql`
  mutation addProduct($addProductRequest: AddProductRequest) {
    addProduct(addProductRequest: $addProductRequest) {
      message
      success
    }
  }
`;
