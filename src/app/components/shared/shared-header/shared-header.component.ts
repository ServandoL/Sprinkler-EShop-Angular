import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../../../utils/auth/auth-service.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { getUserFeatureState } from '../../../services/state/users/users.selectors';
import {
  clearCurrentUser,
  getCurrentUser,
} from '../../../services/state/users/users.actions';
import { getCartFeatureState } from '../../../services/state/cart/cart.reducers';
import { clearCart, loadCart } from '../../../services/state/cart/cart.actions';

@Component({
  selector: 'app-shared-header',
  templateUrl: './shared-header.component.html',
  styleUrls: ['./shared-header.component.scss'],
})
export class SharedHeaderComponent implements OnInit, OnDestroy {
  constructor(
    private breakpointObserver: BreakpointObserver,
    private store: Store,
    public authService: AuthService,
    private router: Router
  ) {}

  subscription: Subscription[] = [];
  validated = false;
  cartQuantity = 0;
  currentUser$ = this.store.select(getUserFeatureState);
  cart$ = this.store.select(getCartFeatureState);

  ngOnInit(): void {
    this.authService.getToken$().subscribe((el) => console.log(el));
    this.store.dispatch(getCurrentUser());
    this.subscription.push(
      this.authService
        .getToken$()
        .subscribe((result) => (this.validated = result))
    );
    this.subscription.push(
      this.cart$.subscribe(
        (result) => (this.cartQuantity = result.cartQuantity)
      )
    );
  }

  ngOnDestroy(): void {
    this.subscription.forEach((subscription) => subscription.unsubscribe());
  }

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  logout() {
    this.authService.logout();
    this.store.dispatch(clearCart());
    this.router.navigateByUrl('/home');
  }
}
