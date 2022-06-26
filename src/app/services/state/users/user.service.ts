import { Injectable } from '@angular/core';
import { Apollo, ApolloBase } from 'apollo-angular';
import { Observable } from 'rxjs';
import { UpdateUserRequest } from '../../../models/user.model';
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
        id: _id,
      },
    });
  }

  updateUser$(request: UpdateUserRequest): Observable<any> {
    return this.apollo.mutate({
      mutation: UpdateUserMutation,
      variables: {
        request: {
          _id: request._id,
          email: request.email,
          newPassword: request.newPassword,
        },
      },
    });
  }
}
