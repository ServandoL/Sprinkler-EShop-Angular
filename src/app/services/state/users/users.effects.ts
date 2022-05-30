import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { AppState } from '../../../models/AppState';
import { AuthService } from '../../../utils/auth/auth-service.service';
import { loadCart } from '../cart/cart.actions';
import { UserService } from './user.service';
import * as UserActions from './users.actions';
import { deleteUserResponse, userResponse } from './users.state';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.setCurrentUser),
      mergeMap((action) =>
        this.authService.getUser$(action.email, action.password).pipe(
          map((user) => {
            if (user.isAdmin) {
              sessionStorage.setItem('SessionAdmin', user.email);
              this.router.navigateByUrl('/admin/dashboard');
              const result = UserActions.loadUserSuccess({ user });
              this.store.dispatch(
                loadCart({
                  user_id: result.user.email,
                })
              );
              return result;
            } else {
              sessionStorage.setItem('SessionUser', user.email);
              this.router.navigateByUrl('account/profile');
              const result = UserActions.loadUserSuccess({ user });
              this.store.dispatch(
                loadCart({
                  user_id: result.user.email,
                })
              );
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
          .createUser$(
            action.firstName,
            action.lastName,
            action.email,
            action.password
          )
          .pipe(
            map((result: any) => {
              const response: userResponse = result?.data?.addUser;
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
        this.userService.deleteUser$(action.email).pipe(
          map((result: any) => {
            this.authService.logout();
            this.router.navigateByUrl('/');
            const response: deleteUserResponse = result?.data?.deleteUser;
            return UserActions.deleteUserActionResponse({ response });
          }),
          catchError((error) =>
            of(UserActions.deleteUserActionFailure({ error }))
          )
        )
      )
    );
  });
}
