import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';
import { Store } from '@ngrx/store';
import { Apollo, ApolloBase } from 'apollo-angular';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { IUser, UserResponse } from '../../models/user.model';
import { Router } from '@angular/router';
import { GetUserQuery } from '../../services/state/users/user.schema';
import { logout, logoutSuccess } from '../../services/state/users/users.actions';
import { getUser } from '../state/users/users.selectors';
import * as Interface from '../state/users/__generated__/getUser';
import { AppState } from '../state/state';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apollo: ApolloBase;
  user: IUser | undefined;
  constructor(
    private apolloProvider: Apollo,
    private store: Store<AppState>,
    private router: Router
  ) {
    this.apollo = this.apolloProvider.use('SprinklerShop');
    this.store.select(getUser).subscribe((user) => (this.user = user));
  }

  getUser$(email: string, password: string): Observable<UserResponse> {
    return this.apollo
      .query<Interface.getUser>({
        query: GetUserQuery,
        variables: { email: email, password: password },
      })
      .pipe(
        map((result: ApolloQueryResult<Interface.getUser>) => {
          if (result?.errors) {
            throw new HttpErrorResponse({
              error: result.errors.map((error) => error.message).join(', '),
            });
          } else {
            const res: UserResponse = {
              message: result.data.getUser?.message || '',
              success: result.data.getUser?.success || false,
              user: {
                _id: result.data.getUser?.user?._id || '',
                fname: result.data.getUser?.user?.fname || '',
                lname: result.data.getUser?.user?.lname || '',
                email: result.data.getUser?.user?.email || '',
                isAdmin: result.data.getUser?.user?.isAdmin || false,
              },
            };
            return res;
          }
        })
      );
  }

  getToken$(): Observable<boolean> {
    return of(!!this.user?._id);
  }

  logout(): void {
    localStorage.removeItem('state');
    this.store.dispatch(logout());
    setTimeout(() => {
      this.store.dispatch(logoutSuccess());
      this.router.navigateByUrl('/home');
    }, 1000);
  }
}
