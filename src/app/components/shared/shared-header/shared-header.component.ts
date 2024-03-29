import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { getUserFeatureState } from '../../../services/state/users/users.selectors';
import { getCartFeatureState } from '../../../services/state/cart/cart.reducers';
import { UserState } from '../../../services/state/users/users.state';
import { CartState } from '../../../services/state/cart/cart.state';
import { UserAppService } from '../../../services/state/services/user.service';
import { AuthService } from '../../../services/auth/auth-service.service';

@Component({
  selector: 'app-shared-header',
  templateUrl: './shared-header.component.html',
  styleUrls: ['./shared-header.component.scss'],
})
export class SharedHeaderComponent implements OnInit, OnDestroy {
  currentUser$!: Observable<UserState>;
  cart$!: Observable<CartState>;
  subscription: Subscription[] = [];
  validated = false;
  cartQuantity = 0;
  constructor(
    private breakpointObserver: BreakpointObserver,
    private store: Store,
    public authService: AuthService,
    private userService: UserAppService
  ) {
    this.currentUser$ = this.store.select(getUserFeatureState);
    this.cart$ = this.store.select(getCartFeatureState);
  }

  ngOnInit(): void {
    this.userService.getCurrentUser();
    this.subscription.push(
      this.authService.getToken$().subscribe((result) => (this.validated = result))
    );
    this.subscription.push(
      this.cart$.subscribe((result) => (this.cartQuantity = result.cartQuantity))
    );
  }

  ngOnDestroy(): void {
    this.subscription.forEach((subscription) => subscription.unsubscribe());
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay()
  );

  logout() {
    this.authService.logout();
  }
}
