import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  getError,
  getUserFeatureState,
  selectUser,
} from '../../../services/state/users/users.selectors';
import { AuthService } from '../../../utils/auth/auth-service.service';
import * as UserActions from '../../../services/state/users/users.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit{
  constructor(
    private authService: AuthService,
    private store: Store
  ) {}

  returnUrl!: string;

  user$ = this.store.select(getUserFeatureState);
  errorMessage$ = this.store.select(getError);

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

  ngOnInit(): void {
    this.authService.logout();
  }

  login(formValues: FormGroup) {
    this.store.dispatch(
      UserActions.setCurrentUser({
        email: formValues.controls['userName'].value,
        password: formValues.controls['password'].value,
      })
    );
  }
}
