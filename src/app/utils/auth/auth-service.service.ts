import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';
import { Store } from '@ngrx/store';
import { Apollo, ApolloBase } from 'apollo-angular';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserResponse } from '../../models/user.model';
import { AppState } from '../../models/AppState';
import { clearCurrentUser } from '../../services/state/users/users.actions';
import { clearCartState } from '../../services/state/cart/cart.actions';
import { Router } from '@angular/router';
import { clearOrderHistory } from '../../services/state/orderHistory/orderHistory.actions';
import { GetUserQuery } from '../../services/state/users/user.schema';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apollo: ApolloBase;
  constructor(
    private apolloProvider: Apollo,
    private store: Store<AppState>,
    private router: Router
  ) {
    this.apollo = this.apolloProvider.use('SprinklerShop');
  }

  getUser$(email: string, password: string): Observable<UserResponse> {
    return this.apollo
      .watchQuery({
        query: GetUserQuery,
        variables: { email: email, password: password },
      })
      .valueChanges.pipe(
        map((result: ApolloQueryResult<any>) => {
          if (result?.errors) {
            throw new HttpErrorResponse({
              error: result.errors.map((error) => error.message).join(', '),
            });
          } else {
            return result.data.getUser;
          }
        })
      );
  }

  getToken$(): Observable<boolean> {
    return of(
      !!sessionStorage.getItem('SessionUser') ||
        !!sessionStorage.getItem('SessionAdmin')
    );
  }

  logout(): void {
    this.store.dispatch(clearCurrentUser());
    this.store.dispatch(clearCartState());
    this.store.dispatch(clearOrderHistory());
    sessionStorage.clear();
    setTimeout(() => {
      this.router.navigateByUrl('/home');
    }, 500);
  }
}
