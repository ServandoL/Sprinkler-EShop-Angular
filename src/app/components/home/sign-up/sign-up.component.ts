import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as UserActions from '../../../services/state/users/users.actions';
import {
  createUser,
  getUserFeatureState,
} from '../../../services/state/users/users.selectors';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  constructor(private store: Store, private router: Router) {}

  signUpMessage$ = this.store.select(createUser);
  loading$ = this.store.select(getUserFeatureState);

  createUserForm = new FormGroup(
    {
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
        ),
      ]),
      passwordCheck: new FormControl('', [Validators.required]),
    },
    { validators: passwordMatchValidator }
  );

  get firstName() {
    return this.createUserForm.get('firstName');
  }
  get lastName() {
    return this.createUserForm.get('lastName');
  }
  get email() {
    return this.createUserForm.get('email');
  }
  get password() {
    return this.createUserForm.get('password');
  }
  get passwordCheck() {
    return this.createUserForm.get('passwordCheck');
  }

  onSubmit(formValues: FormGroup) {
    this.store.dispatch(
      UserActions.createUser({
        firstName: formValues.controls['firstName'].value,
        lastName: formValues.controls['lastName'].value,
        email: formValues.controls['email'].value,
        password: formValues.controls['password'].value,
        isAdmin: false,
      })
    );
  }

  onLogin() {
    this.store.dispatch(UserActions.resetUserResponse());
    this.router.navigateByUrl('/login');
  }
}
export const passwordMatchValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('password');
  const passwordCheck = control.get('passwordCheck');
  return password?.value !== passwordCheck?.value
    ? { matchPassword: true }
    : null;
};
