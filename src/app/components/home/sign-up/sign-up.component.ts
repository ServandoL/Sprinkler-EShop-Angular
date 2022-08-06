import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { Observable } from 'rxjs';
import { UserResponse } from '../../../models/user.model';
import { UserAppService } from '../../../services/state/services/user.service';
import { getUserLoading, userResponse } from '../../../services/state/users/users.selectors';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit, OnDestroy {
  signUpMessage$!: Observable<UserResponse | null>;
  isLoading$!: Observable<boolean>;
  createUserForm!: FormGroup;

  constructor(private store: Store, private router: Router, private userService: UserAppService) {
    this.signUpMessage$ = this.store.select(userResponse);
    this.isLoading$ = this.store.select(getUserLoading);
  }

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

  ngOnInit(): void {
    this.createUserForm = new FormGroup(
      {
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/),
        ]),
        passwordCheck: new FormControl('', [Validators.required]),
      },
      { validators: passwordMatchValidator }
    );
  }

  ngOnDestroy(): void {
    this.createUserForm.reset();
    this.userService.resetUserResponse();
  }

  onSubmit() {
    const firstName = this.firstName?.value || '';
    const lastName = this.lastName?.value || '';
    const email = this.email?.value || '';
    const password = this.password?.value || '';
    this.userService.createUser(firstName, lastName, email, password, false);
  }

  onLogin() {
    this.userService.resetUserResponse();
    this.router.navigateByUrl('/login');
  }
}
export const passwordMatchValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('password');
  const passwordCheck = control.get('passwordCheck');
  return password?.value !== passwordCheck?.value ? { matchPassword: true } : null;
};
