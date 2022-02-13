import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../../../utils/auth/auth-service.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  clearUser, getUser, getUserFeatureState
} from '../../../services/state/users/users.selectors';
import { clearCurrentUser, getCurrentUser } from '../../../services/state/users/users.actions';

@Component({
  selector: 'app-shared-header',
  templateUrl: './shared-header.component.html',
  styleUrls: ['./shared-header.component.scss'],
})
export class SharedHeaderComponent implements OnInit {
  constructor(
    private breakpointObserver: BreakpointObserver,
    private store: Store,
    public authService: AuthService,
    private router: Router
  ) {}

  currentUser$ = this.store.select(getUserFeatureState);

  ngOnInit(): void {
    this.authService.getToken$().subscribe((el) => console.log(el));
    this.store.dispatch(getCurrentUser());
  }

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/home');
  }
}
