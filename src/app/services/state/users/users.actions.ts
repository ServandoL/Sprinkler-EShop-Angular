import { createAction, props } from '@ngrx/store';
import { IUser } from '../../../models/user.model';
import { deleteUserResponse, userResponse } from './users.state';

const CurrentUserAction = '[User] Set Current User';
const ClearCurrentUserAction = '[User] Clear Current User';
const InitCurrnetUserAction = '[User] Initialize Current User';
const LoadCurrentUserSuccessAction = '[User] Load Current User Success';
const LoadCurrentUserFailureAction = '[User] Load Current User Failure';
const LoadUsers = '[User] Load Users';
const GetCurrentUserAction = '[User] Get Current User';
const CreateUserAction = '[User] Create User';
const CreateUserActionResponse = '[User] Create User Response';
const DeleteUserAction = '[User] Delete User';
const DeleteUserActionResponse = '[User] Delete User Response';
const DeleteUserActionFailure = '[User] Delete User Failure';

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
    isAdmin: boolean;
  }>()
);

export const createUserResponse = createAction(
  CreateUserActionResponse,
  props<{ response: userResponse }>()
);

export const createUserFailure = createAction(
  CreateUserActionResponse,
  props<{ error: string }>()
);

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

export const deleteUser = createAction(
  DeleteUserAction,
  props<{ email: string }>()
);

export const deleteUserActionResponse = createAction(
  DeleteUserActionResponse,
  props<{ response: deleteUserResponse }>()
);

export const deleteUserActionFailure = createAction(
  DeleteUserActionFailure,
  props<{ error: string }>()
);
