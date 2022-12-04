import { ProductRequest } from '../../../../models/product.model';
import { InitProductInput, ProductInputState } from '../../../../models/SearchCriteria.model';

export interface SearchCriteriaState {
  criteria: ProductInputState;
}

export const InitialSearchCriteriaState: SearchCriteriaState = {
  criteria: {
    ...InitProductInput,
  },
};
