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
        rating
        ratings {
          name
          review
          rate
          headLine
          createdDate
        }
        __typename
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
        __typename
      }
      __typename
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

export const UpdateProductMutation = gql`
  mutation updateProduct($updateRequest: UpdateProductRequest) {
    updateProduct(updateRequest: $updateRequest) {
      message
      success
    }
  }
`;

export const GetProductFiltersQuery = gql`
  query getFilters($filterRequest: FilterInput) {
    getFilters(filterRequest: $filterRequest) {
      brands
      categories
    }
  }
`;

export const ReviewProductMutation = gql`
  mutation Mutation($reviewRequest: ReviewRequest) {
    reviewProduct(reviewRequest: $reviewRequest) {
      message
      success
    }
  }
`;
