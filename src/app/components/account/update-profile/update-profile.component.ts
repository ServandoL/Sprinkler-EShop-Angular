import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, GenericResponse } from '../../../models/AppState';
import { IUser } from '../../../models/user.model';
import {
  getError,
  getGenericResponse,
  getUser,
  getUserLoading,
} from '../../../services/state/users/users.selectors';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css'],
})
export class UpdateProfileComponent implements OnInit, OnDestroy {
  user$!: Observable<IUser>;
  isLoading$!: Observable<boolean>;
  errorMessage$!: Observable<string>;
  response$!: Observable<GenericResponse | null>;

  updateForm!: FormGroup;

  constructor(private store: Store<AppState>) {
    this.user$ = this.store.select(getUser);
    this.isLoading$ = this.store.select(getUserLoading);
    this.errorMessage$ = this.store.select(getError);
    this.response$ = this.store.select(getGenericResponse);
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  ngOnDestroy(): void {
    this.updateForm.reset();
  }

  onUpdateClicked() {}

  initializeForm() {
    this.updateForm = new FormGroup(
      {
        email: new FormControl(''),
        password: new FormControl('', [Validators.required]),
        newPassword: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
          ),
        ]),
        confirmPassword: new FormControl('', [Validators.required]),
      },
      {
        validators: passwordMatchValidator,
      }
    );
  }

  get email() {
    return this.updateForm.get('email');
  }

  get password() {
    return this.updateForm.get('password');
  }

  get newPassword() {
    return this.updateForm.get('newPassword');
  }

  get confirmPassword() {
    return this.updateForm.get('confirmPassword');
  }
}

export const passwordMatchValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('newPassword');
  const passwordCheck = control.get('confirmPassword');
  return password?.value !== passwordCheck?.value
    ? { matchPassword: true }
    : null;
};
