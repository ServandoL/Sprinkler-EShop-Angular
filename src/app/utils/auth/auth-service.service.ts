import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';
import { Store } from '@ngrx/store';
import { Apollo, ApolloBase } from 'apollo-angular';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { IUser } from '../../models/user.model';
import { GetUserDocument } from '../../services/state/generated/graphql';
import { AppState } from '../../models/AppState';
import { clearCurrentUser } from '../../services/state/users/users.actions';
import { clearCart } from '../../services/state/cart/cart.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apollo: ApolloBase;
  constructor(private apolloProvider: Apollo, private store: Store<AppState>) {
    this.apollo = this.apolloProvider.use('SprinklerShop');
  }

  getUser$(email: string, password: string): Observable<IUser> {
    return this.apollo
      .watchQuery({
        query: GetUserDocument,
        variables: { email: email, password: password },
      })
      .valueChanges.pipe(
        map((result: ApolloQueryResult<any>) => {
          if (result?.errors) {
            throw new HttpErrorResponse({
              error: result.errors.map((error) => error.message).join(', '),
            });
          } else {
            let { _id, password, ...data } = result?.data?.users[0];
            return data;
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
    this.store.dispatch(clearCart());
    sessionStorage.clear();
  }
}
