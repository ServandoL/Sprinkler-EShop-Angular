import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getUserFeatureState } from '../../services/state/users/users.selectors';
import { UserState } from '../../services/state/users/users.state';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  constructor(private store: Store<UserState>) { }

  user$ = this.store.select(getUserFeatureState);

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {
  }

}
