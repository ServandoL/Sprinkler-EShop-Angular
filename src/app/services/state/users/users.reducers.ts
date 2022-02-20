import { createReducer, on } from '@ngrx/store';
import { UserState } from './users.state';
import * as UserActions from './users.actions';

const initialState: UserState = {
  user: {
    fname: '',
    lname: '',
    email: '',
    isAdmin: false,
  },
  loggedIn: false,
  error: '',
  isLoading: false,
  userResponse: null,
};

export const userReducer = createReducer<UserState>(
  initialState,
  on(UserActions.getCurrentUser, (state): UserState => {
    return {
      ...state,
    };
  }),
  on(UserActions.createUser, (state, action): UserState => {
    return {
      ...state,
      isLoading: true
    };
  }),
  on(UserActions.createUserResponse, (state, action): UserState => {
    return {
      ...state,
      userResponse: action.response,
      isLoading: false
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
      user: action.user,
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
  })
);
