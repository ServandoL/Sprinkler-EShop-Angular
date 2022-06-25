import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserState } from '../../../services/state/users/users.state';
import * as UserActions from '../../../services/state/users/users.actions';
import {
  getError,
  getUser,
  getUserLoading,
} from '../../../services/state/users/users.selectors';
import { IUser } from '../../../models/user.model';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.css'],
})
export class DeleteAccountComponent implements OnInit, OnDestroy {
  currentUser!: IUser;
  user$!: Observable<IUser>;
  isLoading$!: Observable<boolean>;
  error$!: Observable<string>;
  subscriptions: Subscription[] = [];
  constructor(private store: Store<UserState>) {
    this.user$ = this.store.select(getUser);
    this.isLoading$ = this.store.select(getUserLoading);
    this.error$ = this.store.select(getError);
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.user$.subscribe((user) => (this.currentUser = user))
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  deleteAccount() {
    this.store.dispatch(UserActions.deleteUser({ _id: this.currentUser._id }));
  }
}
