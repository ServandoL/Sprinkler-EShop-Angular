import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../models/AppState';
import { UpdateUserRequest } from '../../../models/user.model';
import * as UserActions from '../users/users.actions';

@Injectable({ providedIn: 'root' })
export class UserAppService {
  constructor(private store: Store<AppState>) {}

  getCurrentUser() {
    this.store.dispatch(UserActions.getCurrentUser());
  }

  deleteAccount(_id: string) {
    this.store.dispatch(UserActions.deleteUser({ _id }));
  }

  clearCurrentUser() {
    this.store.dispatch(UserActions.clearCurrentUser());
  }

  setCurrentUser(email: string, password: string) {
    this.store.dispatch(UserActions.setCurrentUser({ email, password }));
  }

  resetUserResponse() {
    this.store.dispatch(UserActions.resetUserResponse());
  }

  resetErrorMessage() {
    this.store.dispatch(UserActions.resetError());
  }

  createUser(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    isAdmin: boolean
  ) {
    this.store.dispatch(
      UserActions.createUser({ firstName, lastName, email, password, isAdmin })
    );
  }

  updateUserInformation(request: UpdateUserRequest) {
    this.store.dispatch(UserActions.updateUser({ request }));
  }
}
