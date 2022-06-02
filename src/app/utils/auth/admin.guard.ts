import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from './auth-service.service';
import { getUserFeatureState } from '../../services/state/users/users.selectors';
import { UserState } from '../../services/state/users/users.state';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
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
    if (this.isAuthenticated && this.currentUser?.user?.isAdmin) {
      return true;
    }
    this.authService.logout();
    this.router.navigate(['/unauthorized']);
    return false;
  }
}
