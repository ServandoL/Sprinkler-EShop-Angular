import { createSelector, createFeatureSelector } from "@ngrx/store";
import { UserState } from "./users.state";

export const getUserFeatureState = createFeatureSelector<UserState>('users');

export const getError = createSelector(
  getUserFeatureState,
  (state) => state.error
);

export const selectUser = createSelector(
  getUserFeatureState,
  (state) => state.user
)

export const clearUser = createSelector(
  getUserFeatureState,
  (state) => state.user
)
export const getUser = createSelector(
  getUserFeatureState,
  (state) => state
)
