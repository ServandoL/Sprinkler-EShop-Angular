import { createAction, props } from '@ngrx/store';
import { GenericResponse } from '../../../models/AppState';
import { UpdateUserRequest, UserResponse } from '../../../models/user.model';

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
const DeleteUserActionSuccess = '[User] Delete User Success';
const DeleteUserActionFailure = '[User] Delete User Failure';
const ResetUserResponse = '[User] Reset User Response';
const ClearUserState = '[User] Clear User State';
const UpdateUserAction = '[User] Update User';
const UpdateUserActionSuccess = '[User] Update User Success';
const UpdateUserActionFailure = '[User] Update User Failure';
const ResetErrorMessage = '[User] Reset Error Message';

export const resetError = createAction(ResetErrorMessage);
export const updateUser = createAction(
  UpdateUserAction,
  props<{ request: UpdateUserRequest }>()
);

export const updateUserSuccess = createAction(
  UpdateUserActionSuccess,
  props<{ response: GenericResponse }>()
);

export const updateUserFailure = createAction(
  UpdateUserActionFailure,
  props<{ error: string }>()
);

export const clearUserState = createAction(ClearUserState);
export const resetUserResponse = createAction(ResetUserResponse);

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
  props<{ response: UserResponse }>()
);

export const createUserFailure = createAction(
  CreateUserActionResponse,
  props<{ error: string }>()
);

export const clearCurrentUser = createAction(ClearCurrentUserAction);
export const initializeCurrentUser = createAction(InitCurrnetUserAction);
export const loadUserSuccess = createAction(
  LoadCurrentUserSuccessAction,
  props<{ response: UserResponse }>()
);
export const loadUserFailure = createAction(
  LoadCurrentUserFailureAction,
  props<{ error: string }>()
);
export const loadUsers = createAction(LoadUsers);

export const getCurrentUser = createAction(GetCurrentUserAction);

export const deleteUser = createAction(
  DeleteUserAction,
  props<{ _id: string }>()
);

export const deleteUserActionSuccess = createAction(
  DeleteUserActionSuccess,
  props<{ response: GenericResponse }>()
);

export const deleteUserActionFailure = createAction(
  DeleteUserActionFailure,
  props<{ error: string }>()
);
