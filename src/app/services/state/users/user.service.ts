import { Injectable } from '@angular/core';
import { Apollo, ApolloBase } from 'apollo-angular';
import { Observable } from 'rxjs';
import {
  CreateUserDocument,
  DeleteUserDocument,
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
        email: email,
      },
    });
  }
}
