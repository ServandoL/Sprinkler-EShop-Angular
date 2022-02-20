import { createAction, props } from '@ngrx/store';
import { IUser } from '../../../models/user.model';
import { userResponse } from './users.state';

const CurrentUserAction = '[User] Set Current User';
const ClearCurrentUserAction = '[User] Clear Current User';
const InitCurrnetUserAction = '[User] Initialize Current User';
const LoadCurrentUserSuccessAction = '[User] Load Current User Success';
const LoadCurrentUserFailureAction = '[User] Load Current User Failure';
const LoadUsers = '[User] Load Users';
const GetCurrentUserAction = '[User] Get Current User';
const CreateUserAction = '[User] Create User';
const CreateUserActionResponse = '[User] Create User Response';

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
)

export const createUserFailure = createAction(
  CreateUserActionResponse,
  props<{ error: string}>()
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
