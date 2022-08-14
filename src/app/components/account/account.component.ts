import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getUser } from '../../services/state/users/users.selectors';
import { AppState } from '../../models/AppState';
import { IUser } from '../../models/user.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent {
  user$: Observable<IUser>;

  constructor(private store: Store<AppState>) {
    this.user$ = this.store.select(getUser);
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
}
