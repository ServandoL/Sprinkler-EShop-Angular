import { createReducer, on } from '@ngrx/store';
import { UserState } from './users.state';
import * as UserActions from './users.actions';

const initialState: UserState = {
  user: {
    _id: '',
    fname: '',
    lname: '',
    email: '',
    isAdmin: false,
  },
  loggedIn: false,
  error: '',
  isLoading: false,
  userResponse: null,
  genericResponse: null,
};

export const userReducer = createReducer<UserState>(
  initialState,
  on(UserActions.updateUser, (state): UserState => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(UserActions.updateUserSuccess, (state, action): UserState => {
    return {
      ...state,
      isLoading: false,
      genericResponse: action.response,
      error: '',
    };
  }),
  on(UserActions.updateUserFailure, (state, action): UserState => {
    return {
      ...state,
      isLoading: false,
      error: action.error,
    };
  }),
  on(UserActions.clearUserState, (): UserState => {
    return {
      ...initialState,
    };
  }),
  on(UserActions.resetUserResponse, (state): UserState => {
    return { ...state, genericResponse: null };
  }),
  on(UserActions.resetError, (state): UserState => {
    return {
      ...state,
      error: '',
    };
  }),
  on(UserActions.deleteUser, (state): UserState => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(UserActions.deleteUserActionSuccess, (state, action): UserState => {
    return {
      ...state,
      isLoading: false,
    };
  }),
  on(UserActions.deleteUserActionFailure, (state, action): UserState => {
    return {
      ...state,
      isLoading: false,
      error: action.error,
    };
  }),
  on(UserActions.getCurrentUser, (state): UserState => {
    return {
      ...state,
    };
  }),
  on(UserActions.createUser, (state, action): UserState => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(UserActions.createUserResponse, (state, action): UserState => {
    return {
      ...state,
      userResponse: action.response,
      isLoading: false,
    };
  }),
  on(UserActions.initializeCurrentUser, (state): UserState => {
    return {
      ...state,
    };
  }),
  on(UserActions.setCurrentUser, (state, action): UserState => {
    return {
      ...state,
      user: state.user,
      isLoading: true,
      loggedIn: true,
    };
  }),
  on(UserActions.loadUserSuccess, (state, action): UserState => {
    return {
      ...state,
      user: action.response.user,
      error: '',
      isLoading: false,
    };
  }),
  on(UserActions.loadUserFailure, (state, action): UserState => {
    return {
      ...state,
      error: action.error,
      isLoading: false,
    };
  }),
  on(UserActions.clearCurrentUser, (state): UserState => {
    return {
      ...initialState,
    };
  }),
  on(UserActions.logout, (state): UserState => {
    return {
      ...initialState,
      isLoading: true,
    };
  }),
  on(UserActions.logoutSuccess, (state): UserState => {
    return {
      ...initialState,
    };
  })
);
