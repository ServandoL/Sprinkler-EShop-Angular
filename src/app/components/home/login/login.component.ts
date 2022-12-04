import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { getError, getUserFeatureState } from '../../../services/state/users/users.selectors';
import { UserAppService } from '../../../services/state/services/user.service';
import { CartAppService } from '../../../services/state/services/cart.service';
import { AppState } from '../../../services/state/state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private userService: UserAppService, private store: Store<AppState>) {}

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

  login() {
    const email = this.userName?.value || '';
    const password = this.password?.value || '';
    this.userService.setCurrentUser(email, password);
  }
}
