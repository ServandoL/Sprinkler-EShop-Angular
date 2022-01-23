import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  getUser,
  getUserFeatureState,
} from '../../../services/state/users/users.reducers';
import { State } from '../../../models/AppState';
import * as UserActions from '../../../services/state/users/users.actions';
import { IUser } from '../../../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private store: Store<State>) {}

  ngOnInit(): void {
    // this.user$.subscribe((user) => {this.user = user; console.log(user)});
  }

  user$ = this.store.select(getUser);
  userLoading$ = this.store.select(getUserFeatureState);
  user!: IUser;

  loginForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  get userName() {
    return this.loginForm.get('userName');
  }
  get password() {
    return this.loginForm.get('password');
  }

  mouseoverLogin!: boolean;

  login(formValues: FormGroup) {
    this.store.dispatch(
      UserActions.setCurrentUser(formValues.get('userName')?.value)
    );
  }
}
