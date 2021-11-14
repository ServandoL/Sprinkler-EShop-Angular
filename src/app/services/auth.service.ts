import { Injectable } from '@angular/core';
import { IUser } from '../models/user.model';

@Injectable({providedIn: 'root'})
export class AuthService {

  currentUser!: IUser;

  constructor() { }

  loginUser(userName: string, password: string) {
  }

  isAuthenticated() {
    return !!this.currentUser;
  }

  updateCurrentUser(firstName: string, lastName: string) {
    this.currentUser.firstName = firstName;
    this.currentUser.lastName = lastName;
  }

}
