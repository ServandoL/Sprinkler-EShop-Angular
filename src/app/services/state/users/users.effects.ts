import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { AppState, GenericResponse } from '../../../models/AppState';
import { UserService } from './user.service';
import * as UserActions from './users.actions';
import { UserResponse } from '../../../models/user.model';
import { CartAppService } from '../services/cart.service';
import { AuthService } from '../../auth/auth-service.service';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private store: Store<AppState>,
    private cartService: CartAppService
  ) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.setCurrentUser),
      mergeMap((action) =>
        this.authService.getUser$(action.email, action.password).pipe(
          map((response: UserResponse) => {
            if (response.user.isAdmin) {
              sessionStorage.setItem('SessionAdmin', response.user._id);
              this.router.navigateByUrl('/admin/dashboard');
              this.cartService.loadCart(response.user._id);
              const result = UserActions.loadUserSuccess({ response });
              return result;
            } else {
              sessionStorage.setItem('SessionUser', response.user._id);
              this.router.navigateByUrl('account/profile');
              this.cartService.loadCart(response.user._id);
              const result = UserActions.loadUserSuccess({ response });
              return result;
            }
          }),
          catchError((error) => of(UserActions.loadUserFailure({ error })))
        )
      )
    );
  });

  createUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.createUser),
      mergeMap((action) =>
        this.userService
          .createUser$(action.firstName, action.lastName, action.email, action.password)
          .pipe(
            map((result: any) => {
              const response: UserResponse = result?.data?.addUser;
              return UserActions.createUserResponse({ response });
            }),
            catchError((error) => of(UserActions.createUserFailure({ error })))
          )
      )
    );
  });

  deleteUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.deleteUser),
      mergeMap((action) =>
        this.userService.deleteUser$(action._id).pipe(
          map((result: any) => {
            this.authService.logout();
            const response: GenericResponse = result?.data?.deleteUser;
            return UserActions.deleteUserActionSuccess({ response });
          }),
          catchError((error) => of(UserActions.deleteUserActionFailure({ error })))
        )
      )
    );
  });

  updateUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.updateUser),
      mergeMap((action) =>
        this.userService.updateUser$(action.request).pipe(
          map((response: any) =>
            UserActions.updateUserSuccess({
              response: response.data.updateUserInformation,
            })
          ),
          catchError((error) => of(UserActions.updateUserFailure({ error: error.message })))
        )
      )
    );
  });
}
