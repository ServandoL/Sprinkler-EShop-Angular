import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { AuthService } from './auth-service.service';
import { getUserFeatureState } from '../../services/state/users/users.selectors';
import { UserState } from '../../services/state/users/users.state';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store
  ) {
    this.currentUser$.subscribe((user) => (this.currentUser = user));
  }

  currentUser!: UserState;
  isAuthenticated = false;

  currentUser$ = this.store.select(getUserFeatureState);
  authenticated$ = this.authService
    .getToken$()
    .subscribe((data) => (this.isAuthenticated = data));

  canActivate(): boolean {
    if (this.isAuthenticated) {
      return true;
    }
    this.router.navigateByUrl('/login');
    return false;
  }
}
