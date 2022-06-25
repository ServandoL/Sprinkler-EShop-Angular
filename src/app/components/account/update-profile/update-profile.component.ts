import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../../models/AppState';
import { IUser } from '../../../models/user.model';
import {
  getError,
  getUpdateSuccessMessage,
  getUser,
  getUserLoading,
} from '../../../services/state/users/users.selectors';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css'],
})
export class UpdateProfileComponent implements OnInit {
  user$!: Observable<IUser>;
  isLoading$!: Observable<boolean>;
  errorMessage$!: Observable<string>;
  successMessage$!: Observable<string | undefined>;

  updateForm!: FormGroup;

  constructor(private store: Store<AppState>) {
    this.user$ = this.store.select(getUser);
    this.isLoading$ = this.store.select(getUserLoading);
    this.errorMessage$ = this.store.select(getError);
    this.successMessage$ = this.store.select(getUpdateSuccessMessage);
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  onUpdateClicked() {}

  initializeForm() {
    this.updateForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
      newPassword: new FormControl(''),
      confirmPassword: new FormControl(''),
    });
  }
}
