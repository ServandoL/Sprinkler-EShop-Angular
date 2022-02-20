import { createAction, props } from '@ngrx/store';
import { IUser } from '../../../models/user.model';

const CurrentUserAction = '[User] Set Current User';
const ClearCurrentUserAction = '[User] Clear Current User';
const InitCurrnetUserAction = '[User] Initialize Current User';
const LoadCurrentUserSuccessAction = '[User] Load Current User Success';
const LoadCurrentUserFailureAction = '[User] Load Current User Failure';
const LoadUsers = '[User] Load Users';
const GetCurrentUserAction = '[User] Get Current User';
const CreateUserAction = '[User] Create User';
const CreateUserActionSuccess = '[User] Create User Success';
const CreateUserActionFailure = '[User] Create User Failure';

export const setCurrentUser = createAction(
  CurrentUserAction,
  props<{ email: string; password: string }>()
);

export const createUser = createAction(
  CreateUserAction,
  props<{
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    isAdming: boolean;
  }>()
);

export const createUserSuccess = createAction(
  CreateUserActionSuccess,
  props<{ message: string, success: boolean }>()
)

export const CreateUserFailure = createAction(
  CreateUserActionFailure,
  props<{ error: string }>()
)

export const clearCurrentUser = createAction(ClearCurrentUserAction);
export const initializeCurrentUser = createAction(InitCurrnetUserAction);
export const loadUserSuccess = createAction(
  LoadCurrentUserSuccessAction,
  props<{ user: IUser }>()
);
export const loadUserFailure = createAction(
  LoadCurrentUserFailureAction,
  props<{ error: string }>()
);
export const loadUsers = createAction(LoadUsers);

export const getCurrentUser = createAction(GetCurrentUserAction);
