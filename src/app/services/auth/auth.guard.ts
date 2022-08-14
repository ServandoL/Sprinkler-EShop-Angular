import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth-service.service';
import { getUser } from '../../services/state/users/users.selectors';
import { UserState } from '../../services/state/users/users.state';
import { IUser } from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  currentUser!: IUser;
  isAuthenticated = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<UserState>
  ) {
    this.store.select(getUser).subscribe((user) => (this.currentUser = user));
    this.authService
      .getToken$()
      .subscribe((authenticated) => (this.isAuthenticated = authenticated));
  }

  canActivate(): boolean {
    if (this.isAuthenticated) {
      return true;
    }
    this.router.navigateByUrl('/login');
    return false;
  }
}
