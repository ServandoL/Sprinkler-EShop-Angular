import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';
import { Store } from '@ngrx/store';
import { Apollo, ApolloBase } from 'apollo-angular';
import { Observable, of, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { clearCurrentUser } from '../../services/state/users/users.actions';
import { IUser } from '../../models/user.model';
import {
  CreateUserDocument,
  GetUserDocument,
} from '../../services/state/generated/graphql';
import { userResponse } from '../../services/state/users/users.state';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apollo: ApolloBase;
  constructor(private apolloProvider: Apollo, private store: Store) {
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

  createUser$(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ): Observable<any> {
    return this.apollo.mutate({
      mutation: CreateUserDocument,
      variables: {
        fname: firstName,
        lname: lastName,
        email: email,
        password: password,
        isAdmin: false,
      },
    });
  }

  getToken$(): Observable<boolean> {
    return of(
      !!sessionStorage.getItem('SessionUser') ||
        !!sessionStorage.getItem('SessionAdmin')
    );
  }

  logout(): void {
    this.store.dispatch(clearCurrentUser());
    sessionStorage.clear();
  }
}
