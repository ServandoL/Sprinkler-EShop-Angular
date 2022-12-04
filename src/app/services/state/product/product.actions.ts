import { createAction, props } from '@ngrx/store';
import {
  AddProductRequest,
  DeleteProductRequest,
  IProduct,
  ProductRequest,
  ProductResponse,
  UpdateProductRequest,
  Rating,
  ReviewRequest,
} from '../../../models/product.model';
import { ObjectId } from 'mongodb';
import { GenericResponse } from '../../../models/AppState';
import { Mutation_reviewProduct } from './__generated__/Mutation';
import { FindProductInput } from './product.state';
import { GetFilteredProductQuery_findProducts } from './__generated__/GetFilteredProductQuery';

const CurrentProductAction = '[Product] Set Current Product';
const ClearProductAction = '[Product] Clear Current Product';
const InitCurrentProductAction = '[Product] Initialize Current Product';
const LoadProductsAction = '[Product] Load Products';
const LoadAllProductsAction = '[Product] Load All Products';
const LoadProductsSuccessAction = '[Product] Load Success';
const LoadProductsFailureAction = '[Product] Load Failure';
const UpdateProductAction = '[Product] Update Product';
const UpdateProductSuccessAction = '[Product] Update Product Success';
const UpdateProductFailureAction = '[Product] Update Product Fail';
const ResetUpdateResponse = '[Product] Reset Update Success';
const AddProductAction = '[Product] Add New Product';
const AddNewProductSuccessAction = '[Product] Add New Product Success';
const AddNewProductFailureAction = '[Product] Add New Product Failure';
const DeleteProductAction = '[Product] Delete Product';
const DeleteProductActionSuccess = '[Product] Delete Product Success';
const DeleteProductActionFailure = '[Product] Delete Product Failure';
const ResetDeleteResponse = '[Product] Reset Delete Response';
const ResetAddSuccess = '[Product] Reset Add Success';
const ClearProductState = '[Produt] Clear Product State';
const ReviewClicked = '[Product] Review Clicked';
const SubmitReview = '[Product] Submit Review';
const SubmitReviewSuccess = '[Product] Submit Review Success';
const SubmitReviewFailure = '[Product] Submit Review Failure';

export const submitReview = createAction(SubmitReview, props<{ review: ReviewRequest }>());
export const submitReviewSuccess = createAction(
  SubmitReviewSuccess,
  props<{ response: Mutation_reviewProduct }>()
);
export const submitReviewFailure = createAction(SubmitReviewFailure, props<{ error: any }>());

export const reviewClicked = createAction(ReviewClicked, props<{ product: IProduct }>());

export const clearProductState = createAction(ClearProductState);
export const resetAddSuccess = createAction(ResetAddSuccess);

export const resetDeleteResponse = createAction(ResetDeleteResponse);

export const setCurrentProduct = createAction(
  CurrentProductAction,
  props<{ currentProductId: string | ObjectId | null }>()
);

export const resetUpdateResponse = createAction(ResetUpdateResponse);

export const clearCurrentProduct = createAction(ClearProductAction);

export const initializeCurrentProduct = createAction(InitCurrentProductAction);

export const loadProducts = createAction(
  LoadProductsAction,
  props<{ request: ProductRequest | FindProductInput }>()
);

export const loadAllProducts = createAction(
  LoadAllProductsAction,
  props<{ request: ProductRequest }>()
);

export const loadProductsSuccess = createAction(
  LoadProductsSuccessAction,
  props<{ response: ProductResponse }>()
);

export const loadProductsFailure = createAction(
  LoadProductsFailureAction,
  props<{ error: string }>()
);

export const updateProduct = createAction(
  UpdateProductAction,
  props<{ request: UpdateProductRequest }>()
);

// action for the successfull completion of the operation - it will dispatch from the reducer if the save from the back-end server was successfull
export const updateProductSuccess = createAction(
  UpdateProductSuccessAction,
  props<{ response: GenericResponse }>()
);

// action for an error or failure - it will dispatch from the reducer if the save from the back-end server was not successfull
export const updateProductFailure = createAction(
  UpdateProductFailureAction,
  props<{ error: string }>()
);

export const addNewProduct = createAction(
  AddProductAction,
  props<{ request: AddProductRequest }>()
);

export const addNewProductSuccess = createAction(
  AddNewProductSuccessAction,
  props<{ response: GenericResponse }>()
);

export const addNewProductFailure = createAction(
  AddNewProductFailureAction,
  props<{ error: string }>()
);

export const deleteProduct = createAction(
  DeleteProductAction,
  props<{ request: DeleteProductRequest }>()
);

export const deleteProductSuccess = createAction(
  DeleteProductActionSuccess,
  props<{ response: GenericResponse }>()
);

export const deleteProductFailure = createAction(
  DeleteProductActionFailure,
  props<{ error: string }>()
);
