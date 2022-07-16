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
import { Observable, Subscription } from 'rxjs';
import { AppState, GenericResponse } from '../../../models/AppState';
import { IUser, UpdateUserRequest } from '../../../models/user.model';
import { UserAppService } from '../../../services/state/services/user.service';
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
  subscriptions: Subscription[] = [];
  user!: IUser;

  constructor(
    private store: Store<AppState>,
    private userService: UserAppService
  ) {
    this.user$ = this.store.select(getUser);
    this.isLoading$ = this.store.select(getUserLoading);
    this.errorMessage$ = this.store.select(getError);
    this.response$ = this.store.select(getGenericResponse);
  }

  ngOnInit(): void {
    this.initializeForm();
    this.subscriptions.push(this.user$.subscribe((user) => (this.user = user)));
  }

  ngOnDestroy(): void {
    this.userService.resetErrorMessage();
    this.userService.resetUserResponse();
    this.updateForm.reset();
  }

  onUpdateClicked() {
    const request: UpdateUserRequest = {
      _id: this.user._id,
      currentPassword: this.password?.value || '',
      newPassword: this.newPassword?.value || '',
      email: this.email?.value || '',
    };
    this.userService.updateUserInformation(request);
  }

  initializeForm() {
    this.updateForm = new FormGroup(
      {
        email: new FormControl(''),
        password: new FormControl('', [Validators.required]),
        newPassword: new FormControl('', [
          Validators.minLength(8),
          Validators.pattern(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
          ),
        ]),
        confirmPassword: new FormControl(''),
      },
      {
        validators: this.passwordMatchValidator,
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

  passwordMatchValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const password = control.get('newPassword');
    const passwordCheck = control.get('confirmPassword');
    return password?.value !== passwordCheck?.value
      ? { matchPassword: true }
      : null;
  };
}
