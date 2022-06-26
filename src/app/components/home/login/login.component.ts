import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  getError,
  getUserFeatureState,
} from '../../../services/state/users/users.selectors';
import { UserAppService } from '../../../services/state/services/user.service';
import { CartAppService } from '../../../services/state/services/cart.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private userService: UserAppService,
    private cartService: CartAppService,
    private store: Store
  ) {}

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
    this.userService.clearCurrentUser();
    this.cartService.clearCart();
  }

  login() {
    const email = this.userName?.value || '';
    const password = this.password?.value || '';
    this.userService.setCurrentUser(email, password);
  }
}
