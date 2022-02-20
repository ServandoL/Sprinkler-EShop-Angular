import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserState } from '../../../services/state/users/users.state';
import * as UserActions from '../../../services/state/users/users.actions';
import { deleteUser, getUserFeatureState } from '../../../services/state/users/users.selectors';
import { IUser } from '../../../models/user.model';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.css'],
})
export class DeleteAccountComponent implements OnInit {
  constructor(private store: Store<UserState>) {}

  ngOnInit(): void {
    this.user$.subscribe((user) => (this.currentUser = user.user));
  }

  currentUser!: IUser;

  user$ = this.store.select(getUserFeatureState);
  message$ = this.store.select(deleteUser)

  deleteAccount() {
    this.store.dispatch(
      UserActions.deleteUser({ email: this.currentUser.email })
    );
  }
}
