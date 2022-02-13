import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { AuthService } from '../../../utils/auth/auth-service.service';
import * as UserActions from './users.actions';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private userService: AuthService,
    private router: Router
  ) {}

  loadUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.setCurrentUser),
      mergeMap((action) =>
        this.userService.getUser$(action.email, action.password).pipe(
          map((user) => {
            if (user.isAdmin) {
              sessionStorage.setItem('SessionAdmin', user.email);
              this.router.navigateByUrl('/admin/dashboard');
              return UserActions.loadUserSuccess({ user });
            } else {
              sessionStorage.setItem('SessionUser', user.email);
              this.router.navigateByUrl('account/profile');
              return UserActions.loadUserSuccess({ user });
            }
          }),
          catchError((error) => of(UserActions.loadUserFailure({ error })))
        )
      )
    );
  });
}
//   logout$ = createEffect(() => {
//     return this.actions$.pipe(
//       ofType(UserActions.clearCurrentUser)
//     )
//   })
// }
