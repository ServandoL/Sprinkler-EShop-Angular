import { FindProductInput } from '../services/state/product/product.state';

export type ProductInputState = FindProductInput;

export const InitProductInput: ProductInputState = {
  __typename: 'FindProductInput',
  page: {
    pageNumber: 1,
    pageSize: 8,
  },
};
