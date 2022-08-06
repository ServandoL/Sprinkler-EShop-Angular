import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getUserFeatureState } from '../../services/state/users/users.selectors';
import { AppState } from '../../models/AppState';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  user!: string | null;

  constructor(private store: Store<AppState>) {
    this.user =
      sessionStorage.getItem('SessionUser') || sessionStorage.getItem('SessionAdmin') || '';
  }

  user$ = this.store.select(getUserFeatureState);

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {}
}
