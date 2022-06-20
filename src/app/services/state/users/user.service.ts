import { Injectable } from '@angular/core';
import { Apollo, ApolloBase } from 'apollo-angular';
import { Observable } from 'rxjs';
import {
  CreateUserMutation,
  DeleteUserMutation,
  UpdateUserMutation,
} from './user.schema';

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
      mutation: CreateUserMutation,
      variables: {
        request: {
          fname: firstName,
          lname: lastName,
          email: email,
          password: password,
          isAdmin: false,
        },
      },
    });
  }

  deleteUser$(_id: string): Observable<any> {
    return this.apollo.mutate({
      mutation: DeleteUserMutation,
      variables: {
        _id: _id,
      },
    });
  }

  updateUser$(request: any): Observable<any> {
    return this.apollo.mutate({
      mutation: UpdateUserMutation,
      variables: {
        email: request.email,
        fname: request.fname,
        lname: request.lname,
        password: request.password,
      },
    });
  }
}
