import { createSelector, createFeatureSelector } from '@ngrx/store';
import { UserState } from './users.state';

export const getUserFeatureState = createFeatureSelector<UserState>('users');

export const getError = createSelector(
  getUserFeatureState,
  (state) => state.error
);
export const getUser = createSelector(
  getUserFeatureState,
  (state) => state.user
);
export const userResponse = createSelector(
  getUserFeatureState,
  (state) => state.userResponse
);

export const getUserLoading = createSelector(
  getUserFeatureState,
  (state) => state.isLoading
);

export const getUpdateSuccessMessage = createSelector(
  getUserFeatureState,
  (state) => state.userResponse?.message
);
