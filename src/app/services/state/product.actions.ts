import { createAction, props } from '@ngrx/store';
import { IProduct } from '../../models/product.model';
import { ObjectId } from 'mongodb';

const CurrentProductAction = '[Product] Set Current Product';
const ClearProductAction = '[Product] Clear Current Product';
const InitCurrentProductAction = '[Product] Initialize Current Product';
const LoadProductsAction = '[Product] Load Products';
const LoadControllersAction = '[Product] Load Controllers';
const LoadRotorsAction = '[Product] Load Rotors';
const LoadValvesAction = '[Product] Load Valves';
const LoadSprinklerBodiesAction = '[Product] Load Sprinkler Bodies';
const LoadSprinklerNozzlesAction = '[Product] Load Sprinkler Nozzles';


const LoadProductsSuccessAction = '[Product] Load Success';
const LoadProductsFailureAction = '[Product] Load Failure';
const UpdateProductAction = '[Product] Update Product';
const UpdateProductSuccessAction = '[Product] Update Product Success';
const UpdateProductFailureAction = '[Product] Update Product Fail';
const AddProductAction = '[Product] Add New Product';
const AddNewProductSuccessAction = '[Product] Add New Product Success';
const AddNewProductFailureAction = '[Product] Add New Product Failure';
const DeleteProductAction = '[Product] Delete Product';
const DeleteProductActionSuccess = '[Product] Delete Product Success';
const DeleteProductActionFailure = '[Product] Delete Product Failure';

export const setCurrentProduct = createAction(
  CurrentProductAction,
  props<{ currentProductId: string | ObjectId | null }>()
);

export const clearCurrentProduct = createAction(ClearProductAction);

export const initializeCurrentProduct = createAction(InitCurrentProductAction);

export const loadProducts = createAction(LoadProductsAction);

export const loadControllers = createAction(LoadControllersAction);

export const loadRotors = createAction(LoadRotorsAction);

export const loadValves = createAction(LoadValvesAction);

export const loadSprinklerBodies = createAction(LoadSprinklerBodiesAction);

export const loadSprinklerNozzles = createAction(LoadSprinklerNozzlesAction);

export const loadProductsSuccess = createAction(
  LoadProductsSuccessAction,
  props<{ products: IProduct[] }>()
);

export const loadProductsFailure = createAction(
  LoadProductsFailureAction,
  props<{ error: string }>()
);

export const updateProduct = createAction(
  UpdateProductAction,
  props<{ product: IProduct }>()
);

// action for the successfull completion of the operation - it will dispatch from the reducer if the save from the back-end server was successfull
export const updateProductSuccess = createAction(
  UpdateProductSuccessAction,
  props<{ product: IProduct }>()
);

// action for an error or failure - it will dispatch from the reducer if the save from the back-end server was not successfull
export const updateProductFailure = createAction(
  UpdateProductFailureAction,
  props<{ error: string }>()
);

export const addNewProduct = createAction(
  AddProductAction,
  props<{ product: IProduct }>()
);

export const addNewProductSuccess = createAction(
  AddNewProductSuccessAction,
  props<{ product: IProduct }>()
);

export const addNewProductFailure = createAction(
  AddNewProductFailureAction,
  props<{ error: string }>()
);

export const deleteProduct = createAction(
  DeleteProductAction,
  props<{ productId: string | ObjectId | null }>()
);

export const deleteProductSuccess = createAction(
  DeleteProductActionSuccess,
  props<{ productId: string | ObjectId | null}>()
);

export const deleteProductFailure = createAction(
  DeleteProductActionFailure,
  props<{ error: string }>()
);
