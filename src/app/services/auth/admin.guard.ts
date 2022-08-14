import { Injectable, OnDestroy } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from './auth-service.service';
import { IUser } from '../../models/user.model';
import { getUser } from '../state/users/users.selectors';
import { Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  currentUser$!: Observable<IUser>;
  isAuthenticated = false;
  currentUser: IUser | undefined = undefined;

  constructor(private authService: AuthService, private router: Router, private store: Store) {
    this.currentUser$ = this.store.select(getUser);
    this.authService.getToken$().subscribe((data) => (this.isAuthenticated = data));
    this.currentUser$.subscribe((user) => (this.currentUser = user));
  }

  canActivate(): boolean {
    if (this.isAuthenticated && this.currentUser && this.currentUser.isAdmin) {
      return true;
    }
    this.router.navigate(['/unauthorized']);
    return false;
  }
}
