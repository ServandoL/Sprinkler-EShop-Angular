import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import { UserState } from './users.state';
import * as UserActions from './users.actions';
import { IUser } from '../../../models/user.model';

const initialState: UserState = {
  user: [],
  currentUserId: null,
  error: '',
  isLoading: false,
};

export const getUserFeatureState = createFeatureSelector<UserState>('users');

export const getError = createSelector(
  getUserFeatureState,
  (state) => state.error
);

export const getCurrentUserId = createSelector(
  getUserFeatureState,
  (state) => state.currentUserId
);

export const getUser = createSelector(
  getUserFeatureState,
  getCurrentUserId,
  (state, getCurrentUserId) => {
    if (getCurrentUserId === null) {
      let user: IUser = {
        _id: '',
        fname: '',
        lname: '',
        email: '',
        isAdmin: false,
      };
      return user;
    } else {
      return getCurrentUserId
        ? state.user.find((user) => user._id === getCurrentUserId)
        : null;
    }
  }
);

export const userReducer = createReducer<UserState>(
  initialState,
  on(UserActions.initializeCurrentUser, (state) => {
    return {
      ...state,
      currentUserId: null
    };
  }),
  on(UserActions.setCurrentUser, (state, action): UserState => {
    return {
      ...state,
      isLoading: true,
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
      ...state,
      currentUserId: null
    };
  })
);
