
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';
import { Store } from '@ngrx/store';
import { Apollo, ApolloBase } from 'apollo-angular';
import { Observable, of, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { clearCurrentUser } from '../../../services/state/users/users.actions';
import { IUser } from '../../../models/user.model';
import {
  CreateUserDocument, DeleteUserDocument,
} from '../../../services/state/generated/graphql';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apollo: ApolloBase;
  constructor(private apolloProvider: Apollo) {
    this.apollo = this.apolloProvider.use('SprinklerShop');
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

  deleteUser$(email: string): Observable<any> {
    return this.apollo.mutate({
      mutation: DeleteUserDocument,
      variables: {
        email: email
      }
    })
  }

}
