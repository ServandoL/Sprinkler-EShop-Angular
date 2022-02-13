import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  getError,
  getUserFeatureState,
  selectUser,
} from '../../../services/state/users/users.selectors';
import { IUser } from '../../../models/user.model';
import { AuthService } from '../../../utils/auth/auth-service.service';
import * as UserActions from '../../../services/state/users/users.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private router: Router,
    private userService: AuthService,
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

  login(formValues: FormGroup) {
    this.store.dispatch(
      UserActions.setCurrentUser({
        email: formValues.controls['userName'].value,
        password: formValues.controls['password'].value,
      })
    );
    // this.userService
    //   .getUser$(formValues.controls['userName'].value)
    //   .subscribe((user: any) => {
    //     if (user[0]?.password === formValues.controls['password'].value) {
    //       if (user[0]?.isAdmin) {
    //         this.errorMessage = false;

    //         sessionStorage.setItem('SessionAdmin', user[0]._id.toString());
    //         this.router.navigateByUrl('/admin/dashboard');
    //       } else {
    //         this.errorMessage = false;

    //         sessionStorage.setItem('SessionUser', user[0]._id.toString());
    //         this.router.navigateByUrl('/account/profile');
    //       }
    //     } else {
    //       this.errorMessage = true;
    //     }
    //   });
  }
}
